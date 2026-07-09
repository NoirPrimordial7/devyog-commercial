import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uFromSize;
  uniform vec2 uToSize;
  varying vec2 vUv;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1., 0.)), f.x),
               mix(random(i + vec2(0., 1.)), random(i + vec2(1., 1.)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + 13.7;
      amplitude *= 0.5;
    }
    return value;
  }

  vec2 coverUv(vec2 uv, vec2 imageSize) {
    float screenRatio = uResolution.x / uResolution.y;
    float imageRatio = imageSize.x / imageSize.y;
    vec2 scale = vec2(1.0);
    if (screenRatio > imageRatio) {
      scale.y = imageRatio / screenRatio;
    } else {
      scale.x = screenRatio / imageRatio;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 fromUv = coverUv(vUv, uFromSize);
    vec2 toUv = coverUv(vUv, uToSize);
    vec4 fromColor = texture2D(uFrom, fromUv);
    vec4 toColor = texture2D(uTo, toUv);

    vec2 centered = vUv - 0.5;
    float radial = length(centered * vec2(0.7, 1.0));
    float grain = fbm(vUv * 7.5 + vec2(uProgress * 1.4, -uProgress * 0.8));
    float micro = noise(vUv * 55.0) * 0.15;
    float field = grain * 0.82 + micro + radial * 0.22;
    float threshold = mix(-0.12, 1.12, uProgress);
    float mask = smoothstep(threshold - 0.065, threshold + 0.065, field);
    float edge = smoothstep(threshold - 0.025, threshold, field) -
                 smoothstep(threshold, threshold + 0.035, field);

    vec3 color = mix(toColor.rgb, fromColor.rgb, mask);
    color += vec3(0.79, 0.56, 0.25) * edge * 0.75;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function DissolvePlane({ progress }) {
  const material = useRef();
  const { viewport, size } = useThree();
  const [from, to] = useTexture(["/images/obsidian-tower.png", "/images/aurum-atrium.png"]);
  from.colorSpace = THREE.SRGBColorSpace;
  to.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(
    () => ({
      uFrom: { value: from },
      uTo: { value: to },
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uFromSize: { value: new THREE.Vector2(from.image.width, from.image.height) },
      uToSize: { value: new THREE.Vector2(to.image.width, to.image.height) },
    }),
    [from, to, size],
  );

  useFrame(() => {
    if (!material.current) return;
    material.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
      material.current.uniforms.uProgress.value,
      progress.get(),
      0.08,
    );
    material.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function ScrollDissolveReveal() {
  const section = useRef(null);
  const [progressLabel, setProgressLabel] = useState(0);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const dissolveProgress = useTransform(scrollYProgress, [0.08, 0.78], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.66, 0.9], [70, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressLabel(Math.min(100, Math.round(latest * 100)));
  });

  return (
    <section ref={section} id="vision" className="relative h-[300vh] bg-obsidian">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Canvas
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          dpr={[1, 1.6]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          aria-label="Exterior tower dissolving into a mixed-use business atrium"
        >
          <DissolvePlane progress={dissolveProgress} />
        </Canvas>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,5,.3),transparent_40%,rgba(3,4,5,.72))]" />

        <motion.div
          animate={{ opacity: progressLabel < 34 ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 grid place-items-center px-6"
        >
          <div className="text-center">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.38em] text-champagne">
              Outside in
            </p>
            <h2 className="max-w-[1000px] text-[clamp(2.6rem,7.8vw,8rem)] font-extrabold uppercase leading-[0.82] tracking-mega text-ivory">
              Beyond the façade
            </h2>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: progressLabel > 68 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ y: revealY }}
          className="absolute inset-0 flex items-end px-5 pb-12 md:px-9 md:pb-14"
        >
          <div className="mx-auto grid w-full max-w-[1540px] gap-7 border-t border-white/25 pt-6 lg:grid-cols-[1.6fr_.7fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-champagne">
                One address · Every ambition
              </p>
              <h2 className="max-w-[980px] text-[clamp(2.6rem,7.2vw,7.5rem)] font-extrabold uppercase leading-[0.82] tracking-mega text-ivory">
                Mixed-Use
                <br />
                Business Facility
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-6 text-white/72 lg:justify-self-end">
              A seamlessly connected ecosystem of intelligent offices, elevated
              retail, business hospitality and restorative social spaces—designed
              to keep enterprise moving.
            </p>
          </div>
        </motion.div>

        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/55 md:flex md:right-9">
          <span>{String(progressLabel).padStart(2, "0")}</span>
          <span className="relative h-28 w-px bg-white/20">
            <motion.span
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 origin-top bg-champagne"
            />
          </span>
          <span className="[writing-mode:vertical-rl]">Transition</span>
        </div>
      </div>
    </section>
  );
}
