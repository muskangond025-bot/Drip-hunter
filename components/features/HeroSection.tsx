"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ArrowUpRight, RotateCcw, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onShopTheLook?: (category: string) => void;
  onExploreCollections?: () => void;
}

// Previous copy data mapped to environments
const ENV_CONTENT = {
  cyber: {
    title: "URBAN DRIP 2026",
    subtitle: "STREETWEAR FOR THE UNCONVENTIONAL",
    desc: "Explore our latest curation of oversized fits, bold graphics, and industrial outerwear.",
    tag: "NEW DROP",
    category: "Graphic Tees"
  },
  forest: {
    title: "TECH-VEST SYSTEM",
    subtitle: "FUNCTIONAL UTILITY MEETS STREET",
    desc: "Designed with weatherproof nylon, adjustable tactical straps, and modular storage.",
    tag: "COLLECTIONS",
    category: "Tactical Vests"
  },
  desert: {
    title: "CYBER ACCESSORIES",
    subtitle: "FUTUREPROOF UTILITY GEAR",
    desc: "Finish the outfit with modular chest bags, custom frame shades, and utility keyclips.",
    tag: "ACCESSORIES",
    category: "Utility Caps"
  }
};

// ----------------------------------------------------
// PROCEDURAL FALLBACK SNEAKER (If CDN is offline)
// ----------------------------------------------------
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

  const lacesMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
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

export function HeroSection({ onShopTheLook, onExploreCollections }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeEnv, setActiveEnv] = useState<"cyber" | "forest" | "desert">("cyber");
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  // Pivot object reference
  const sneakerRef = useRef<THREE.Group | null>(null);
  const resetTrigger = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current.parentElement;
    if (!container) return;

    setLoading(false);

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

    // 5. Environment backdrops preloading
    const textureLoader = new THREE.TextureLoader();
    const textures: Record<string, THREE.Texture> = {};

    const textureUrls = {
      cyber: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
      forest: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
      desert: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
    };

    Object.entries(textureUrls).forEach(([key, url]) => {
      textureLoader.load(url, (tex) => {
        tex.mapping = THREE.EquirectangularReflectionMapping;
        textures[key] = tex;
        if (key === activeEnv) {
          updateEnvironment(activeEnv);
        }
      });
    });

    // 6. Load Photorealistic 3D Sneaker model
    const loader = new GLTFLoader();
    loader.load(
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / maxDim;
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
        
        // Position pivot based on desktop scale
        const isDesktop = window.innerWidth >= 1024;
        pivot.position.x = isDesktop ? 1.8 : 0;
        
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

        const isDesktop = window.innerWidth >= 1024;
        pivot.position.x = isDesktop ? 1.8 : 0;

        scene.add(pivot);
        sneakerRef.current = pivot;
        setLoading(false);
      }
    );

    // Mouse look parallax coordinates
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 - 1;
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

      // Adjust X position offset on resize
      if (sneakerRef.current) {
        const isDesktop = window.innerWidth >= 1024;
        sneakerRef.current.position.x = isDesktop ? 1.8 : 0;
      }
    };
    window.addEventListener("resize", handleResize);

    const resetRotation = () => {
      if (sneakerRef.current) {
        sneakerRef.current.rotation.set(0, 0, 0);
      }
    };
    resetTrigger.current = resetRotation;

    const clock = new THREE.Clock();

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      // Parallax look-around camera tracking
      camera.position.x = mouse.x * 1.8;
      camera.position.y = mouse.y * 1.5 + 0.3;
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

        if (activeEnv === "desert") {
          positions[i * 3] += 0.015;
        }

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

    const updateEnvironment = (env: "cyber" | "forest" | "desert") => {
      if (textures[env]) {
        scene.environment = textures[env];
      } else {
        scene.environment = null;
      }
      scene.background = null;

      if (env === "cyber") {
        spotLight1.color.setHex(0x06b6d4);
        spotLight2.color.setHex(0xec4899);
        spotLight1.intensity = 10;
        spotLight2.intensity = 10;
        ambientLight.color.setHex(0xffffff);
        ambientLight.intensity = 0.7;
        dirLight.color.setHex(0xffffff);
        dirLight.intensity = 1.4;
        particleMaterial.color.setHex(0x06b6d4);
        particleMaterial.size = 0.05;
        fog.color.setHex(0x0a0a0c);
        fog.density = 0.02;
      } else if (env === "forest") {
        spotLight1.color.setHex(0xa3e635);
        spotLight2.color.setHex(0xfacc15);
        spotLight1.intensity = 6;
        spotLight2.intensity = 4;
        ambientLight.color.setHex(0xdcfce7);
        ambientLight.intensity = 0.9;
        dirLight.color.setHex(0xfef08a);
        dirLight.intensity = 1.0;
        particleMaterial.color.setHex(0xa3e635);
        particleMaterial.size = 0.06;
        fog.color.setHex(0x050a07);
        fog.density = 0.04;
      } else if (env === "desert") {
        spotLight1.color.setHex(0xf97316);
        spotLight2.color.setHex(0xeab308);
        spotLight1.intensity = 8;
        spotLight2.intensity = 6;
        ambientLight.color.setHex(0xffedd5);
        ambientLight.intensity = 0.8;
        dirLight.color.setHex(0xfdba74);
        dirLight.intensity = 1.8;
        particleMaterial.color.setHex(0xf97316);
        particleMaterial.size = 0.04;
        fog.color.setHex(0x0f0601);
        fog.density = 0.03;
      }
    };

    (canvasRef.current as any).updateEnv = updateEnvironment;

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

  useEffect(() => {
    if (canvasRef.current && (canvasRef.current as any).updateEnv) {
      (canvasRef.current as any).updateEnv(activeEnv);
    }
  }, [activeEnv]);

  const activeContent = ENV_CONTENT[activeEnv];

  return (
    <section 
      className={cn(
        "relative w-full min-h-[90vh] flex items-center overflow-hidden transition-all duration-1000",
        activeEnv === "cyber" && "bg-gradient-to-b from-zinc-50 to-[#050507]",
        activeEnv === "forest" && "bg-gradient-to-b from-zinc-50 to-[#020503]",
        activeEnv === "desert" && "bg-gradient-to-b from-zinc-50 to-[#0c0501]"
      )}
    >
      {/* 1. Full-bleed background WebGL canvas */}
      <div className="absolute inset-0 w-full h-full z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        />
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 font-mono text-xs gap-3 z-10 bg-zinc-950/90">
          <span className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-zinc-300 animate-spin" />
          <span>Hydrating 3D Footwear Twin {loadPercent > 0 && `(${loadPercent}%)`}...</span>
        </div>
      )}

      {/* 2. Text layout content overlay (absolute on top) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 pointer-events-none">
        
        {/* Left Side Content - restores pointer events for forms/buttons */}
        <div className="space-y-6 text-white max-w-xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-black tracking-widest px-4 py-2 rounded shadow-sm">
            ⚡ {activeContent.tag}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-chaney-title leading-[1.05] uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              {activeContent.title}
            </h1>
            <h2 className="text-sm sm:text-lg font-mono text-zinc-300 font-bold tracking-widest uppercase transition-all duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {activeContent.subtitle}
            </h2>
            <p className="text-white text-sm sm:text-[15px] max-w-md leading-relaxed font-sans font-semibold drop-shadow-sm bg-black/40 px-4 py-3 rounded-2xl backdrop-blur-md border border-white/5">
              {activeContent.desc}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onShopTheLook && onShopTheLook(activeContent.category)}
              className={cn(
                "font-extrabold uppercase text-xs tracking-wider px-8 py-4.5 rounded-full flex items-center gap-2 transition-all shadow-md hover:scale-102 cursor-pointer border-none",
                activeEnv === "cyber" && "bg-white text-black hover:bg-cyan-400 hover:shadow-cyan-400/20",
                activeEnv === "forest" && "bg-white text-black hover:bg-lime-400 hover:shadow-lime-400/20",
                activeEnv === "desert" && "bg-white text-black hover:bg-orange-500 hover:shadow-orange-500/20"
              )}
            >
              Shop the Look
              <ArrowUpRight className="w-4 h-4 transition-transform" />
            </button>
            <button
              onClick={onExploreCollections}
              className="border border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 hover:text-white text-zinc-300 font-extrabold uppercase text-xs tracking-wider px-8 py-4.5 rounded-full transition-all cursor-pointer backdrop-blur-md"
            >
              Explore Collections
            </button>
          </div>

          {/* Environment Switcher Panel */}
          <div className="space-y-3 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-zinc-700 font-extrabold tracking-wider uppercase block">
                Environment Reflection Probes:
              </span>
              <span title="Updates global light reflections and backdrops dynamically.">
                <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: "cyber", label: "Neon Grid", activeClass: "bg-cyan-500 border-cyan-500 text-white shadow-sm shadow-cyan-500/20" },
                { id: "forest", label: "Mossy Forest", activeClass: "bg-lime-600 border-lime-600 text-white shadow-sm shadow-lime-600/20" },
                { id: "desert", label: "Desert Dunes", activeClass: "bg-orange-500 border-orange-500 text-white shadow-sm shadow-orange-500/20" }
              ].map((matrix) => {
                const isActive = activeEnv === matrix.id;
                return (
                  <button
                    key={matrix.id}
                    onClick={() => setActiveEnv(matrix.id as any)}
                    className={cn(
                      "px-4.5 py-3 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs backdrop-blur-md",
                      isActive 
                        ? matrix.activeClass
                        : "border-zinc-250 text-zinc-700 bg-white/70 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
                    )}
                  >
                    {matrix.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Floating help hint overlays in screen bottom right */}
      <div className="absolute bottom-16 right-4 text-[9px] font-mono uppercase tracking-widest text-zinc-500 bg-zinc-950/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-zinc-800/50 pointer-events-none select-none z-10">
        Drag anywhere to Rotate
      </div>
    </section>
  );
}
