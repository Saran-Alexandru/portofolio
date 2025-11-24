// src/components/ShaderBackground.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import * as TSL from "three/tsl";

import Transpiler from "three/addons/transpiler/Transpiler.js";
import ShaderToyDecoder from "three/addons/transpiler/ShaderToyDecoder.js";
import TSLEncoder from "three/addons/transpiler/TSLEncoder.js";

// We extend the runtime THREE.Node, but we keep typing loose to avoid TS errors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ShaderToyNode extends (THREE as any).Node {
  mainImage: (() => unknown) | null = null;

  transpile(glsl: string, iife = false): string {
    const decoder = new ShaderToyDecoder();
    const encoder = new TSLEncoder();
    encoder.iife = iife;

    return new Transpiler(decoder, encoder).parse(glsl);
  }

  parse(glsl: string): void {
    const jsCode = this.transpile(glsl, true);

    const moduleFn = eval(jsCode) as (tsl: typeof TSL) => {
      mainImage: () => unknown;
    };

    const { mainImage } = moduleFn(TSL);
    this.mainImage = mainImage;
  }

  // this is called by the node material
  setup() {
    if (!this.mainImage) {
      throw new Error("ShaderToyNode: parse() must be called first");
    }

    return this.mainImage();
  }
}

// blue water shader
const blueShader = `
// https://www.shadertoy.com/view/Mt2SzR

float random(float x) {
  return fract(sin(x) * 10000.);
}

float noise(vec2 p) {
  return random(p.x + p.y * 10000.);
}

vec2 sw(vec2 p) { return vec2(floor(p.x), floor(p.y)); }
vec2 se(vec2 p) { return vec2(ceil(p.x), floor(p.y)); }
vec2 nw(vec2 p) { return vec2(floor(p.x), ceil(p.y)); }
vec2 ne(vec2 p) { return vec2(ceil(p.x), ceil(p.y)); }

float smoothNoise(vec2 p) {
  vec2 interp = smoothstep(0., 1., fract(p));
  float s = mix(noise(sw(p)), noise(se(p)), interp.x);
  float n = mix(noise(nw(p)), noise(ne(p)), interp.x);
  return mix(s, n, interp.y);
}

float fractalNoise(vec2 p) {
  float x = 0.;
  x += smoothNoise(p);
  x += smoothNoise(p * 2.) / 2.;
  x += smoothNoise(p * 4.) / 4.;
  x += smoothNoise(p * 8.) / 8.;
  x += smoothNoise(p * 16.) / 16.;
  x /= 1. + 1./2. + 1./4. + 1./8. + 1./16.;
  return x;
}

float movingNoise(vec2 p) {
  float x = fractalNoise(p + iTime);
  float y = fractalNoise(p - iTime);
  return fractalNoise(p + vec2(x, y));
}

float nestedNoise(vec2 p) {
  float x = movingNoise(p);
  float y = movingNoise(p + 100.);
  return movingNoise(p + vec2(x, y));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  vec2 uv = fragCoord.xy / iResolution.xy;
  float n = nestedNoise(uv * 6.);
  fragColor = vec4(mix(vec3(.4, .6, 1.), vec3(.1, .2, 1.), n), 1.);
}
`;
type ShaderBackgroundProps = {
  isLight: boolean;
};

export default function ShaderBackground({ isLight }: ShaderBackgroundProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // parse shader from GLSL
    const shaderNode = new ShaderToyNode();
    shaderNode.parse(blueShader);

    // scene setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicNodeMaterial();

    // colorNode expects a TSL node; ShaderToyNode behaves like one at runtime
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (material as any).colorNode = shaderNode;

    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    const renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const renderLoop = () => {
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(renderLoop);
    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // full-screen background behind everything else
  return (
    <div
      ref={mountRef}
      className={`
      fixed inset-0 -z-10
      filter transition-[filter] duration-700
      ${isLight ? "brightness-3" : "brightness-90"}
    `}
    />
  ); }
