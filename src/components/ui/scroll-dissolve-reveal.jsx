"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useScroll } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const coverVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const dissolveFragmentShader = `
  uniform sampler2D uTextureFront;
  uniform sampler2D uTextureBack;
  uniform vec2 uResolution;
  uniform vec2 uFrontResolution;
  uniform vec2 uBackResolution;
  uniform float uProgress;
  varying vec2 vUv;

  float imageLuma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float valueNoise(vec2 p) {
    vec2 cell = floor(p);
    vec2 local = fract(p);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash21(cell);
    float b = hash21(cell + vec2(1.0, 0.0));
    float c = hash21(cell + vec2(0.0, 1.0));
    float d = hash21(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  vec2 coverUv(vec2 imageResolution) {
    float viewportAspect = uResolution.x / uResolution.y;
    float imageAspect = imageResolution.x / imageResolution.y;
    vec2 ratio = vec2(
      min(viewportAspect / imageAspect, 1.0),
      min(imageAspect / viewportAspect, 1.0)
    );

    return vUv * ratio + (1.0 - ratio) * 0.5;
  }

  float imageEdge(sampler2D textureImage, vec2 uv, vec2 imageResolution) {
    vec2 texel = 1.0 / max(imageResolution, vec2(1.0));
    float left = imageLuma(texture2D(textureImage, uv - vec2(texel.x, 0.0)).rgb);
    float right = imageLuma(texture2D(textureImage, uv + vec2(texel.x, 0.0)).rgb);
    float down = imageLuma(texture2D(textureImage, uv - vec2(0.0, texel.y)).rgb);
    float up = imageLuma(texture2D(textureImage, uv + vec2(0.0, texel.y)).rgb);
    float edge = length(vec2(right - left, up - down));

    return pow(clamp(edge * 4.6, 0.0, 1.0), 0.62);
  }

  void main() {
    vec2 frontUv = coverUv(uFrontResolution);
    vec2 backUv = coverUv(uBackResolution);
    vec4 front = texture2D(uTextureFront, frontUv);
    vec4 back = texture2D(uTextureBack, backUv);

    vec2 centeredUv = vUv - vec2(0.5);
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    float distanceFromCenter = length(centeredUv);

    float pixelSize = mix(8.0, 4.5, uProgress);
    vec2 pixelCell = floor(vUv * uResolution / pixelSize);
    vec2 pixelatedUv = pixelCell * pixelSize / uResolution;
    float coarseNoise = valueNoise(pixelatedUv * 34.0);
    float blockNoise = hash21(pixelCell);
    float noisyDistance = distanceFromCenter + coarseNoise * 0.13 + blockNoise * 0.035;
    float maxDistance = length(vec2(aspect * 0.5, 0.5));
    float normalizedDistance = noisyDistance / maxDistance;
    float threshold = uProgress * 1.5;
    float frontMask = smoothstep(threshold - 0.032, threshold, normalizedDistance);

    float frontGray = min(0.82, uProgress / 0.52);
    float backReveal = min(1.0, uProgress * 1.1);
    float backGray = 1.0 - backReveal;
    vec3 frontColor = mix(front.rgb, vec3(imageLuma(front.rgb)), frontGray);
    frontColor = mix(frontColor, vec3(0.0), frontGray);
    vec3 backColor = mix(back.rgb, vec3(imageLuma(back.rgb)), backGray);
    backColor = mix(backColor, vec3(0.0), backGray);

    float frontEdge = imageEdge(uTextureFront, frontUv, uFrontResolution);
    float backEdge = imageEdge(uTextureBack, backUv, uBackResolution);
    vec3 gold = vec3(1.0, 0.72, 0.34);
    float frontEdgeStrength = uProgress * 0.84 * (1.0 + frontGray * 3.0);
    float frontEdgeBrightness = 1.08 - uProgress * 0.38;
    frontColor += gold * frontEdge * frontEdgeStrength * frontEdgeBrightness;
    backColor += gold * backEdge * 1.08 * (1.0 - backReveal);

    float bandWidth = mix(0.15, 0.025, uProgress);
    float burnBand = 1.0 - smoothstep(
      bandWidth * 0.28,
      bandWidth,
      abs(normalizedDistance - threshold)
    );
    float burnActivation = smoothstep(0.015, 0.08, uProgress) *
      (1.0 - smoothstep(0.94, 1.0, uProgress));
    float goldDust = pow(blockNoise, 0.58) * 2.0;
    float burnBrightness = (1.0 - uProgress) * (1.0 + frontGray * 2.0);

    vec3 finalColor = mix(backColor, frontColor, frontMask * front.a);
    finalColor += gold * burnBand * (0.48 + goldDust) * burnBrightness * burnActivation;

    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

function Scene({ imageFront, imageBack, scrollProgress }) {
  const [frontTexture, backTexture] = useTexture([imageFront, imageBack]);
  const materialRef = useRef(null);
  const { size, invalidate } = useThree();

  useEffect(() => {
    [frontTexture, backTexture].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
    });
    invalidate();
  }, [frontTexture, backTexture, invalidate]);

  const uniforms = useMemo(
    () => ({
      uTextureFront: { value: frontTexture },
      uTextureBack: { value: backTexture },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uFrontResolution: {
        value: new THREE.Vector2(frontTexture.image.width, frontTexture.image.height),
      },
      uBackResolution: {
        value: new THREE.Vector2(backTexture.image.width, backTexture.image.height),
      },
      uProgress: { value: 0 },
    }),
    [frontTexture, backTexture, size],
  );

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", () => invalidate());
    invalidate();
    return unsubscribe;
  }, [scrollProgress, invalidate]);

  useFrame(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uProgress.value = THREE.MathUtils.clamp(
      (scrollProgress.get() - 0.04) / 0.86,
      0,
      1,
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={coverVertexShader}
        fragmentShader={dissolveFragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        transparent={false}
      />
    </mesh>
  );
}

function DissolveViewport({ imageFront, imageBack, scrollProgress, className }) {
  return (
    <div
      className={cn(
        "sticky top-0 h-[100svh] w-full overflow-hidden",
        className,
      )}
    >
      <Canvas
        className="pointer-events-none"
        frameloop="demand"
        dpr={1}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <React.Suspense fallback={null}>
          <Scene
            imageFront={imageFront}
            imageBack={imageBack}
            scrollProgress={scrollProgress}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

function ScrollTrackedViewport({
  containerRef,
  scrollContainerRef,
  imageFront,
  imageBack,
  className,
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    ...(scrollContainerRef && { container: scrollContainerRef }),
  });

  return (
    <DissolveViewport
      imageFront={imageFront}
      imageBack={imageBack}
      scrollProgress={scrollYProgress}
      className={className}
    />
  );
}

export function ScrollDissolveReveal({
  imageFront,
  imageBack,
  className,
  containerClassName,
  scrollContainerRef,
  scrollProgress,
}) {
  const containerRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "25% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("h-[230svh] w-full", containerClassName)}
    >
      {isNearViewport && (scrollProgress ? (
        <DissolveViewport
          imageFront={imageFront}
          imageBack={imageBack}
          scrollProgress={scrollProgress}
          className={className}
        />
      ) : (
        <ScrollTrackedViewport
          containerRef={containerRef}
          scrollContainerRef={scrollContainerRef}
          imageFront={imageFront}
          imageBack={imageBack}
          className={className}
        />
      ))}
    </div>
  );
}
