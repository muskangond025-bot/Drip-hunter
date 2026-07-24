"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { ChevronLeft, ChevronRight, RotateCw, Plus, Check, Sparkles } from "lucide-react";
import { InteractiveAddToCartButton } from "@/components/ui/InteractiveAddToCartButton";

// --- Types & Data Definitions ---
export type CategoryKey = "tshirt" | "jacket" | "headwear" | "shoes";

export interface OutfitItem {
  id: string;
  name: string;
  category: CategoryKey;
  price: number;
  color: string;
  secondaryColor?: string;
  image: string;
  description: string;
}

export interface Category {
  id: CategoryKey;
  label: string;
  iconSvg: React.ReactNode;
}

const CATEGORIES: Category[] = [
  {
    id: "tshirt",
    label: "T-shirt",
    iconSvg: (
      <img src="/images/drip_tshirt_exact.png" alt="T-shirt" className="w-10 h-10 object-contain" />
    ),
  },
  {
    id: "jacket",
    label: "Jacket",
    iconSvg: (
      <img src="/images/drip_jacket_exact.png" alt="Jacket" className="w-10 h-10 object-contain" />
    ),
  },
  {
    id: "headwear",
    label: "Cap",
    iconSvg: (
      <img src="/images/drip_cap_exact.png" alt="Cap" className="w-10 h-10 object-contain" />
    ),
  },
  {
    id: "shoes",
    label: "Shoes",
    iconSvg: (
      <img src="/images/drip_shoes_exact.png" alt="Shoes" className="w-10 h-10 object-contain" />
    ),
  },
];

const ITEMS_BY_CATEGORY: Record<CategoryKey, OutfitItem[]> = {
  tshirt: [
    {
      id: "t1",
      name: "Blue Drip Essential Tee",
      category: "tshirt",
      price: 1899,
      color: "#2563eb",
      secondaryColor: "#ffffff",
      image: "/images/drip_tshirt_exact.png",
      description: "Royal Blue heavyweight cotton tee.",
    },
    {
      id: "t2",
      name: "Black Cyber Street Tee",
      category: "tshirt",
      price: 2199,
      color: "#18181b",
      secondaryColor: "#f59e0b",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
      description: "Jet black oversized fit tee.",
    },
    {
      id: "t3",
      name: "Neon Volt Graphic Tee",
      category: "tshirt",
      price: 1999,
      color: "#84cc16",
      secondaryColor: "#09090b",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80",
      description: "Electric lime green graphic tee.",
    },
    {
      id: "t4",
      name: "Crimson Red Vintage Tee",
      category: "tshirt",
      price: 1799,
      color: "#dc2626",
      secondaryColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80",
      description: "Washed crimson red Boxy fit T-Shirt.",
    },
  ],
  jacket: [
    {
      id: "j1",
      name: "Blue Drip Varsity Jacket",
      category: "jacket",
      price: 4999,
      color: "#2563eb",
      secondaryColor: "#ffffff",
      image: "/images/drip_jacket_exact.png",
      description: "Varsity jacket with leather sleeves.",
    },
    {
      id: "j2",
      name: "Black Stealth Biker Jacket",
      category: "jacket",
      price: 5999,
      color: "#09090b",
      secondaryColor: "#3f3f46",
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=400&q=80",
      description: "Matte black synthetic leather jacket.",
    },
    {
      id: "j3",
      name: "Olive Tactical Bomber",
      category: "jacket",
      price: 4499,
      color: "#4d7c0f",
      secondaryColor: "#f59e0b",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80",
      description: "Flight bomber jacket in military olive.",
    },
    {
      id: "j4",
      name: "Grey Distressed Denim Jacket",
      category: "jacket",
      price: 3899,
      color: "#64748b",
      secondaryColor: "#cbd5e1",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80",
      description: "Vintage stone-washed denim jacket.",
    },
  ],
  headwear: [
    {
      id: "h1",
      name: "Blue Drip Snapback Cap",
      category: "headwear",
      price: 1299,
      color: "#2563eb",
      secondaryColor: "#ffffff",
      image: "/images/drip_cap_exact.png",
      description: "6-panel snapback cap.",
    },
    {
      id: "h2",
      name: "Black Streetwear Beanie",
      category: "headwear",
      price: 999,
      color: "#09090b",
      secondaryColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80",
      description: "Ribbed knit beanie with cuff.",
    },
    {
      id: "h3",
      name: "White Minimalist Bucket Hat",
      category: "headwear",
      price: 1199,
      color: "#f8fafc",
      secondaryColor: "#09090b",
      image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=400&q=80",
      description: "Clean cotton twill bucket hat.",
    },
    {
      id: "h4",
      name: "Crimson Red Dad Hat",
      category: "headwear",
      price: 1099,
      color: "#dc2626",
      secondaryColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80",
      description: "Unstructured curved visor cap.",
    },
  ],
  shoes: [
    {
      id: "s1",
      name: "Black / Pink Puma Nitro Runner",
      category: "shoes",
      price: 6999,
      color: "#ec4899",
      secondaryColor: "#09090b",
      image: "/images/puma_black_pink_exact.png",
      description: "Puma Nitro runner with neon pink midsole accents.",
    },
    {
      id: "s2",
      name: "Black / Neon Green Puma Kicks",
      category: "shoes",
      price: 7499,
      color: "#84cc16",
      secondaryColor: "#09090b",
      image: "/images/puma_black_neon_exact.png",
      description: "Puma Kicks in neon yellow-green & black upper.",
    },
    {
      id: "s3",
      name: "Red Puma Running Nitro",
      category: "shoes",
      price: 6499,
      color: "#ef4444",
      secondaryColor: "#ffffff",
      image: "/images/puma_red_exact.png",
      description: "Crimson red suede & mesh runner with white sole.",
    },
    {
      id: "s4",
      name: "Yellow / Orange Flame Puma",
      category: "shoes",
      price: 7999,
      color: "#f59e0b",
      secondaryColor: "#dc2626",
      image: "/images/puma_yellow_orange_exact.png",
      description: "Fiery yellow-to-orange gradient upper runner.",
    },
  ],
};

export default function CompleteYourDrip() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("shoes");
  const [equippedItems, setEquippedItems] = useState<Record<CategoryKey, OutfitItem | null>>({
    tshirt: ITEMS_BY_CATEGORY.tshirt[0],
    jacket: null,
    headwear: ITEMS_BY_CATEGORY.headwear[0],
    shoes: ITEMS_BY_CATEGORY.shoes[0],
  });

  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mannequinGroupRef = useRef<THREE.Group | null>(null);

  // --- Three.js 3D Mannequin Scene Setup ---
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.parentElement?.clientWidth || 500;
    const height = canvas.parentElement?.clientHeight || 550;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 1.25, 4.3);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.9);
    fillLight.position.set(-5, 4, -4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffedd5, 1.8, 10);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // 3. Mannequin Group Construction (Silver Wireframe / Matte Mannequin Statue)
    const mannequinGroup = new THREE.Group();
    mannequinGroupRef.current = mannequinGroup;
    scene.add(mannequinGroup);

    const mannequinMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      roughness: 0.25,
      metalness: 0.18,
    });

    // Statue Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(0.8, 0.85, 0.08, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -1.35, 0);
    baseMesh.receiveShadow = true;
    mannequinGroup.add(baseMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.22, 32, 32);
    headGeo.scale(1, 1.25, 0.95);
    const headMesh = new THREE.Mesh(headGeo, mannequinMaterial);
    headMesh.position.set(0, 1.32, 0);
    headMesh.castShadow = true;
    mannequinGroup.add(headMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.09, 0.11, 0.16, 20);
    const neckMesh = new THREE.Mesh(neckGeo, mannequinMaterial);
    neckMesh.position.set(0, 1.06, 0);
    mannequinGroup.add(neckMesh);

    // Chest & Torso
    const torsoGeo = new THREE.CylinderGeometry(0.36, 0.26, 0.75, 32);
    torsoGeo.scale(1, 1, 0.75);
    const torsoMesh = new THREE.Mesh(torsoGeo, mannequinMaterial);
    torsoMesh.position.set(0, 0.62, 0);
    torsoMesh.castShadow = true;
    mannequinGroup.add(torsoMesh);

    // Hips / Pelvis
    const hipsGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.28, 28);
    hipsGeo.scale(1, 1, 0.75);
    const hipsMesh = new THREE.Mesh(hipsGeo, mannequinMaterial);
    hipsMesh.position.set(0, 0.12, 0);
    mannequinGroup.add(hipsMesh);

    // Legs (Left & Right)
    const legGeo = new THREE.CylinderGeometry(0.12, 0.08, 1.35, 24);
    
    const leftLeg = new THREE.Mesh(legGeo, mannequinMaterial);
    leftLeg.position.set(-0.16, -0.65, 0);
    leftLeg.castShadow = true;
    mannequinGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, mannequinMaterial);
    rightLeg.position.set(0.16, -0.65, 0);
    rightLeg.castShadow = true;
    mannequinGroup.add(rightLeg);

    // Feet (Left & Right)
    const footGeo = new THREE.BoxGeometry(0.12, 0.08, 0.28);
    
    const leftFoot = new THREE.Mesh(footGeo, mannequinMaterial);
    leftFoot.position.set(-0.16, -1.28, 0.06);
    mannequinGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, mannequinMaterial);
    rightFoot.position.set(0.16, -1.28, 0.06);
    mannequinGroup.add(rightFoot);

    // Arms (Left & Right)
    const armGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.75, 20);
    
    const leftArm = new THREE.Mesh(armGeo, mannequinMaterial);
    leftArm.position.set(-0.42, 0.58, 0);
    leftArm.rotation.z = 0.15;
    mannequinGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, mannequinMaterial);
    rightArm.position.set(0.42, 0.58, 0);
    rightArm.rotation.z = -0.15;
    mannequinGroup.add(rightArm);

    // 4. Attachment Groups for Wearable Gear
    const headwearGroup = new THREE.Group();
    headwearGroup.position.set(0, 1.48, 0);
    mannequinGroup.add(headwearGroup);

    const topGroup = new THREE.Group();
    topGroup.position.set(0, 0.62, 0);
    mannequinGroup.add(topGroup);

    const shoesGroup = new THREE.Group();
    shoesGroup.position.set(0, -1.29, 0.06);
    mannequinGroup.add(shoesGroup);

    // Dynamic 3D Gear Renderer
    const update3DGear = () => {
      while (headwearGroup.children.length > 0) headwearGroup.remove(headwearGroup.children[0]);
      while (topGroup.children.length > 0) topGroup.remove(topGroup.children[0]);
      while (shoesGroup.children.length > 0) shoesGroup.remove(shoesGroup.children[0]);

      // A. Equipped Headwear (Cap / Beanie / Bucket Hat)
      if (equippedItems.headwear) {
        const item = equippedItems.headwear;
        const capMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(item.color),
          roughness: 0.35,
          metalness: 0.1,
        });

        // Fitted Cap Dome
        const capDomeGeo = new THREE.SphereGeometry(0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52);
        const capDomeMesh = new THREE.Mesh(capDomeGeo, capMat);
        headwearGroup.add(capDomeMesh);

        // Curved Cap Brim Visor
        const visorGeo = new THREE.BoxGeometry(0.32, 0.02, 0.22);
        const visorMesh = new THREE.Mesh(visorGeo, capMat);
        visorMesh.position.set(0, -0.06, 0.18);
        visorMesh.rotation.x = 0.12;
        headwearGroup.add(visorMesh);
      }

      // B. Equipped Torso (T-Shirt / Jacket)
      if (equippedItems.jacket || equippedItems.tshirt) {
        const item = equippedItems.jacket || equippedItems.tshirt!;
        const topMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(item.color),
          roughness: 0.45,
          metalness: item.category === "jacket" ? 0.25 : 0.05,
        });

        // Fitted Shirt/Jacket Torso Shell
        const shirtGeo = new THREE.CylinderGeometry(0.38, 0.28, 0.78, 32);
        shirtGeo.scale(1.03, 1.03, 0.78);
        const shirtMesh = new THREE.Mesh(shirtGeo, topMat);
        topGroup.add(shirtMesh);

        // Form-fitted Collar Ring
        const collarGeo = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
        collarGeo.rotateX(Math.PI / 2);
        const collarMesh = new THREE.Mesh(collarGeo, topMat);
        collarMesh.position.set(0, 0.38, 0);
        topGroup.add(collarMesh);

        // Form-fitted Sleeves
        const sleeveGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.35, 20);
        
        const leftSleeve = new THREE.Mesh(sleeveGeo, topMat);
        leftSleeve.position.set(-0.41, 0.12, 0);
        leftSleeve.rotation.z = 0.15;
        topGroup.add(leftSleeve);

        const rightSleeve = new THREE.Mesh(sleeveGeo, topMat);
        rightSleeve.position.set(0.41, 0.12, 0);
        rightSleeve.rotation.z = -0.15;
        topGroup.add(rightSleeve);
      }

      // C. Equipped Footwear (Sneakers)
      if (equippedItems.shoes) {
        const item = equippedItems.shoes;
        const shoeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(item.color),
          roughness: 0.3,
        });
        const soleMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(item.secondaryColor || "#ffffff"),
          roughness: 0.2,
        });

        // Left & Right Fitted Sneakers
        [-0.16, 0.16].forEach((xOffset) => {
          const shoeBodyGeo = new THREE.BoxGeometry(0.16, 0.12, 0.32);
          const shoeBody = new THREE.Mesh(shoeBodyGeo, shoeMat);
          shoeBody.position.set(xOffset, 0.02, 0);

          const soleGeo = new THREE.BoxGeometry(0.18, 0.05, 0.34);
          const sole = new THREE.Mesh(soleGeo, soleMat);
          sole.position.set(xOffset, -0.05, 0.01);

          shoesGroup.add(shoeBody);
          shoesGroup.add(sole);
        });
      }
    };

    update3DGear();

    // 5. Animation Loop with Continuous Slow 360° Rotation
    let animationFrameId: number;
    let isDragging = false;
    let previousMouseX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsAutoRotating(false);
      previousMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      mannequinGroup.rotation.y += deltaX * 0.01;
      previousMouseX = e.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Slow Continuous 360° Auto-Rotation when idle
      if (isAutoRotating && !isDragging) {
        mannequinGroup.rotation.y += 0.006;
      } else {
        // Inertia smooth target rotation when clicking arrow buttons
        mannequinGroup.rotation.y += (rotationAngle - mannequinGroup.rotation.y) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Window Resizing
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [equippedItems, rotationAngle, isAutoRotating]);

  // Handler to toggle / equip an outfit item
  const handleSelectOutfitItem = (item: OutfitItem) => {
    setEquippedItems((prev) => ({
      ...prev,
      [item.category]: prev[item.category]?.id === item.id ? null : item,
    }));
  };

  const handleResetRotation = () => {
    setRotationAngle(0);
    setIsAutoRotating(true);
    if (mannequinGroupRef.current) {
      mannequinGroupRef.current.rotation.y = 0;
    }
  };

  // Calculate total price of currently equipped drip
  const totalPrice = Object.values(equippedItems)
    .filter(Boolean)
    .reduce((sum, item) => sum + (item?.price || 0), 0);

  const handleAddToCart = () => {
    const itemsToAdd: any[] = [];
    if (equippedItems.tshirt) {
      itemsToAdd.push({
        id: 8881,
        brand: "URBAN MONKEY",
        name: equippedItems.tshirt.name,
        price: `₹${equippedItems.tshirt.price.toLocaleString("en-IN")}`,
        image: equippedItems.tshirt.image,
      });
    }
    if (equippedItems.jacket) {
      itemsToAdd.push({
        id: 8882,
        brand: "URBAN MONKEY",
        name: equippedItems.jacket.name,
        price: `₹${equippedItems.jacket.price.toLocaleString("en-IN")}`,
        image: equippedItems.jacket.image,
      });
    }
    if (equippedItems.headwear) {
      itemsToAdd.push({
        id: 8883,
        brand: "URBAN MONKEY",
        name: equippedItems.headwear.name,
        price: `₹${equippedItems.headwear.price.toLocaleString("en-IN")}`,
        image: equippedItems.headwear.image,
      });
    }
    if (equippedItems.shoes) {
      itemsToAdd.push({
        id: 8884,
        brand: "PUMA",
        name: equippedItems.shoes.name,
        price: `₹${equippedItems.shoes.price.toLocaleString("en-IN")}`,
        image: equippedItems.shoes.image,
      });
    }

    if (itemsToAdd.length === 0) {
      alert("No items are currently equipped on the statue!");
      return;
    }

    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("drip-cart");
      let currentCart: any[] = [];
      if (savedCart) {
        try {
          currentCart = JSON.parse(savedCart);
        } catch (e) {
          console.error(e);
        }
      }

      itemsToAdd.forEach((newItem) => {
        const itemKey = `${newItem.id}-M`;
        const existingIdx = currentCart.findIndex((item) => `${item.id}-${(item as any).size}` === itemKey);
        if (existingIdx > -1) {
          currentCart[existingIdx] = {
            ...currentCart[existingIdx],
            quantity: currentCart[existingIdx].quantity + 1,
          };
        } else {
          currentCart.push({
            ...newItem,
            quantity: 1,
            size: "M"
          });
        }
      });

      localStorage.setItem("drip-cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("storage"));
    }

    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3000);
  };

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans select-none">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 uppercase tracking-widest font-sans">
          Complete your Drip
        </h2>
      </div>

      {/* Main Container Card (Matching Screenshot Border & Layout) */}
      <div className="bg-white border border-zinc-200 rounded-[28px] p-4 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* --- LEFT SIDEBAR: 4 Main Selection Category Cards (Span 2) --- */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between gap-2.5 h-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative w-full h-[85px] sm:h-[95px] lg:h-full rounded-2xl overflow-hidden cursor-pointer transition-all border-2 flex items-center justify-center bg-white ${
                    isActive
                      ? "border-[#ffeb3b] ring-2 ring-amber-300/40 shadow-sm scale-[1.01]"
                      : "border-zinc-200 hover:border-zinc-350"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1 p-2">
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      {cat.iconSvg}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- MIDDLE SECTION: Dynamic Sub-Menu (2x2 Grid of 4 Item Options) (Span 4) --- */}
          <div className="lg:col-span-4 grid grid-cols-2 grid-rows-2 gap-2.5 h-full">
            {ITEMS_BY_CATEGORY[activeCategory].map((item) => {
              const isEquipped = equippedItems[item.category]?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectOutfitItem(item)}
                  className={`relative w-full h-[140px] lg:h-full rounded-2xl overflow-hidden bg-white cursor-pointer transition-all border-2 p-2 flex flex-col items-center justify-between ${
                    isEquipped
                      ? "border-[#ffeb3b] ring-2 ring-amber-300/40 shadow-sm scale-[1.02]"
                      : "border-zinc-200 hover:border-zinc-350"
                  }`}
                >
                  {/* Equipped Checkmark Badge */}
                  {isEquipped && (
                    <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-[#ffeb3b] text-black flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  {/* Product Image Box */}
                  <div className="relative w-full h-full flex items-center justify-center p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- RIGHT SECTION: 3D Real-Time Canvas Mannequin Statue Viewport (Span 6) --- */}
          <div className="lg:col-span-6 bg-[#f8f9fa] border border-zinc-200 rounded-2xl p-4 relative flex items-center justify-center min-h-[380px] lg:min-h-[420px] shadow-xs overflow-hidden">
            
            {/* Left Chevron Rotation Arrow */}
            <button
              onClick={() => {
                setIsAutoRotating(false);
                setRotationAngle((prev) => prev - Math.PI / 4);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-[#222222] hover:bg-black text-white flex items-center justify-center font-bold shadow-md cursor-pointer border-none transition-transform hover:scale-110 active:scale-95 text-lg"
              title="Rotate Left 45°"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Three.js 3D Interactive WebGL Canvas */}
            <div className="w-full h-[400px] relative flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />
            </div>

            {/* Right Chevron Rotation Arrow */}
            <button
              onClick={() => {
                setIsAutoRotating(false);
                setRotationAngle((prev) => prev + Math.PI / 4);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-[#222222] hover:bg-black text-white flex items-center justify-center font-bold shadow-md cursor-pointer border-none transition-transform hover:scale-110 active:scale-95 text-lg"
              title="Rotate Right 45°"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Top Center Reset Rotation Button (⟲ Reset 0°) */}
            <button
              onClick={handleResetRotation}
              className="absolute top-3 left-4 z-20 px-3 py-1.5 bg-white/90 hover:bg-white border border-zinc-200 rounded-lg text-[10px] font-mono font-bold text-zinc-700 hover:text-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
              title="Reset Rotation to 0°"
            >
              <RotateCw className="w-3 h-3 text-amber-500" />
              <span>Reset 0°</span>
            </button>

            {/* Bottom Floating Buy Badge (Exact Replica from Screenshot) */}
            <div className="absolute bottom-3 right-3 z-30 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-2xl p-2.5 px-3.5 shadow-xl flex flex-col items-end gap-1 font-sans">
              <span className="text-[10px] text-zinc-600 font-medium tracking-tight">
                Like the outfit, <strong className="text-zinc-955 font-extrabold">Buy it Now!</strong>
              </span>
              
              <InteractiveAddToCartButton
                onClick={handleAddToCart}
                buttonText="Add to Cart"
                addedText="Added!"
                animationStyle="truck"
                size="sm"
                className="w-full !bg-[#222222] hover:!bg-black text-white font-extrabold text-[10px] py-2 rounded-xl shadow-md border-none tracking-wide"
                wrapperClassName="w-[110px]"
              />
            </div>
          </div>

        </div>

        {/* Toast Notification when clicking Add to Cart */}
        {addedToCartToast && (
          <div className="absolute top-4 right-4 z-50 bg-zinc-950 text-white text-xs font-mono font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-zinc-700 animate-in fade-in slide-in-from-top-2 duration-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Complete Drip Outfit added to Cart (Total: ₹{totalPrice.toLocaleString("en-IN")})!</span>
          </div>
        )}
      </div>
    </section>
  );
}
