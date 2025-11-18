// src/components/three/ConvexDodecahedron.tsx

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export default function ConvexDodecahedron() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    // === SCENĂ, CAMERA, RENDERER ===
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
    camera.position.set(15, 20, 30);
    scene.add(camera);

    // === CONTROLS ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // === LIGHTS ===
    scene.add(new THREE.AmbientLight(0x666666));

    const light = new THREE.PointLight(0xffffff, 3, 0, 0);
    camera.add(light);

    // === TEXTURĂ PENTRU PUNCTE ===
    const loader = new THREE.TextureLoader();
    // pune fișierul în /public/textures/sprites/disc.png
    const texture = loader.load("/textures/sprites/disc.png");
    texture.colorSpace = THREE.SRGBColorSpace;

    // === GROUP ===
    const group = new THREE.Group();
    scene.add(group);

    // === DODECAHEDRON + VERTEXE ===
    let dodecahedronGeometry: THREE.BufferGeometry =
      new THREE.DodecahedronGeometry(10);

    dodecahedronGeometry.deleteAttribute("normal");
    dodecahedronGeometry.deleteAttribute("uv");

    dodecahedronGeometry = BufferGeometryUtils.mergeVertices(
      dodecahedronGeometry
    );

    const vertices: THREE.Vector3[] = [];
    const positionAttribute = dodecahedronGeometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      vertices.push(vertex);
    }

    // Punctele albastre
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x0080ff,
      map: texture,
      size: 1,
      alphaTest: 0.5,
      transparent: true,
    });

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);

    // Convex hull (mesh transparent)
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xF6F6F6,
      opacity: 0.9,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const meshGeometry = new ConvexGeometry(vertices);
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
    group.add(mesh);

    // === ANIMAȚIE ===
    let frameId: number;

    const onResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      group.rotation.y += 0.00;
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", onResize);
    animate();

    // === CLEANUP ===
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      controls.dispose();

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      meshGeometry.dispose();
      meshMaterial.dispose();
      dodecahedronGeometry.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "500px", overflow: "hidden" }}
    />
  );
}
