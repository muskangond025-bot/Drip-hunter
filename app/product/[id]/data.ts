export interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  color: string;
  gender: string;
  category: string;
  discount: number;
  sizes: string[];
  description: string;
  specifications: { label: string; value: string }[];
}

export const masterProducts: Product[] = [
  {
    id: 201,
    brand: "Puma",
    name: "Puma Scuderia Ferrari Heritage Zip Sweatshirt",
    price: "₹7,999",
    image: "/images/puma_t7_sweatshirt.png",
    rating: 4.8,
    color: "Cream",
    gender: "Men",
    category: "Sweatshirts",
    discount: 10,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Inspired by track heritage. This Puma Scuderia Ferrari zip-up combines retro styling with premium heavy-blend comfort, sponsor patches, and iconic Scuderia Ferrari red accents.",
    specifications: [
      { label: "Fabric", value: "Premium Cotton-Poly Blend" },
      { label: "Fit", value: "Relaxed Retro Fit" },
      { label: "Sleeve Length", value: "Long Sleeves with Ribbed Cuffs" },
      { label: "Collar", value: "High Neck Ribbed Collar" },
      { label: "Fastener", value: "Full Zipper Closure" },
      { label: "Brand Details", value: "Embroidered Scuderia Ferrari & Puma Logo Patches" }
    ]
  },
  {
    id: 202,
    brand: "Burberry London",
    name: "Red Crest Regular Fit Tee",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    color: "Red",
    gender: "Men",
    category: "Top Wear",
    discount: 15,
    sizes: ["M", "L", "XL"],
    description: "Premium regular fit tee featuring the Burberry London crest print. Perfect for casual layering or standalone statement wear.",
    specifications: [
      { label: "Fabric", value: "Organic Cotton" },
      { label: "Fit", value: "Regular Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Round Neck" },
      { label: "Pattern", value: "Brand Logo Crest" },
      { label: "Wash Care", value: "Dry Clean Recommended" }
    ]
  },
  {
    id: 203,
    brand: "Stüssy Beach",
    name: "Red Stock Logo Tee",
    price: "₹1,199",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    color: "Red",
    gender: "Boys",
    category: "Top Wear",
    discount: 30,
    sizes: ["S", "M", "XL"],
    description: "The classic Stussy stock logo printed on a durable heavyweight cotton tee. Vintage red garment dye offers a premium pre-washed feel.",
    specifications: [
      { label: "Fabric", value: "100% Ring-Spun Cotton" },
      { label: "Fit", value: "Relaxed Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Ribbed Crew Neck" },
      { label: "Pattern", value: "Printed Brand Script" },
      { label: "Wash Care", value: "Hand Wash Cold" }
    ]
  },
  {
    id: 204,
    brand: "Essentials Co.",
    name: "Red Core Crewneck Tee",
    price: "₹899",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80",
    rating: 4.2,
    color: "Red",
    gender: "Men",
    category: "Top Wear",
    discount: 10,
    sizes: ["L", "XL", "XXL"],
    description: "Minimalistic daily wear core tee from Essentials Co. Boxy aesthetic with signature rubberized print on the back collar.",
    specifications: [
      { label: "Fabric", value: "Heavyweight Cotton-Poly Blend" },
      { label: "Fit", value: "Boxy Oversized" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Solid" },
      { label: "Wash Care", value: "Wash Inside Out" }
    ]
  },
  {
    id: 205,
    brand: "Bape Streetwear",
    name: "Red Ape Head Graphic Tee",
    price: "₹1,999",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    color: "Red",
    gender: "Boys",
    category: "Top Wear",
    discount: 50,
    sizes: ["S", "L", "XXL"],
    description: "Featuring the iconic BAPE Ape Head printed in high density on a bright red premium cotton background. Streetwear collectible.",
    specifications: [
      { label: "Fabric", value: "Japanese Cotton Fleece" },
      { label: "Fit", value: "Regular Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Round Neck" },
      { label: "Pattern", value: "Ape Head Graphic" },
      { label: "Wash Care", value: "Machine Wash Gentle" }
    ]
  },
  {
    id: 206,
    brand: "Drip Hunter",
    name: "Red Signature Logo Tee",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    color: "Red",
    gender: "Men",
    category: "Top Wear",
    discount: 25,
    sizes: ["M", "L"],
    description: "Features a modern geometric signature Drip Hunter logo block. A heavyweight tee styled to maintain its shape over long street wears.",
    specifications: [
      { label: "Fabric", value: "100% Combed Cotton" },
      { label: "Fit", value: "Oversized Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Geometric Logo Print" },
      { label: "Wash Care", value: "Do Not Iron On Print" }
    ]
  },
  {
    id: 207,
    brand: "Burberry London",
    name: "Red Embroidered Icon Tee",
    price: "₹1,599",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    color: "Red",
    gender: "Women",
    category: "Top Wear",
    discount: 10,
    sizes: ["S", "XL"],
    description: "A premium embroidered variant of Burberry's classic red tee. Features elegant tonal stitching on the chest pocket.",
    specifications: [
      { label: "Fabric", value: "Premium Mercerized Cotton" },
      { label: "Fit", value: "Regular Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Embroidered Logo Script" },
      { label: "Wash Care", value: "Dry Clean Recommended" }
    ]
  },
  {
    id: 208,
    brand: "Stüssy Beach",
    name: "Red 8-Ball Street Tee",
    price: "₹1,249",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    color: "Red",
    gender: "Kids",
    category: "Top Wear",
    discount: 40,
    sizes: ["M", "L", "XL"],
    description: "Features the legendary Stussy 8-Ball graphic print centered on the back. Complete with a subtle pocket print on the front.",
    specifications: [
      { label: "Fabric", value: "100% Pre-shrunk Cotton" },
      { label: "Fit", value: "Relaxed Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "8-Ball Graphic" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 209,
    brand: "Essentials Co.",
    name: "Red Relaxed Boxy Fit Tee",
    price: "₹949",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    color: "Red",
    gender: "Girls",
    category: "Top Wear",
    discount: 10,
    sizes: ["L", "XXL"],
    description: "Relaxed drop-shoulder comfort for all-day streetwear vibes. Ribbed collar and premium double-needle hems.",
    specifications: [
      { label: "Fabric", value: "Cotton-Poly Heavy Fleece" },
      { label: "Fit", value: "Oversized Boxy" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Round Collar" },
      { label: "Pattern", value: "Solid" },
      { label: "Wash Care", value: "Tumble Dry Low" }
    ]
  },
  {
    id: 210,
    brand: "Bape Streetwear",
    name: "Red Camo College Tee",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    color: "Red",
    gender: "Boys",
    category: "Top Wear",
    discount: 15,
    sizes: ["S", "M", "L", "XL"],
    description: "Classic BAPE College print layered over their custom red camouflage pattern. A must-have archive streetwear graphic.",
    specifications: [
      { label: "Fabric", value: "100% Japanese Ring Cotton" },
      { label: "Fit", value: "Regular Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Ribbed Crew Neck" },
      { label: "Pattern", value: "Camouflage College Graphic" },
      { label: "Wash Care", value: "Machine Wash Delicate" }
    ]
  },
  {
    id: 211,
    brand: "Drip Hunter",
    name: "Blue Classic Oversized Tee",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    color: "Blue",
    gender: "Men",
    category: "Top Wear",
    discount: 20,
    sizes: ["S", "M", "L"],
    description: "Upgrade your streetwear catalog with this classic heavyweight blue oversized tee, custom crafted for ultimate drop-shoulder aesthetics.",
    specifications: [
      { label: "Fabric", value: "100% Combed Cotton" },
      { label: "Fit", value: "Oversized Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Solid" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 212,
    brand: "Stüssy Beach",
    name: "Blue Stock Logo Tee",
    price: "₹1,199",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    color: "Blue",
    gender: "Boys",
    category: "Top Wear",
    discount: 10,
    sizes: ["M", "XL"],
    description: "The classic Stussy stock logo printed on a durable heavyweight cotton tee. Vintage blue garment dye offers a premium pre-washed feel.",
    specifications: [
      { label: "Fabric", value: "100% Cotton" },
      { label: "Fit", value: "Relaxed Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Printed Brand Logo" },
      { label: "Wash Care", value: "Hand Wash Cold" }
    ]
  },
  {
    id: 213,
    brand: "Burberry London",
    name: "Green Regular Fit Tee",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    color: "Green",
    gender: "Men",
    category: "Top Wear",
    discount: 15,
    sizes: ["L", "XL"],
    description: "Premium regular fit tee in a rich forest green dye, styled with subtle Burberry chest script detailing.",
    specifications: [
      { label: "Fabric", value: "100% Organic Cotton" },
      { label: "Fit", value: "Regular Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Solid" },
      { label: "Wash Care", value: "Dry Clean Recommended" }
    ]
  },
  {
    id: 214,
    brand: "Bape Streetwear",
    name: "Green Camo College Tee",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    color: "Green",
    gender: "Boys",
    category: "Top Wear",
    discount: 20,
    sizes: ["S", "M"],
    description: "Premium forest green BAPE camo tee features the college script and ape head block layout.",
    specifications: [
      { label: "Fabric", value: "100% Ring Cotton" },
      { label: "Fit", value: "Relaxed Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Green Camo College Print" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 215,
    brand: "Drip Hunter",
    name: "Black Signature Logo Tee",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    color: "Black",
    gender: "Men",
    category: "Top Wear",
    discount: 30,
    sizes: ["M", "L", "XXL"],
    description: "Features a modern geometric signature Drip Hunter logo block in black and white contrast. Heavyweight premium cotton wear.",
    specifications: [
      { label: "Fabric", value: "100% Combed Cotton" },
      { label: "Fit", value: "Oversized Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Signature Monochromatic Logo" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 216,
    brand: "Essentials Co.",
    name: "Black Core Crewneck Tee",
    price: "₹899",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    color: "Black",
    gender: "Kids",
    category: "Top Wear",
    discount: 10,
    sizes: ["S", "XL"],
    description: "A minimal matte-black boxy crewneck tee featuring tonal Essentials collar script printing.",
    specifications: [
      { label: "Fabric", value: "Heavyweight Cotton Blend" },
      { label: "Fit", value: "Boxy Oversized" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Solid" },
      { label: "Wash Care", value: "Do Not Tumble Dry" }
    ]
  },
  {
    id: 217,
    brand: "Stüssy Beach",
    name: "White 8-Ball Street Tee",
    price: "₹1,249",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    color: "White",
    gender: "Kids",
    category: "Top Wear",
    discount: 25,
    sizes: ["S", "M", "L", "XL"],
    description: "Features the legendary Stussy 8-Ball graphic print centered on a clean white premium cotton background.",
    specifications: [
      { label: "Fabric", value: "100% Pre-shrunk Cotton" },
      { label: "Fit", value: "Relaxed Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "8-Ball Graphic Print" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 218,
    brand: "Burberry London",
    name: "White Crest Regular Tee",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    color: "White",
    gender: "Women",
    category: "Top Wear",
    discount: 15,
    sizes: ["M", "L"],
    description: "Premium regular fit white tee featuring the Burberry London crest print in stark red embroidery contrast.",
    specifications: [
      { label: "Fabric", value: "Organic Mercerized Cotton" },
      { label: "Fit", value: "Regular Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Embroidered Brand Crest" },
      { label: "Wash Care", value: "Dry Clean Recommended" }
    ]
  },
  {
    id: 231,
    brand: "Burberry London",
    name: "Red Utility Snapback Cap",
    price: "₹499",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    color: "Red",
    gender: "Men",
    category: "Caps",
    discount: 10,
    sizes: ["M", "L"],
    description: "Heavy-duty utility snapback cap constructed with custom metal buckles and high contrast Burberry red panels.",
    specifications: [
      { label: "Material", value: "Cotton Canvas" },
      { label: "Clasp", value: "Adjustable Snapback Buckle" },
      { label: "Visor", value: "Curved Visor" },
      { label: "Wash Care", value: "Wipe Clean Only" }
    ]
  },
  {
    id: 232,
    brand: "Stüssy Beach",
    name: "Red Knit Beanie Hat",
    price: "₹399",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    color: "Red",
    gender: "Kids",
    category: "Caps",
    discount: 20,
    sizes: ["S", "M"],
    description: "A thick knit acrylic beanie in bright red, detailed with the classic Stüssy woven label patch on the cuff.",
    specifications: [
      { label: "Material", value: "100% Soft Acrylic" },
      { label: "Fit", value: "Stretchable Knit Cuffed" },
      { label: "Wash Care", value: "Hand Wash Cold" }
    ]
  },
  {
    id: 241,
    brand: "Drip Hunter",
    name: "Red Tactical Cargo Pants",
    price: "₹1,899",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    color: "Red",
    gender: "Men",
    category: "Bottom Wear",
    discount: 30,
    sizes: ["M", "L", "XL"],
    description: "Constructed with multi-pocket detailing and straps, these tactical cargos offer the ultimate cyberpunk urban utility look.",
    specifications: [
      { label: "Material", value: "Cotton Ripstop Fabric" },
      { label: "Fit", value: "Relaxed Tapered Fit" },
      { label: "Pockets", value: "6 Tactical Utility Pockets" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 242,
    brand: "Essentials Co.",
    name: "Red Relaxed Sweatpants",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    color: "Red",
    gender: "Women",
    category: "Bottom Wear",
    discount: 20,
    sizes: ["S", "M", "L"],
    description: "Heavyweight relaxed-fit fleece sweatpants detailed with elastic ankle cuffs and extra long drawstring loops.",
    specifications: [
      { label: "Fabric", value: "Fleece Brushed Back Blend" },
      { label: "Fit", value: "Relaxed Jogger Fit" },
      { label: "Wash Care", value: "Wash Inside Out" }
    ]
  },
  {
    id: 101,
    brand: "SUPREME",
    name: "Vintage Flame Oversized Tee",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    color: "Black",
    gender: "Men",
    category: "Top Wear",
    discount: 25,
    sizes: ["S", "M", "L", "XL"],
    description: "Highly sought-after flame graphic tee from Supreme archives. Hand-dyed vintage black wash with high density screen print.",
    specifications: [
      { label: "Fabric", value: "100% Heavyweight Cotton" },
      { label: "Fit", value: "Oversized Fit" },
      { label: "Sleeve Length", value: "Short Sleeves" },
      { label: "Neck", value: "Crew Neck" },
      { label: "Pattern", value: "Acid Wash Graphic" },
      { label: "Wash Care", value: "Hand Wash Only" }
    ]
  },
  {
    id: 102,
    brand: "STÜSSY",
    name: "Retro Palms Resort Shirt",
    price: "₹1,899",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    color: "White",
    gender: "Men",
    category: "Top Wear",
    discount: 10,
    sizes: ["M", "L", "XL"],
    description: "A breezy resort collar short sleeve shirt featuring retro Hawaiian palm illustrations. Highly breathable canvas wear.",
    specifications: [
      { label: "Fabric", value: "100% Breathable Rayon" },
      { label: "Fit", value: "Relaxed Boxy Fit" },
      { label: "Collar", value: "Open Camp Collar" },
      { label: "Wash Care", value: "Machine Wash Delicate" }
    ]
  },
  {
    id: 103,
    brand: "AMIRI",
    name: "Distressed Bleach Denim Shirt",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    color: "Blue",
    gender: "Men",
    category: "Top Wear",
    discount: 30,
    sizes: ["S", "M", "L"],
    description: "Premium Japanese denim shirt custom bleached and distressed by hand. Metal snap snaps and dual chest pockets.",
    specifications: [
      { label: "Fabric", value: "100% Selvedge Denim" },
      { label: "Fit", value: "Slim Fit" },
      { label: "Wash Care", value: "Dry Clean Only" }
    ]
  },
  {
    id: 104,
    brand: "PALACE",
    name: "Heavyweight Kanji Red Tee",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    color: "Red",
    gender: "Men",
    category: "Top Wear",
    discount: 15,
    sizes: ["M", "L", "XL"],
    description: "Features high density embroidered Kanji script characters on the front chest and Palace script on the rear hem.",
    specifications: [
      { label: "Fabric", value: "100% Ring Cotton" },
      { label: "Fit", value: "Oversized Fit" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 105,
    brand: "OFF-WHITE",
    name: "Industrial Tape Utility Vest",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    color: "Yellow",
    gender: "Men",
    category: "Top Wear",
    discount: 40,
    sizes: ["M", "L"],
    description: "A signature Off-White utility vest constructed with heavy-duty webbing straps and industrial yellow logo tapes.",
    specifications: [
      { label: "Material", value: "Heavy Cordura Nylon" },
      { label: "Pockets", value: "Multi Zip Tactical Pockets" },
      { label: "Wash Care", value: "Hand Wash Cold" }
    ]
  },
  {
    id: 106,
    brand: "CARHARTT WIP",
    name: "Classic Canvas Chore Jacket",
    price: "₹4,299",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    color: "Brown",
    gender: "Men",
    category: "Top Wear",
    discount: 20,
    sizes: ["M", "L", "XL", "XXL"],
    description: "Triple-stitched Dearborn organic canvas chore jacket featuring a warm blanket lining and corduroy collar.",
    specifications: [
      { label: "Material", value: "Dearborn Organic Canvas" },
      { label: "Lining", value: "Striped Blanket Lining" },
      { label: "Wash Care", value: "Machine Wash Warm" }
    ]
  },
  {
    id: 107,
    brand: "BAPE",
    name: "Shark Full Zip Sweatshirt",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    color: "Red",
    gender: "Men",
    category: "Top Wear",
    discount: 10,
    sizes: ["S", "M", "L", "XL"],
    description: "The legendary BAPE Shark hoodie with a full zip construction extending through the hood. High quality felt patches.",
    specifications: [
      { label: "Fabric", value: "100% Loopback Cotton" },
      { label: "Fit", value: "Japanese Relaxed Fit" },
      { label: "Wash Care", value: "Machine Wash Cold" }
    ]
  },
  {
    id: 108,
    brand: "ALMOST GODS",
    name: "Slay the Streets Joggers",
    price: "₹2,299",
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    color: "Red",
    gender: "Men",
    category: "Bottom Wear",
    discount: 25,
    sizes: ["S", "M", "L", "XL"],
    description: "Features customized side-panel piping and heavyweight cotton construction. Perfect for lounging or styling on high street.",
    specifications: [
      { label: "Fabric", value: "Combed Cotton Fleece" },
      { label: "Fit", value: "Relaxed Jogger Fit" },
      { label: "Wash Care", value: "Wash Inside Out" }
    ]
  },
  {
    id: 851,
    brand: "URBAN MONKEY",
    name: "DENIM JACKET // 001",
    price: "RS.2,200.00",
    image: "/images/urban-essentials/denim_jacket.png",
    rating: 5.0,
    color: "Blue",
    gender: "Men",
    category: "Clothing",
    discount: 0,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Heavyweight denim utility jacket featuring raw copper hardware and custom patch details.",
    specifications: [
      { label: "relaxed fit", value: "true to size" },
      { label: "fabric", value: "100% Rigid Denim" },
      { label: "color", value: "Indigo Wash" },
      { label: "full sleeves", value: "button cuffs" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 852,
    brand: "URBAN MONKEY",
    name: "FANNY PACK // 001",
    price: "RS.1,900.00",
    image: "/images/urban-essentials/fanny_pack.png",
    rating: 4.9,
    color: "Black",
    gender: "Men",
    category: "Crossbody Bags",
    discount: 0,
    sizes: ["ONE SIZE"],
    description: "Compact tactical fanny pack with multi-zipper compartments and adjustable buckle waist strap.",
    specifications: [
      { label: "material", value: "1000D Cordura Nylon" },
      { label: "color", value: "Stealth Black" },
      { label: "hardware", value: "YKK Zippers & Fidlock Buckle" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 853,
    brand: "URBAN MONKEY",
    name: "FULL SLEEVE SHIRT // BLACK",
    price: "RS.1,400.00",
    image: "/images/urban-essentials/full_sleeve_shirt.png",
    rating: 5.0,
    color: "Black",
    gender: "Men",
    category: "Shirt",
    discount: 0,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Full sleeve black shirt engineered from PV Lycra with a relaxed fit, chest pocket, button-down collar, and signature urban monkey back print.",
    specifications: [
      { label: "relaxed fit", value: "true to size" },
      { label: "fabric", value: "PV Lycra" },
      { label: "color", value: "black" },
      { label: "full sleeves", value: "button-down collar" },
      { label: "chest pocket", value: "yes" },
      { label: "unisex", value: "made in India" },
      { label: "model info", value: "Pravin is wearing a size M and is 5'7\"" }
    ]
  },
  {
    id: 854,
    brand: "URBAN MONKEY",
    name: "RIPSTOP CARGO PANTS // BLACK",
    price: "RS.2,850.00",
    image: "/images/urban-essentials/cargo_pants.png",
    rating: 5.0,
    color: "Black",
    gender: "Men",
    category: "Clothing",
    discount: 0,
    sizes: ["XS/S(26-28)", "M/L(30-32)", "XL/2XL(34-36)"],
    description: "Durable ripstop tactical cargo pants with double knee reinforcement and 6 utility storage pockets.",
    specifications: [
      { label: "fit", value: "Relaxed Tapered" },
      { label: "fabric", value: "Ripstop Cotton-Poly" },
      { label: "color", value: "black" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 855,
    brand: "URBAN MONKEY",
    name: "BIFOLD WALLET // 001",
    price: "RS.1,300.00",
    image: "/images/urban-essentials/bifold_wallet.png",
    rating: 4.8,
    color: "Black",
    gender: "Men",
    category: "Wallets",
    discount: 0,
    sizes: ["ONE SIZE"],
    description: "Slimline tactical bifold wallet with RFID protection, bill divider, and quick access card slots.",
    specifications: [
      { label: "material", value: "Matte Vegan Leather" },
      { label: "color", value: "Black" },
      { label: "protection", value: "RFID Shielding" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 856,
    brand: "URBAN MONKEY",
    name: "COIN AND CARD HOLDER // 001",
    price: "RS.1,000.00",
    image: "/images/urban-essentials/coin_card_holder.png",
    rating: 4.9,
    color: "Black",
    gender: "Men",
    category: "Wallets",
    discount: 0,
    sizes: ["ONE SIZE"],
    description: "Compact zipper coin pouch with integrated key ring and exterior card organizer.",
    specifications: [
      { label: "material", value: "Water Resistant Polyester" },
      { label: "color", value: "Black" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 857,
    brand: "URBAN MONKEY",
    name: "SHORT SLEEVE SHIRT // BLACK",
    price: "RS.1,200.00",
    image: "/images/urban-essentials/short_sleeve_shirt.png",
    rating: 5.0,
    color: "Black",
    gender: "Men",
    category: "Clothing",
    discount: 0,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Boxy fit short sleeve resort shirt with cuban collar and subtle tonal embroidery.",
    specifications: [
      { label: "fit", value: "Boxy Fit" },
      { label: "fabric", value: "Viscose Rayon Blend" },
      { label: "color", value: "black" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 858,
    brand: "URBAN MONKEY",
    name: "SLING BAG // 001",
    price: "RS.1,900.00",
    image: "/images/urban-essentials/sling_bag.png",
    rating: 5.0,
    color: "Black",
    gender: "Men",
    category: "Crossbody Bags",
    discount: 0,
    sizes: ["ONE SIZE"],
    description: "Modular crossbody sling bag with removable shoulder strap and padded tech sleeve.",
    specifications: [
      { label: "material", value: "Ballistic Nylon" },
      { label: "color", value: "Black" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 861,
    brand: "SUPERVEK INDIA",
    name: "Oversized Streetwear Tee // Black",
    price: "RS.1,400.00",
    image: "/images/urban-essentials/oversized_tshirt_black.png",
    rating: 5.0,
    color: "Black",
    gender: "Men",
    category: "Tshirts",
    discount: 0,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Heavyweight drop-shoulder oversized cotton tee featuring a custom neon punk chest print. Breathable and designed for a perfect streetwear silhouette.",
    specifications: [
      { label: "relaxed fit", value: "true to size" },
      { label: "fabric", value: "100% Cotton" },
      { label: "color", value: "Stealth Black" },
      { label: "style", value: "Cyberpunk Graphic" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 862,
    brand: "SUPERVEK INDIA",
    name: "Oversized Streetwear Tee // Cream",
    price: "RS.1,400.00",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    color: "Cream",
    gender: "Men",
    category: "Tshirts",
    discount: 0,
    sizes: ["S", "M", "L", "XL"],
    description: "Drop-shoulder off-white cotton oversized graphic tee featuring aesthetic retro typography.",
    specifications: [
      { label: "fit", value: "Drop Shoulder Oversized" },
      { label: "fabric", value: "100% Heavy Cotton" },
      { label: "color", value: "Off-white Cream" },
      { label: "unisex", value: "made in India" }
    ]
  },
  {
    id: 863,
    brand: "URBAN MONKEY",
    name: "Vintage Wash Oversized Tee",
    price: "RS.1,600.00",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    color: "Blue",
    gender: "Men",
    category: "Tshirts",
    discount: 0,
    sizes: ["S", "M", "L", "XL"],
    description: "Vintage faded washed blue streetwear oversized graphic tee.",
    specifications: [
      { label: "fit", value: "Vintage Oversized" },
      { label: "fabric", value: "100% Combed Cotton" },
      { label: "color", value: "Washed Indigo" },
      { label: "unisex", value: "made in India" }
    ]
  }
];
