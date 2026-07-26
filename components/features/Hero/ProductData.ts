export interface ColorOption {
  value: string;
  img: string;
  name: string;
}

export interface SizingData {
  EU: string[];
  US: string[];
}

export interface ProductItem {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  accent: string;
  image: string; // main fallback
  colors: ColorOption[];
  sizes: SizingData;
}

export const HERO_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "Airmax 270",
    subtitle: "React Heritage Red",
    price: "$270",
    accent: "#ef4444", // red
    image: "/images/sneaker-1.png",
    colors: [
      { value: "#ef4444", img: "/images/sneaker-1.png", name: "Heritage Red" },
      { value: "#3b82f6", img: "/images/sneaker-2.png", name: "Cyber Blue" },
      { value: "#10b981", img: "/images/sneaker-3.png", name: "Volt Green" },
      { value: "#ec4899", img: "/images/sneaker-5.png", name: "Volt Pink" }
    ],
    sizes: {
      EU: ["40", "41", "42", "43"],
      US: ["7.5", "8", "8.5", "9"]
    }
  },
  {
    id: 2,
    name: "Cyber 720",
    subtitle: "Volt Black Neon",
    price: "$240",
    accent: "#10b981", // green
    image: "/images/sneaker-3.png",
    colors: [
      { value: "#10b981", img: "/images/sneaker-3.png", name: "Volt Green" },
      { value: "#3b82f6", img: "/images/sneaker-2.png", name: "Cyber Blue" },
      { value: "#ef4444", img: "/images/sneaker-1.png", name: "Heritage Red" },
      { value: "#eab308", img: "/images/sneaker-5.png", name: "Volt Yellow" }
    ],
    sizes: {
      EU: ["41", "42", "43", "44"],
      US: ["8", "8.5", "9", "10"]
    }
  },
  {
    id: 3,
    name: "Volt Jump",
    subtitle: "Volt Yellow Gold",
    price: "$190",
    accent: "#eab308", // yellow
    image: "/images/sneaker-5.png",
    colors: [
      { value: "#eab308", img: "/images/sneaker-5.png", name: "Volt Yellow" },
      { value: "#10b981", img: "/images/sneaker-3.png", name: "Volt Green" },
      { value: "#ef4444", img: "/images/sneaker-1.png", name: "Heritage Red" },
      { value: "#ec4899", img: "/images/sneaker-4.png", name: "Volt Pink" }
    ],
    sizes: {
      EU: ["39", "40", "41", "42"],
      US: ["7", "8", "8.5", "9"]
    }
  },
  {
    id: 4,
    name: "Fusion React",
    subtitle: "Cyber Fuchsia Pink",
    price: "$210",
    accent: "#ec4899", // pink
    image: "/images/sneaker-2.png",
    colors: [
      { value: "#ec4899", img: "/images/sneaker-2.png", name: "Cyber Blue-Pink" },
      { value: "#3b82f6", img: "/images/sneaker-2.png", name: "Vapor Blue" },
      { value: "#10b981", img: "/images/sneaker-3.png", name: "Volt Green" },
      { value: "#eab308", img: "/images/sneaker-5.png", name: "Volt Yellow" }
    ],
    sizes: {
      EU: ["40", "41", "42", "43"],
      US: ["7.5", "8", "8.5", "9"]
    }
  },
  {
    id: 5,
    name: "Stealth Fly",
    subtitle: "Future Carbon Grey",
    price: "$260",
    accent: "#06b6d4", // cyan/teal
    image: "/images/sneaker-6.png",
    colors: [
      { value: "#06b6d4", img: "/images/sneaker-6.png", name: "Carbon Grey" },
      { value: "#ef4444", img: "/images/sneaker-1.png", name: "Heritage Red" },
      { value: "#10b981", img: "/images/sneaker-3.png", name: "Volt Green" },
      { value: "#ec4899", img: "/images/sneaker-5.png", name: "Volt Pink" }
    ],
    sizes: {
      EU: ["41", "42", "43", "44"],
      US: ["8", "8.5", "9", "10"]
    }
  }
];
