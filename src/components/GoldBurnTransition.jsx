"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, useTexture } from "@react-three/drei";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  uniform float uDirection;
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

  float burnLuma(vec3 color) {
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
    float left = burnLuma(texture2D(tex, uv - vec2(texel.x, 0.0)).rgb);
    float right = burnLuma(texture2D(tex, uv + vec2(texel.x, 0.0)).rgb);
    float down = burnLuma(texture2D(tex, uv - vec2(0.0, texel.y)).rgb);
    float up = burnLuma(texture2D(tex, uv + vec2(0.0, texel.y)).rgb);
    float diagonalA = burnLuma(texture2D(tex, uv + texel).rgb);
    float diagonalB = burnLuma(texture2D(tex, uv - texel).rgb);

    float edge = length(vec2(right - left, up - down)) + abs(diagonalA - diagonalB) * 0.7;
    return pow(clamp(edge * 4.8, 0.0, 1.0), 0.58);
  }

  void main() {
    vec2 uv = coverUv(vUv);
    vec4 tex = texture2D(uTexture, uv);

    float etchAmount = smoothstep(0.02, 0.28, uProgress);
    float gray = burnLuma(tex.rgb);
    vec3 etchedImage = mix(tex.rgb, vec3(gray), 0.82);
    etchedImage = mix(etchedImage, vec3(0.018, 0.019, 0.018), 0.42);

    vec2 pixelUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
    float organic = fbm(pixelUv * 7.5 + vec2(uTime * 0.045, -uTime * 0.032));
    float fine = hash(floor(vUv * uResolution / 4.0) + floor(uTime * 8.0));

    float burnLine = mix(-0.14, 1.14, uProgress) + (organic - 0.5) * uNoiseStrength;
    float edgeWidth = 0.022;
    float directional = mix(vUv.y, 1.0 - vUv.y, uDirection);

    float keepMask = smoothstep(burnLine - edgeWidth, burnLine + edgeWidth, directional);
    float edgeBand = 1.0 - smoothstep(0.0, edgeWidth * 1.85, abs(directional - burnLine));

    vec2 texel = 1.0 / max(uImageResolution, vec2(1.0));
    float contour = imageEdge(uTexture, uv, texel);
    float sparkle = step(0.48, fine) * edgeBand * (0.55 + organic * 1.25);

    vec3 gold = vec3(1.0, 0.69, 0.30);
    vec3 amber = vec3(0.78, 0.45, 0.14);
    vec3 finalColor = mix(tex.rgb, etchedImage, etchAmount);

    finalColor += gold * contour * keepMask * etchAmount * (0.22 + uEdgeIntensity * 0.38);
    finalColor += gold * edgeBand * uEdgeIntensity * 1.08;
    finalColor += amber * sparkle * uEdgeIntensity * 1.32;

    float alpha = max(keepMask * tex.a, edgeBand * 0.72);
    alpha *= smoothstep(0.0, 0.035, uProgress) * (1.0 - smoothstep(0.985, 1.0, uProgress) * 0.45) + (1.0 - smoothstep(0.0, 0.035, uProgress));

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function BurnPlane({ image, progress, direction }) {
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
      uPixelSize: { value: 4.5 },
      uNoiseStrength: { value: 0.085 },
      uDirection: { value: direction === "top-to-bottom" ? 1 : 0 },
    }),
    [direction, texture, size]
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
      0.45 + Math.sin(currentProgress * Math.PI) * 0.65;
    materialRef.current.uniforms.uPixelSize.value = THREE.MathUtils.lerp(
      5.25,
      3.5,
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

function useSectionProgress(targetRef, setPinned) {
  const progress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const target = targetRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const travel = Math.max(1, target.offsetHeight - window.innerHeight);
      progress.set(THREE.MathUtils.clamp((window.scrollY - start) / travel, 0, 1));
      const nextPinned = rect.top <= 0 && rect.bottom > 0;
      setPinned((current) => (current === nextPinned ? current : nextPinned));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [progress, setPinned, targetRef]);

  return progress;
}

export function GoldBurnTransition({ children, direction = "bottom-to-top" }) {
  const sectionRef = useRef(null);
  const [isPinned, setPinned] = useState(false);
  const scrollYProgress = useSectionProgress(sectionRef, setPinned);
  const burnProgress = useTransform(scrollYProgress, [0.08, 0.82], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.86, 1], [1, 0]);

  return (
    <section
      id="gold-burn-transition"
      ref={sectionRef}
      className="relative z-20 h-[210svh] overflow-visible"
      aria-label="Gold pixel burn transition"
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden"
        style={{ visibility: isPinned ? "visible" : "hidden" }}
      >
        <div className="relative z-0 h-[100svh]">{children}</div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        >
            <Canvas
              className="h-full w-full"
              frameloop="demand"
              dpr={1}
              gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
            >
              <OrthographicCamera
                makeDefault
                manual
                left={-1}
                right={1}
                top={1}
                bottom={-1}
                near={0.1}
                far={10}
                position={[0, 0, 1]}
              />
              <BurnPlane
                image="/assets/hero/05.png"
                progress={burnProgress}
                direction={direction}
              />
            </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
