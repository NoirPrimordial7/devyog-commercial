"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, useTexture } from "@react-three/drei";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uProgress;
  uniform float uTime;
  uniform float uEdgeIntensity;
  uniform float uPixelSize;
  uniform float uNoiseStrength;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p *= 2.03;
      amp *= 0.5;
    }

    return value;
  }

  float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  vec2 coverUv(vec2 uv) {
    float screenRatio = uResolution.x / uResolution.y;
    float imageRatio = uImageResolution.x / uImageResolution.y;

    vec2 ratio = vec2(
      min(screenRatio / imageRatio, 1.0),
      min((1.0 / screenRatio) / (1.0 / imageRatio), 1.0)
    );

    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  float imageEdge(sampler2D tex, vec2 uv, vec2 texel) {
    float left = luminance(texture2D(tex, uv - vec2(texel.x, 0.0)).rgb);
    float right = luminance(texture2D(tex, uv + vec2(texel.x, 0.0)).rgb);
    float down = luminance(texture2D(tex, uv - vec2(0.0, texel.y)).rgb);
    float up = luminance(texture2D(tex, uv + vec2(0.0, texel.y)).rgb);
    float diagonalA = luminance(texture2D(tex, uv + texel).rgb);
    float diagonalB = luminance(texture2D(tex, uv - texel).rgb);

    float edge = length(vec2(right - left, up - down)) + abs(diagonalA - diagonalB) * 0.7;
    return pow(clamp(edge * 4.8, 0.0, 1.0), 0.58);
  }

  void main() {
    vec2 uv = coverUv(vUv);
    vec4 tex = texture2D(uTexture, uv);

    float gray = luminance(tex.rgb);
    vec3 etchedImage = mix(tex.rgb, vec3(gray), 0.82);
    etchedImage = mix(etchedImage, vec3(0.018, 0.019, 0.018), 0.42);

    vec2 pixelUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
    float organic = fbm(pixelUv * 7.5 + vec2(uTime * 0.045, -uTime * 0.032));
    float fine = hash(floor(vUv * uResolution / 4.0) + floor(uTime * 8.0));

    float burnLine = mix(-0.14, 1.14, uProgress) + (organic - 0.5) * uNoiseStrength;
    float edgeWidth = 0.068;
    float directional = vUv.y;

    float keepMask = smoothstep(burnLine - edgeWidth, burnLine + edgeWidth, directional);
    float edgeBand = 1.0 - smoothstep(0.0, edgeWidth * 1.85, abs(directional - burnLine));

    vec2 texel = 1.0 / max(uImageResolution, vec2(1.0));
    float contour = imageEdge(uTexture, uv, texel);
    float sparkle = step(0.48, fine) * edgeBand * (0.55 + organic * 1.25);

    vec3 gold = vec3(1.0, 0.69, 0.30);
    vec3 amber = vec3(0.78, 0.45, 0.14);
    vec3 finalColor = etchedImage;

    finalColor += gold * contour * keepMask * (0.35 + uEdgeIntensity * 0.55);
    finalColor += gold * edgeBand * uEdgeIntensity * 1.9;
    finalColor += amber * sparkle * uEdgeIntensity * 2.7;

    float alpha = max(keepMask * tex.a, edgeBand * 0.72);
    alpha *= smoothstep(0.0, 0.035, uProgress) * (1.0 - smoothstep(0.985, 1.0, uProgress) * 0.45) + (1.0 - smoothstep(0.0, 0.035, uProgress));

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function BurnPlane({ image, progress }) {
  const texture = useTexture(image);
  const materialRef = useRef(null);
  const { size, invalidate } = useThree();

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uEdgeIntensity: { value: 1.0 },
      uPixelSize: { value: 6.0 },
      uNoiseStrength: { value: 0.2 },
    }),
    [texture, size]
  );

  useEffect(() => {
    const unsubscribe = progress.on("change", () => invalidate());
    invalidate();

    return unsubscribe;
  }, [progress, invalidate]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const currentProgress = THREE.MathUtils.clamp(progress.get(), 0, 1);
    materialRef.current.uniforms.uProgress.value = currentProgress;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    materialRef.current.uniforms.uEdgeIntensity.value =
      0.55 + Math.sin(currentProgress * Math.PI) * 1.05;
    materialRef.current.uniforms.uPixelSize.value = THREE.MathUtils.lerp(
      8.0,
      4.25,
      currentProgress
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function GoldBurnTransition({ children }) {
  const sectionRef = useRef(null);
  const [renderBurn, setRenderBurn] = useState(true);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const burnProgress = useTransform(scrollYProgress, [0.06, 0.78], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.74, 0.93], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const shouldRender = latest < 0.97;
    setRenderBurn((current) => (current === shouldRender ? current : shouldRender));
  });

  return (
    <section
      id="gold-burn-transition"
      ref={sectionRef}
      className="relative h-[145svh] min-h-[920px] overflow-visible sm:h-[150svh]"
      aria-label="Gold pixel burn transition"
    >
      <div className="sticky top-0 min-h-[100svh] overflow-hidden">
        <div className="relative z-0 min-h-[100svh]">{children}</div>

        {renderBurn && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          >
            <Canvas
              className="h-full w-full"
              frameloop="demand"
              dpr={[1, 1.25]}
              gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
            >
              <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={1} />
              <BurnPlane image="/assets/hero/05.png" progress={burnProgress} />
            </Canvas>
          </motion.div>
        )}
      </div>
    </section>
  );
}
