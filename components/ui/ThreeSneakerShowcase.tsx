"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Procedural fallback sneaker model
function createProceduralSneaker(): THREE.Group {
  const sneaker = new THREE.Group();

  const soleMaterial = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.85,
    metalness: 0.1,
    flatShading: true,
  });

  const upperMaterial = new THREE.MeshStandardMaterial({
    color: 0x121214,
    roughness: 0.4,
    metalness: 0.2,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.2,
    metalness: 0.8,
  });

  const meshMaterial = new THREE.MeshStandardMaterial({
    color: 0x27272a,
    roughness: 0.9,
    metalness: 0.05,
  });

  const soleGroup = new THREE.Group();
  const soleBaseGeom = new THREE.BoxGeometry(4.5, 0.6, 2.0);
  const soleBase = new THREE.Mesh(soleBaseGeom, soleMaterial);
  soleBase.position.y = -0.6;
  soleGroup.add(soleBase);

  const soleHeelGeom = new THREE.BoxGeometry(1.8, 0.8, 2.0);
  const soleHeel = new THREE.Mesh(soleHeelGeom, soleMaterial);
  soleHeel.position.set(-1.2, -0.5, 0);
  soleGroup.add(soleHeel);

  for (let i = -2; i <= 2; i += 0.6) {
    const gripGeom = new THREE.BoxGeometry(0.2, 0.15, 2.0);
    const grip = new THREE.Mesh(gripGeom, soleMaterial);
    grip.position.set(i, -0.95, 0);
    soleGroup.add(grip);
  }
  sneaker.add(soleGroup);

  const upperGroup = new THREE.Group();
  const upperBodyGeom = new THREE.BoxGeometry(3.6, 1.2, 1.8);
  const upperBody = new THREE.Mesh(upperBodyGeom, upperMaterial);
  upperBody.position.set(-0.2, 0.1, 0);
  upperGroup.add(upperBody);

  const toeBoxGeom = new THREE.BoxGeometry(1.2, 0.7, 1.7);
  const toeBox = new THREE.Mesh(toeBoxGeom, meshMaterial);
  toeBox.position.set(1.5, -0.15, 0);
  upperGroup.add(toeBox);

  const collarGeom = new THREE.CylinderGeometry(0.8, 0.9, 1.2, 16);
  const collar = new THREE.Mesh(collarGeom, upperMaterial);
  collar.position.set(-1.0, 0.9, 0);
  collar.rotation.z = -0.2;
  upperGroup.add(collar);

  const sockGeom = new THREE.CylinderGeometry(0.72, 0.8, 0.4, 16);
  const sock = new THREE.Mesh(sockGeom, accentMaterial);
  sock.position.set(-1.05, 1.5, 0);
  sock.rotation.z = -0.2;
  upperGroup.add(sock);

  const stripe1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.15, 1.85), accentMaterial);
  stripe1.position.set(0, 0.1, 0);
  stripe1.rotation.z = 0.25;
  upperGroup.add(stripe1);

  const tongue = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 1.0), meshMaterial);
  tongue.position.set(0.2, 0.7, 0);
  tongue.rotation.z = -0.5;
  upperGroup.add(tongue);

  sneaker.add(upperGroup);
  sneaker.scale.set(0.85, 0.85, 0.85);
  sneaker.position.y = 0.2;

  return sneaker;
}

export function ThreeSneakerShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  // Pivot object reference
  const sneakerRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current.parentElement;
    if (!container) return;

    setLoading(true);

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    // Dual spotlights following cursor
    const spotLight1 = new THREE.SpotLight(0x06b6d4, 8, 20, Math.PI / 5, 0.5, 1);
    spotLight1.position.set(-5, 5, 5);
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0xec4899, 8, 20, Math.PI / 5, 0.5, 1);
    spotLight2.position.set(5, 5, 5);
    scene.add(spotLight2);

    // Fog
    const fog = new THREE.FogExp2(0x0a0a0c, 0.02);
    scene.fog = fog;

    // Particles
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Load Photorealistic 3D Sneaker model
    const loader = new GLTFLoader();
    loader.load(
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleVal = 3.2;
        const scale = scaleVal / maxDim;
        model.scale.set(scale, scale, scale);

        // Center inside pivot group
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale + 0.2;
        model.position.z = -center.z * scale;

        model.traverse((node) => {
          if ((node as any).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material && (mesh.material as any).isMeshStandardMaterial) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(mat.roughness, 0.15);
              mat.envMapIntensity = 2.0;
            }
          }
        });

        // Add to parent pivot group
        const pivot = new THREE.Group();
        pivot.add(model);
        pivot.position.x = 0; // Centered inside the card
        
        scene.add(pivot);
        sneakerRef.current = pivot;
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadPercent(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.warn("Failed to fetch GLTF model from CDN. Loading procedural fallback.", error);
        const fallback = createProceduralSneaker();
        const pivot = new THREE.Group();
        pivot.add(fallback);

        const scaleVal = 0.85;
        fallback.scale.set(scaleVal, scaleVal, scaleVal);
        pivot.position.x = 0;

        scene.add(pivot);
        sneakerRef.current = pivot;
        setLoading(false);
      }
    );

    // Mouse look parallax coordinates
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      targetMouse.x = (clientX / rect.width) * 2 - 1;
      targetMouse.y = -(clientY / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMoveGlobal);

    // Click and drag logic (Rotates the pivot group)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMoveDrag = (e: MouseEvent) => {
      if (!isDragging || !sneakerRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      sneakerRef.current.rotation.y += deltaX * 0.008;
      sneakerRef.current.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvasRef.current.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMoveDrag);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1 || !sneakerRef.current) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      sneakerRef.current.rotation.y += deltaX * 0.008;
      sneakerRef.current.rotation.x += deltaY * 0.008;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    canvasRef.current.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      // Parallax look-around camera tracking
      camera.position.x = mouse.x * 1.5;
      camera.position.y = mouse.y * 1.2 + 0.3;
      camera.lookAt(0, 0.2, 0);

      // Light coordinates follow cursor
      spotLight1.position.x = -5 + mouse.x * 3.0;
      spotLight1.position.y = 5 + mouse.y * 3.0;
      spotLight2.position.x = 5 + mouse.x * 3.0;
      spotLight2.position.y = 5 + mouse.y * 3.0;

      // Float sneaker if not dragging
      if (!isDragging && sneakerRef.current) {
        sneakerRef.current.position.y = Math.sin(elapsedTime * 1.3) * 0.12;
        sneakerRef.current.rotation.y += 0.004;
      }

      // Particles motion
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.006 + (i % 3) * 0.002;

        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -4;
          positions[i * 3] = (Math.random() - 0.5) * 12;
        }
        if (positions[i * 3] > 6) {
          positions[i * 3] = -6;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mousemove", handleMouseMoveDrag);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("touchstart", handleTouchStart);
      }
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      
      scene.traverse((object) => {
        if ((object as any).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] sm:min-h-[450px] lg:min-h-[500px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 font-mono text-[10px] sm:text-xs gap-3 bg-zinc-950/80 rounded-3xl">
          <span className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-zinc-300 animate-spin" />
          <span>Hydrating 3D Footwear Twin {loadPercent > 0 && `(${loadPercent}%)`}...</span>
        </div>
      )}
    </div>
  );
}

export default ThreeSneakerShowcase;
