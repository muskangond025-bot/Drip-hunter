export interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  rating: number;
  color: string;
  gender: string;
  category: string;
  discount: number;
  sizes: string[];
  description: string;
  specifications: { label: string; value: string }[];
  colorVariants?: {
    color: string;
    image: string;
    colorHex: string;
  }[];
}

export const masterProducts: Product[] = [
{
    id: 201,
    brand: "Puma",
    name: "Puma Scuderia Ferrari Heritage Zip Sweatshirt",
    price: "₹7,999",
    image: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
    hoverImage: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
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
    ],
    colorVariants: [
      {
        color: "Cream",
        image: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
        colorHex: "#f5f5dc"
      },
      {
        color: "Black",
        image: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
        colorHex: "#18181b"
      },
      {
        color: "Red",
        image: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
        colorHex: "#dc2626"
      },
      {
        color: "Yellow",
        image: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
        colorHex: "#facc15"
      }
    ]
  },
{
    id: 202,
    brand: "Burberry London",
    name: "Red Crest Regular Fit Tee",
    price: "₹1,499",
    image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
    hoverImage: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
    hoverImage: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
    hoverImage: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
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
    image: "https://img105.savana.com/b1f965b1c47f4aeb9324aae4a983d71e.webp",
    hoverImage: "https://img105.savana.com/b624019e62da430f8e7c88b4f8c5aca2.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
    hoverImage: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
    hoverImage: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
    hoverImage: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
    hoverImage: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp",
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
    image: "https://img105.savana.com/01366425e7d24a60a4d5dd1b0592d4f4.webp",
    hoverImage: "https://img105.savana.com/b1f965b1c47f4aeb9324aae4a983d71e.webp",
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
    image: "https://img105.savana.com/98f5af05efc74e51805c7e729b1f7be3.webp",
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
    image: "https://img105.savana.com/98f5af05efc74e51805c7e729b1f7be3.webp",
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
    image: "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
    hoverImage: "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
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
    image: "https://img105.savana.com/17eb77b4c05b4168a6e9aba0fd3bd4ea.webp",
    hoverImage: "https://img105.savana.com/82f87913d0814f9083297cfb44303ef9.webp",
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
    image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
    hoverImage: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
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
    ],
    colorVariants: [
      {
        color: "Black",
        image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
        colorHex: "#18181b"
      },
      {
        color: "White",
        image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
        colorHex: "#f4f4f5"
      },
      {
        color: "Blue",
        image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
        colorHex: "#1d4ed8"
      },
      {
        color: "Red",
        image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
        colorHex: "#dc2626"
      }
    ]
  },
{
    id: 102,
    brand: "STÜSSY",
    name: "Retro Palms Resort Shirt",
    price: "₹1,899",
    image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
    hoverImage: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
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
    image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
    hoverImage: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
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
    image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
    hoverImage: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
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
    image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
    hoverImage: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
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
    image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
    hoverImage: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
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
    image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
    hoverImage: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
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
    image: "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
    hoverImage: "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
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
    image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    hoverImage: "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
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
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
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
    image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
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
    image: "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
    hoverImage: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
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
    image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp",
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
    image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp",
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
    image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    hoverImage: "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
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
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
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
    image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
    hoverImage: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
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
    image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
    hoverImage: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
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
    image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
    hoverImage: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
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
  },
{
    id: 901,
    brand: "NIKE SPORTSWEAR",
    name: "AIR MAX INTRLK LITE // HYPER VIBE",
    price: "₹8,999",
    image: "https://img105.savana.com/5610cf369ccf415a911f4db271e1da9d.webp",
    rating: 4.9,
    color: "Red",
    gender: "Men",
    category: "Footwear",
    discount: 10,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    description: "Futuristic redesign of the classic Air Max silhouette. Dynamic Max Air unit provides ultimate impact protection, paired with a sleek translucent woven upper.",
    specifications: [
      { label: "cushioning", value: "Max Air Sole" },
      { label: "material", value: "Translucent Mesh & Synthetic Overlays" },
      { label: "fit", value: "True to Size" },
      { label: "style", value: "Futuristic Streetwear" }
    ]
  },
{
    id: 902,
    brand: "PUMA STREET",
    name: "FUTURE RIDER // ELECTRIC CYAN",
    price: "₹6,499",
    image: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp",
    rating: 4.8,
    color: "Cyan",
    gender: "Women",
    category: "Footwear",
    discount: 0,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    description: "Retro running shoe updated with bold neon cyberpunk overlays. Features a shock-absorbing Puma Federbein outsole and lightweight rider foam midsole.",
    specifications: [
      { label: "outsole", value: "Puma Federbein Shock Absorbing" },
      { label: "midsole", value: "Rider Foam Cushioning" },
      { label: "colorway", value: "Cyan / Electric Pink" },
      { label: "style", value: "Retro Cyber Runner" }
    ]
  },
{
    id: 903,
    brand: "DRIP HUNTER SPECIAL",
    name: "DRIP MESH RUNNER // VOLT GOLD",
    price: "₹10,999",
    image: "https://img105.savana.com/5610cf369ccf415a911f4db271e1da9d.webp",
    rating: 5.0,
    color: "Yellow",
    gender: "Men",
    category: "Footwear",
    discount: 15,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    description: "Drip Hunter exclusive luxury runner. Designed for premium street aesthetics, featuring breathable high-density mesh and signature vulcanized shock protection.",
    specifications: [
      { label: "midsole", value: "Vulcanized EVA Tech" },
      { label: "upper", value: "High-density Engineered Mesh" },
      { label: "colorway", value: "Volt Gold / Stealth Black" },
      { label: "style", value: "Premium Luxury Streetwear" }
    ]
  },
{
    id: 801,
    brand: "Supervek",
    name: "Classic Slinger",
    price: "Rs. 1,499.00",
    image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    rating: 4.7,
    color: "Multi",
    gender: "Unisex",
    category: "Accessories",
    discount: 40,
    sizes: ["One Size"],
    description: "Premium Classic Slinger designed by Supervek. Blending tactical street aesthetics with everyday urban utility.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Reinforced Water-resistant Fabric"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 802,
    brand: "Supervek",
    name: "Carbon Black Slinger",
    price: "Rs. 1,999.00",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    rating: 4.7,
    color: "Multi",
    gender: "Unisex",
    category: "Accessories",
    discount: 20,
    sizes: ["One Size"],
    description: "Premium Carbon Black Slinger designed by Supervek. Blending tactical street aesthetics with everyday urban utility.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Reinforced Water-resistant Fabric"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 803,
    brand: "Supervek",
    name: "Super Shark Camo Wallet",
    price: "Rs. 1,599.00",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    rating: 4.7,
    color: "Multi",
    gender: "Unisex",
    category: "Accessories",
    discount: 0,
    sizes: ["One Size"],
    description: "Premium Super Shark Camo Wallet designed by Supervek. Blending tactical street aesthetics with everyday urban utility.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Reinforced Water-resistant Fabric"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 804,
    brand: "Supervek",
    name: "OG Thunder Oversized T-Shirt",
    price: "Rs. 1,199.00",
    image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    rating: 4.7,
    color: "Multi",
    gender: "Unisex",
    category: "Accessories",
    discount: 52,
    sizes: ["One Size"],
    description: "Premium OG Thunder Oversized T-Shirt designed by Supervek. Blending tactical street aesthetics with everyday urban utility.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Reinforced Water-resistant Fabric"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 805,
    brand: "Supervek",
    name: "Oni Oversized Graphic Tee",
    price: "Rs. 1,999.00",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    rating: 4.7,
    color: "Multi",
    gender: "Unisex",
    category: "Accessories",
    discount: 50,
    sizes: ["One Size"],
    description: "Premium Oni Oversized Graphic Tee designed by Supervek. Blending tactical street aesthetics with everyday urban utility.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Reinforced Water-resistant Fabric"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 811,
    brand: "Supervek",
    name: "Cyber Shield Sunglasses",
    price: "Rs. 1,299.00",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    rating: 4.8,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 0,
    sizes: ["One Size"],
    description: "Next-gen Cyber Shield Sunglasses from the latest Supervek collection. Engineered for durability and visual impact.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Tactical Grade Synthetic"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 812,
    brand: "Supervek",
    name: "Stealth Tactical Chest Rig",
    price: "Rs. 2,499.00",
    image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    rating: 4.8,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 0,
    sizes: ["One Size"],
    description: "Next-gen Stealth Tactical Chest Rig from the latest Supervek collection. Engineered for durability and visual impact.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Tactical Grade Synthetic"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 813,
    brand: "Supervek",
    name: "Utility Cargo Shorts",
    price: "Rs. 1,899.00",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    rating: 4.8,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 0,
    sizes: ["One Size"],
    description: "Next-gen Utility Cargo Shorts from the latest Supervek collection. Engineered for durability and visual impact.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Tactical Grade Synthetic"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 814,
    brand: "Supervek",
    name: "Heavyweight Graphic Tee",
    price: "Rs. 1,499.00",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    rating: 4.8,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 0,
    sizes: ["One Size"],
    description: "Next-gen Heavyweight Graphic Tee from the latest Supervek collection. Engineered for durability and visual impact.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Tactical Grade Synthetic"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 815,
    brand: "Supervek",
    name: "Retro Tech Beanie",
    price: "Rs. 899.00",
    image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    rating: 4.8,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 0,
    sizes: ["One Size"],
    description: "Next-gen Retro Tech Beanie from the latest Supervek collection. Engineered for durability and visual impact.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Tactical Grade Synthetic"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 821,
    brand: "Supervek",
    name: "Urban Utility Sling",
    price: "Rs. 1,249.00",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    rating: 4.5,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 50,
    sizes: ["One Size"],
    description: "Special discount release of Urban Utility Sling. Iconic streetwear design at an accessible price.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Durable Poly-blend"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 822,
    brand: "Supervek",
    name: "Reflective Street Vest",
    price: "Rs. 2,799.00",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    rating: 4.5,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 30,
    sizes: ["One Size"],
    description: "Special discount release of Reflective Street Vest. Iconic streetwear design at an accessible price.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Durable Poly-blend"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 823,
    brand: "Supervek",
    name: "Classic Skate Deck",
    price: "Rs. 2,999.00",
    image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    rating: 4.5,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 25,
    sizes: ["One Size"],
    description: "Special discount release of Classic Skate Deck. Iconic streetwear design at an accessible price.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Durable Poly-blend"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 824,
    brand: "Supervek",
    name: "Minimalist Card Wallet",
    price: "Rs. 599.00",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    rating: 4.5,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 40,
    sizes: ["One Size"],
    description: "Special discount release of Minimalist Card Wallet. Iconic streetwear design at an accessible price.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Durable Poly-blend"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 825,
    brand: "Supervek",
    name: "Corduroy Dad Hat",
    price: "Rs. 799.00",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    rating: 4.5,
    color: "Black",
    gender: "Unisex",
    category: "Accessories",
    discount: 60,
    sizes: ["One Size"],
    description: "Special discount release of Corduroy Dad Hat. Iconic streetwear design at an accessible price.",
    specifications: [
      {
            label: "brand",
            value: "Supervek"
      },
      {
            label: "material",
            value: "Durable Poly-blend"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 851,
    brand: "Urban Monkey",
    name: "DENIM JACKET // 001",
    price: "RS.2,200.00",
    image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    hoverImage: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "CLOTHING",
    discount: 0,
    sizes: ["S","M","L","XL","2XL"],
    description: "Premium streetwear capsule: DENIM JACKET // 001 by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 852,
    brand: "Urban Monkey",
    name: "FANNY PACK // 001",
    price: "RS.1,900.00",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "CROSSBODY BAGS",
    discount: 0,
    sizes: ["S","M","L","XL"],
    description: "Premium streetwear capsule: FANNY PACK // 001 by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 853,
    brand: "Urban Monkey",
    name: "FULL SLEEVE SHIRT // BLACK",
    price: "RS.1,400.00",
    image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    hoverImage: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "CLOTHING",
    discount: 0,
    sizes: ["S","M","L","XL","2XL"],
    description: "Premium streetwear capsule: FULL SLEEVE SHIRT // BLACK by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 854,
    brand: "Urban Monkey",
    name: "RIPSTOP CARGO PANTS // BLACK",
    price: "RS.2,850.00",
    image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    hoverImage: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "CLOTHING",
    discount: 0,
    sizes: ["XS/S(26-28)","M/L(30-32)","XL/2XL(34-36)"],
    description: "Premium streetwear capsule: RIPSTOP CARGO PANTS // BLACK by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 855,
    brand: "Urban Monkey",
    name: "BIFOLD WALLET // 001",
    price: "RS.1,300.00",
    image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "WALLETS",
    discount: 0,
    sizes: ["S","M","L","XL"],
    description: "Premium streetwear capsule: BIFOLD WALLET // 001 by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 856,
    brand: "Urban Monkey",
    name: "COIN AND CARD HOLDER // 001",
    price: "RS.1,000.00",
    image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "WALLETS",
    discount: 0,
    sizes: ["S","M","L","XL"],
    description: "Premium streetwear capsule: COIN AND CARD HOLDER // 001 by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 857,
    brand: "Urban Monkey",
    name: "SHORT SLEEVE SHIRT // BLACK",
    price: "RS.1,200.00",
    image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    hoverImage: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "CLOTHING",
    discount: 0,
    sizes: ["S","M","L","XL","2XL"],
    description: "Premium streetwear capsule: SHORT SLEEVE SHIRT // BLACK by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  },
{
    id: 858,
    brand: "Urban Monkey",
    name: "SLING BAG // 001",
    price: "RS.1,900.00",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    rating: 4.9,
    color: "Black",
    gender: "Unisex",
    category: "CROSSBODY BAGS",
    discount: 0,
    sizes: ["S","M","L","XL"],
    description: "Premium streetwear capsule: SLING BAG // 001 by Urban Monkey. Heavily detailed stitching, boxy comfort fit.",
    specifications: [
      {
            label: "brand",
            value: "Urban Monkey"
      },
      {
            label: "fabric",
            value: "100% Combed Heavy Cotton"
      },
      {
            label: "origin",
            value: "Made in India"
      }
]
  }
];
