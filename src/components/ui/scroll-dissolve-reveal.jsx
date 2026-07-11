"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, useTexture } from "@react-three/drei";
import { useMotionValue } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";


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
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.07 + 11.3;
      amplitude *= 0.5;
    }
    return value;
  }

  vec2 coverUv(vec2 uv) {
    float screenRatio = uResolution.x / uResolution.y;
    float imageRatio = uImageResolution.x / uImageResolution.y;
    vec2 scale = vec2(1.0);
    if (screenRatio > imageRatio) {
      scale.y = imageRatio / screenRatio;
    } else {
      scale.x = screenRatio / imageRatio;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv);
    vec4 color = texture2D(uTexture, uv);

    vec2 blocks = floor(vUv * vec2(120.0, 72.0)) / vec2(120.0, 72.0);
    float broadNoise = fbm(blocks * 8.2);
    float microNoise = hash(floor(vUv * uResolution / 5.0));
    float distortion = (broadNoise - 0.5) * 0.16 + (microNoise - 0.5) * 0.035;

    float boundary = mix(-0.14, 1.14, uProgress);
    float field = vUv.y + distortion;
    float alpha = smoothstep(boundary - 0.028, boundary + 0.028, field);
    float edge = smoothstep(boundary - 0.06, boundary - 0.012, field) -
                 smoothstep(boundary + 0.012, boundary + 0.065, field);

    vec3 burn = vec3(0.76, 0.43, 0.17);
    vec3 ember = vec3(1.0, 0.72, 0.34);
    color.rgb += mix(burn, ember, microNoise) * edge * 0.72;
    gl_FragColor = vec4(color.rgb, color.a * alpha);
  }
`;


function DissolveSurface({ image, progress, onReady }) {
  const material = useRef(null);
  const reportedReady = useRef(false);
  const texture = useTexture(image);
  const { size, invalidate } = useThree();
  texture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uImageResolution: { value: new THREE.Vector2(texture.image.width, texture.image.height) },
    uProgress: { value: 0 },
  }), [texture, size.width, size.height]);

  useEffect(() => {
    const unsubscribe = progress.on("change", invalidate);
    invalidate();
    return unsubscribe;
  }, [progress, invalidate]);

  useFrame(() => {
    if (!material.current) return;
    material.current.uniforms.uProgress.value = progress.get();
    material.current.uniforms.uResolution.value.set(size.width, size.height);
    if (!reportedReady.current) {
      reportedReady.current = true;
      requestAnimationFrame(onReady);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} />
    </mesh>
  );
}


export function ScrollDissolveReveal({ image, imageFront, progress, className }) {
  const [canvasReady, setCanvasReady] = useState(false);
  const fallbackProgress = useMotionValue(0);
  const dissolveProgress = progress || fallbackProgress;
  const source = image || imageFront;
  const markCanvasReady = useCallback(() => setCanvasReady(true), []);

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      <img
        src={source}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: canvasReady ? 0 : 1 }}
      />
      <Canvas frameloop="demand" dpr={[1, 1.3]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
        <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={0.1} far={10} position={[0, 0, 1]} />
        <Suspense fallback={null}><DissolveSurface image={source} progress={dissolveProgress} onReady={markCanvasReady} /></Suspense>
      </Canvas>
    </div>
  );
}
