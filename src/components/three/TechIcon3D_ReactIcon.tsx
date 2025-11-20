import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { IconType } from "react-icons";
import { renderToStaticMarkup } from "react-dom/server";

type TechIcon3DProps = {
  Icon: IconType;
  color: string;
};

export default function TechIcon3D({ Icon, color }: TechIcon3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    // === SCENE, CAMERA, RENDERER ===
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
    camera.position.set(0, 0, 30);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // === CONTROLS ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // === LIGHTS ===
    scene.add(new THREE.AmbientLight(0xf6f6f6));

    const light = new THREE.PointLight(0xf6f6f6, 3, 0, 0);
    camera.add(light);

    // === TEXTURE FOR POINTS ===
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/textures/sprites/disc.png");
    texture.colorSpace = THREE.SRGBColorSpace;

    // === GROUP ===
    const group = new THREE.Group();
    scene.add(group);

    // === DODECAHEDRON + VERTICES ===
    let dodecahedronGeometry: THREE.BufferGeometry =
      new THREE.DodecahedronGeometry(8);

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

    // === CONVEX HULL (TRANSPARENT MESH) ===
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xf6f6f6,
      opacity: 0.45,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const meshGeometry = new ConvexGeometry(vertices);
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
    group.add(mesh);

    // === ICON 3D: REACT ICON -> SVG -> CANVAS -> TEXTURE ===
    const svgString = renderToStaticMarkup(
      <Icon color={color} size="160px" />
    );

    const iconCanvasSize = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = iconCanvasSize;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, iconCanvasSize, iconCanvasSize);

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, iconCanvasSize, iconCanvasSize);
      ctx.drawImage(img, 0, 0, iconCanvasSize, iconCanvasSize);
      iconTexture.needsUpdate = true;
    };
    img.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svgString);

    const iconTexture = new THREE.CanvasTexture(canvas);
    iconTexture.colorSpace = THREE.SRGBColorSpace;

    // note: radius increased from 2 -> 4.5 so the logo disc is not tiny
    const iconGeometry = new THREE.CircleGeometry(3.5, 64);
    const iconMaterial = new THREE.MeshBasicMaterial({
      map: iconTexture,
      transparent: true,
    });
    const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);

    // push the icon slightly in front of the hull surface
    // hull radius ~8, so 8.5 keeps it close but visible
    iconMesh.position.z = 8.5;
    group.add(iconMesh);

    // === ANIMATION ===
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

      // keep your rotation logic
      group.rotation.y += 0.0;

      // billboard: icon always faces the camera
      iconMesh.quaternion.copy(camera.quaternion);

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
      iconGeometry.dispose();
      iconMaterial.dispose();
      iconTexture.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [Icon, color]);

  return (
    <div className="w-full h-full overflow-hidden" ref={mountRef} />
  );
}
