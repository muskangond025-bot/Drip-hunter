"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ShoppingBag, 
  Heart, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  Sparkles,
  ArrowUpDown,
  Check,
  ChevronDown
} from "lucide-react";

interface CartItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

interface ProductItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  rating: number;
  discount?: string;
  color: string;
  gender: 'Boy' | 'Girls' | 'Men' | 'Women';
  subcategory: 'T-shirts' | 'Sweatshirts' | 'Joggers';
  isSuggested?: boolean;
}

const products: ProductItem[] = [
  {
    id: 201,
    brand: "ALMOST GODS",
    name: "Vintage Flame Oversized Tee",
    price: "$45",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    discount: "10% OFF",
    color: "Red",
    gender: "Men",
    subcategory: "T-shirts"
  },
  {
    id: 202,
    brand: "A BATHING APE",
    name: "Retro Graphic Boxy Tee",
    price: "$49",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    discount: "20% OFF",
    color: "Red",
    gender: "Boy",
    subcategory: "T-shirts"
  },
  {
    id: 203,
    brand: "ACRONYM",
    name: "Heavyweight Kanji Red Tee",
    price: "$42",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    discount: "10% OFF",
    color: "Red",
    gender: "Men",
    subcategory: "T-shirts"
  },
  {
    id: 204,
    brand: "A-COLD-WALL*",
    name: "Cyber Tokyo Vintage Tee",
    price: "$52",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    discount: "30% OFF",
    color: "Red",
    gender: "Girls",
    subcategory: "T-shirts"
  },
  {
    id: 205,
    brand: "BLUE BREW",
    name: "Distressed Raw Hem Tee",
    price: "$39",
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    discount: "10% OFF",
    color: "Red",
    gender: "Boy",
    subcategory: "T-shirts"
  },
  {
    id: 206,
    brand: "BALENCIAGA",
    name: "Heavyweight Box Logo Hood",
    price: "$85",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    discount: "20% OFF",
    color: "Blue",
    gender: "Women",
    subcategory: "Sweatshirts"
  },
  {
    id: 207,
    brand: "BRAIN DEAD",
    name: "Tech Utility Street Cargos",
    price: "$95",
    image: "https://images.unsplash.com/photo-1550928431-ee0ec6db1ad7?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    discount: "10% OFF",
    color: "Green",
    gender: "Boy",
    subcategory: "Joggers"
  },
  {
    id: 208,
    brand: "CARHARTT WIP",
    name: "Classic Acid Wash Tee",
    price: "$48",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    discount: "30% OFF",
    color: "Red",
    gender: "Men",
    subcategory: "T-shirts"
  },
  // Suggested models (Black streetwear T-shirts)
  {
    id: 209,
    brand: "CORTEIZ",
    name: "Shadow Arch Heavyweight Tee",
    price: "$55",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    color: "Black",
    gender: "Men",
    subcategory: "T-shirts",
    isSuggested: true
  },
  {
    id: 210,
    brand: "OFF-WHITE",
    name: "Midnight Skull Graphic Tee",
    price: "$49",
    image: "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    color: "Black",
    gender: "Boy",
    subcategory: "T-shirts",
    isSuggested: true
  },
  {
    id: 211,
    brand: "SUPREME",
    name: "Dark Matter Acid Wash Tee",
    price: "$52",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    color: "Black",
    gender: "Women",
    subcategory: "T-shirts",
    isSuggested: true
  },
  {
    id: 212,
    brand: "BILLIONAIRE BOYS CLUB",
    name: "Rebel Phantom Print Tee",
    price: "$48",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    color: "Black",
    gender: "Girls",
    subcategory: "T-shirts",
    isSuggested: true
  }
];

export default function ShopCatalog() {
  // Global cart/wishlist sync state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [loginOpen, setLoginOpen] = useState(false);

  // Sorting state
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

  // Interactive sidebar filters state
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const brandParam = params.get("brand");
      if (brandParam) {
        const matchedBrand = Array.from(new Set(products.map(p => p.brand)))
          .find(b => b.toLowerCase() === brandParam.toLowerCase());
        if (matchedBrand) {
          return [matchedBrand];
        }
      }
    }
    return [];
  });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Section toggle states (false = collapsed, true = expanded by default)
  const [genderOpen, setGenderOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const brandParam = params.get("brand");
      if (brandParam) {
        const matchedBrand = Array.from(new Set(products.map(p => p.brand)))
          .find(b => b.toLowerCase() === brandParam.toLowerCase());
        if (matchedBrand) {
          return true;
        }
      }
    }
    return false;
  });
  const [ratingOpen, setRatingOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  // Active Lookbook outfit carousel state
  const [lookbookIndex, setLookbookIndex] = useState(0);

  // Recently viewed section mock
  const recentlyViewedItems = [
    {
      id: 251,
      brand: "DripHunter Elite",
      name: "Minimalist Box Logo Tee",
      price: "$39",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 252,
      brand: "DripHunter Elite",
      name: "Off-White Utility Anorak",
      price: "$110",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 253,
      brand: "DripHunter Elite",
      name: "Japanese Kanagawa Hoodie",
      price: "$75",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 254,
      brand: "DripHunter Elite",
      name: "Vintage Acid Wash Pullover",
      price: "$80",
      image: "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Explore style lookbook slides
  const lookbookOutfits = [
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      styleName: "Cargo Heavyweight Summer",
      desc: "Distressed raw t-shirt styled with sand tactical utility cargo pants."
    },
    {
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
      styleName: "Acid Punk Techwear Fit",
      desc: "Retro graphic boxy tee styled with reflective technical zipper accessories."
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
      styleName: "Downtown Cyberpunk Streetwear",
      desc: "Signature red Kanji tee paired with dark multi-pocket tech wear jogger cargos."
    }
  ];

  // Handle toggling of individual items in array filters
  const toggleFilter = <T,>(value: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // State-driven filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // 2. Gender Filters
      if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) {
        return false;
      }
      // 3. Subcategories Filters
      if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) {
        return false;
      }
      // 4. Brand Filters
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // 5. Ratings Filters
      if (selectedRatings.length > 0 && !selectedRatings.includes(product.rating)) {
        return false;
      }
      // 6. Colors Filters
      if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
        return false;
      }
      // 7. Discount Filters
      if (selectedDiscounts.length > 0) {
        if (!product.discount) return false;
        const matches = selectedDiscounts.some(d => product.discount?.includes(d));
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedGenders, selectedSubcategories, selectedBrands, selectedRatings, selectedColors, selectedDiscounts]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortBy === 'price-low') {
      return arr.sort((a, b) => {
        const valA = parseFloat(a.price.replace('$', '')) || 0;
        const valB = parseFloat(b.price.replace('$', '')) || 0;
        return valA - valB;
      });
    }
    if (sortBy === 'price-high') {
      return arr.sort((a, b) => {
        const valA = parseFloat(a.price.replace('$', '')) || 0;
        const valB = parseFloat(b.price.replace('$', '')) || 0;
        return valB - valA;
      });
    }
    if (sortBy === 'rating') {
      return arr.sort((a, b) => b.rating - a.rating);
    }
    return arr; // Recommended / default
  }, [filteredProducts, sortBy]);

  // Main catalog products vs suggestions
  const catalogList = useMemo(() => {
    return sortedProducts.filter(p => !p.isSuggested);
  }, [sortedProducts]);

  const suggestedList = useMemo(() => {
    return sortedProducts.filter(p => p.isSuggested);
  }, [sortedProducts]);

  // Cart operations
  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleToggleFavorite = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setWishlist((prevWishlist) => {
      const isFav = prevWishlist.some((item) => item.id === product.id);
      if (isFav) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, { id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image }];
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Navbar */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onAddToCart={handleAddToCart}
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
      />

      <main className="flex-grow">
        
        {/* Banner Section */}
        <section className="relative w-full overflow-hidden bg-zinc-950 py-20 px-6 sm:px-12 text-center flex flex-col items-center justify-center border-b border-zinc-900">
          <div className="absolute inset-0 bg-cover bg-center opacity-25 filter grayscale contrast-125" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-mono text-[10px] uppercase font-bold tracking-widest rounded-full">
              <Sparkles className="w-3 h-3" /> STREET ARCHIVE T-SHIRTS
            </span>
            <h1 className="text-4xl sm:text-6xl font-chaney-title text-white uppercase leading-none tracking-tight">
              T-SHIRTS
            </h1>
            <p className="text-zinc-400 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Streetwear heavyweight tees designed for boxy fits, drop shoulders, and vintage washes. Filter the collection below.
            </p>
          </div>
        </section>

        {/* Filter Details & Sorting Bar */}
        <section className="bg-zinc-50 border-b border-zinc-200 py-4 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Filter tags summary */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 uppercase flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
              </span>
              {selectedGenders.map(g => (
                <button key={g} onClick={() => toggleFilter(g, selectedGenders, setSelectedGenders)} className="px-2.5 py-1 bg-zinc-200 border border-zinc-300 text-zinc-800 text-[10px] font-mono rounded-md hover:bg-red-100 hover:text-red-600 transition-colors uppercase">
                  {g} ✕
                </button>
              ))}
              {selectedSubcategories.map(s => (
                <button key={s} onClick={() => toggleFilter(s, selectedSubcategories, setSelectedSubcategories)} className="px-2.5 py-1 bg-zinc-200 border border-zinc-300 text-zinc-800 text-[10px] font-mono rounded-md hover:bg-red-100 hover:text-red-600 transition-colors uppercase">
                  {s} ✕
                </button>
              ))}
              {selectedColors.map(c => (
                <button key={c} onClick={() => toggleFilter(c, selectedColors, setSelectedColors)} className="px-2.5 py-1 bg-zinc-200 border border-zinc-300 text-zinc-800 text-[10px] font-mono rounded-md hover:bg-red-100 hover:text-red-600 transition-colors uppercase">
                  {c} ✕
                </button>
              ))}
              {selectedGenders.length === 0 && selectedSubcategories.length === 0 && selectedColors.length === 0 && (
                <span className="text-xs text-zinc-400 font-mono italic">No filters active (Showing all)</span>
              )}
            </div>

            {/* Sorting controls */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> SORT BY:
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'recommended' | 'price-low' | 'price-high' | 'rating')}
                className="bg-white border border-zinc-300 text-zinc-800 text-xs font-mono py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>
        </section>

        {/* Main Grid Catalog with Sidebar */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* 1. Main Content Grid (Left) */}
            <div className="flex-1 space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {catalogList.map((product) => {
                  const isFav = wishlist.some(item => item.id === product.id);
                  return (
                    <div 
                      key={product.id}
                      className="bg-white border border-zinc-200 rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Discount / Promo Tag */}
                        {product.discount && (
                          <span className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-md">
                            {product.discount}
                          </span>
                        )}

                        {/* Favorite & Quick Add overlay buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <button 
                            onClick={() => handleToggleFavorite(product)}
                            className="w-9 h-9 bg-white hover:bg-zinc-100 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
                          >
                            <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500 animate-ping" : "text-zinc-600"}`} />
                          </button>
                        </div>

                        {/* Add to Bag hover button */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full py-3 bg-black hover:bg-zinc-900 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-2xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                          >
                            <ShoppingBag className="w-4 h-4" /> Add to Bag
                          </button>
                        </div>
                      </div>

                      {/* Product copy details */}
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">{product.brand}</span>
                        <h4 className="font-bold text-zinc-800 text-sm tracking-tight line-clamp-1">{product.name}</h4>
                        
                        {/* Rating stars */}
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200"}`} 
                            />
                          ))}
                          <span className="text-[10px] font-mono text-zinc-400 ml-1">({product.rating}.0)</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <strong className="text-zinc-950 font-mono text-base font-extrabold">{product.price}</strong>
                          <span className="text-[9px] font-mono px-2 py-0.5 border border-zinc-200 rounded text-zinc-500 uppercase">{product.gender}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* No items found display */}
              {catalogList.length === 0 && (
                <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-200 border-dashed">
                  <SlidersHorizontal className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                  <h3 className="font-bold text-zinc-800 text-lg uppercase tracking-tight">No Products Found</h3>
                  <p className="text-zinc-500 text-xs font-mono mt-1">Try resetting or relaxing your sidebar filters.</p>
                  <button 
                    onClick={() => {
                      setSelectedGenders([]);
                      setSelectedSubcategories([]);
                      setSelectedColors([]);
                      setSelectedBrands([]);
                      setSelectedDiscounts([]);
                      setSelectedRatings([]);
                    }}
                    className="mt-5 px-5 py-2.5 bg-black text-white font-mono text-xs font-bold uppercase rounded-xl hover:bg-zinc-800 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination controls */}
              <div className="flex justify-center items-center gap-3 pt-6 font-mono text-xs">
                <button className="w-9 h-9 border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-400 cursor-not-allowed" disabled>
                  &lt;
                </button>
                <button className="w-9 h-9 bg-black text-white border border-black rounded-xl flex items-center justify-center font-bold">
                  1
                </button>
                <button className="w-9 h-9 border border-zinc-200 rounded-xl hover:bg-zinc-50 flex items-center justify-center text-zinc-600">
                  2
                </button>
                <button className="w-9 h-9 border border-zinc-200 rounded-xl hover:bg-zinc-50 flex items-center justify-center text-zinc-600">
                  &gt;
                </button>
              </div>

            </div>

            {/* 2. Sidebar Filters Panel (Right) */}
            <aside className="w-full lg:w-72 space-y-8 bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 self-start">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <h3 className="font-chaney-title text-sm tracking-tight text-zinc-900 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> FILTERS
                </h3>
                <button 
                  onClick={() => {
                    setSelectedGenders([]);
                    setSelectedSubcategories([]);
                    setSelectedBrands([]);
                    setSelectedRatings([]);
                    setSelectedColors([]);
                    setSelectedDiscounts([]);
                  }}
                  className="text-[10px] font-mono text-zinc-500 hover:text-red-500 uppercase transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Gender filter */}
              <div className="space-y-3">
                <button 
                  onClick={() => setGenderOpen(!genderOpen)}
                  className="w-full flex items-center justify-between font-bold text-zinc-900 text-xs uppercase tracking-wider font-mono cursor-pointer hover:text-zinc-600 transition-colors"
                >
                  <span>Gender</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${genderOpen ? "rotate-180" : ""}`} />
                </button>
                {genderOpen && (
                  <div className="space-y-2 font-mono text-xs text-zinc-600 pt-1">
                    {['Boy', 'Girls', 'Men', 'Women'].map((g) => (
                      <label key={g} className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-900">
                        <input 
                          type="checkbox"
                          checked={selectedGenders.includes(g)}
                          onChange={() => toggleFilter(g, selectedGenders, setSelectedGenders)}
                          className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-black cursor-pointer"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Subcategories filter */}
              <div className="space-y-3 border-t border-zinc-200 pt-6">
                <button 
                  onClick={() => setSubOpen(!subOpen)}
                  className="w-full flex items-center justify-between font-bold text-zinc-900 text-xs uppercase tracking-wider font-mono cursor-pointer hover:text-zinc-600 transition-colors"
                >
                  <span>Subcategory</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${subOpen ? "rotate-180" : ""}`} />
                </button>
                {subOpen && (
                  <div className="space-y-2 font-mono text-xs text-zinc-600 pt-1">
                    {['T-shirts', 'Sweatshirts', 'Joggers'].map((s) => (
                      <label key={s} className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-900">
                        <input 
                          type="checkbox"
                          checked={selectedSubcategories.includes(s)}
                          onChange={() => toggleFilter(s, selectedSubcategories, setSelectedSubcategories)}
                          className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-black cursor-pointer"
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands filter */}
              <div className="space-y-3 border-t border-zinc-200 pt-6">
                <button 
                  onClick={() => setBrandsOpen(!brandsOpen)}
                  className="w-full flex items-center justify-between font-bold text-zinc-900 text-xs uppercase tracking-wider font-mono cursor-pointer hover:text-zinc-600 transition-colors"
                >
                  <span>Brands</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${brandsOpen ? "rotate-180" : ""}`} />
                </button>
                {brandsOpen && (
                  <div className="space-y-2 font-mono text-xs text-zinc-600 pt-1">
                    {Array.from(new Set(products.map(p => p.brand))).sort().map((b) => (
                      <label key={b} className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-900">
                        <input 
                          type="checkbox"
                          checked={selectedBrands.includes(b)}
                          onChange={() => toggleFilter(b, selectedBrands, setSelectedBrands)}
                          className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-black cursor-pointer"
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Ratings filter */}
              <div className="space-y-3 border-t border-zinc-200 pt-6">
                <button 
                  onClick={() => setRatingOpen(!ratingOpen)}
                  className="w-full flex items-center justify-between font-bold text-zinc-900 text-xs uppercase tracking-wider font-mono cursor-pointer hover:text-zinc-600 transition-colors"
                >
                  <span>Customer Rating</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${ratingOpen ? "rotate-180" : ""}`} />
                </button>
                {ratingOpen && (
                  <div className="space-y-2 font-mono text-xs text-zinc-600 pt-1">
                    {[5, 4].map((r) => (
                      <label key={r} className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-900">
                        <input 
                          type="checkbox"
                          checked={selectedRatings.includes(r)}
                          onChange={() => toggleFilter(r, selectedRatings, setSelectedRatings)}
                          className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-black cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < r ? "fill-yellow-400 text-yellow-400" : "text-zinc-200"}`} />
                          ))}
                          <span className="text-[10px] text-zinc-400">({r}.0 & above)</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Discount filter */}
              <div className="space-y-3 border-t border-zinc-200 pt-6">
                <button 
                  onClick={() => setDiscountOpen(!discountOpen)}
                  className="w-full flex items-center justify-between font-bold text-zinc-900 text-xs uppercase tracking-wider font-mono cursor-pointer hover:text-zinc-600 transition-colors"
                >
                  <span>Discount Range</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${discountOpen ? "rotate-180" : ""}`} />
                </button>
                {discountOpen && (
                  <div className="space-y-2 font-mono text-xs text-zinc-600 pt-1">
                    {['10% OFF', '20% OFF', '30% OFF'].map((d) => (
                      <label key={d} className="flex items-center gap-2.5 cursor-pointer hover:text-zinc-900">
                        <input 
                          type="checkbox"
                          checked={selectedDiscounts.includes(d)}
                          onChange={() => toggleFilter(d, selectedDiscounts, setSelectedDiscounts)}
                          className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 accent-black cursor-pointer"
                        />
                        <span>{d}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color filter */}
              <div className="space-y-3 border-t border-zinc-200 pt-6">
                <button 
                  onClick={() => setColorOpen(!colorOpen)}
                  className="w-full flex items-center justify-between font-bold text-zinc-900 text-xs uppercase tracking-wider font-mono cursor-pointer hover:text-zinc-600 transition-colors"
                >
                  <span>Colors</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${colorOpen ? "rotate-180" : ""}`} />
                </button>
                {colorOpen && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { name: "Red", bg: "bg-red-600" },
                      { name: "Blue", bg: "bg-blue-600" },
                      { name: "Green", bg: "bg-emerald-600" },
                      { name: "Black", bg: "bg-black" }
                    ].map((color) => {
                      const active = selectedColors.includes(color.name);
                      return (
                        <button 
                          key={color.name}
                          onClick={() => toggleFilter(color.name, selectedColors, setSelectedColors)}
                          className={`w-7 h-7 rounded-full ${color.bg} border-2 ${active ? "border-yellow-400 ring-2 ring-yellow-400/30 scale-110" : "border-zinc-300"} flex items-center justify-center cursor-pointer transition-all`}
                          title={color.name}
                        >
                          {active && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </aside>

          </div>
        </section>

        {/* Suggested Section: Driphunter User Suggestions */}
        <section className="py-20 bg-zinc-950 border-y border-zinc-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] font-mono text-yellow-400 uppercase font-black tracking-widest">Selected For You</span>
              <h2 className="text-3xl font-chaney-title text-white uppercase leading-none tracking-tight">
                DRIPHUNTER USER SUGGESTION
              </h2>
              <p className="text-zinc-500 font-mono text-xs leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {suggestedList.map((product) => {
                const isFav = wishlist.some(item => item.id === product.id);
                return (
                  <div 
                    key={product.id}
                    className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                      
                      {/* Interaction overlays */}
                      <button 
                        onClick={() => handleToggleFavorite(product)}
                        className="absolute top-4 right-4 w-9 h-9 bg-zinc-950/80 hover:bg-zinc-900 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer border border-zinc-800"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500 animate-pulse" : "text-zinc-400"}`} />
                      </button>

                      <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-3 bg-white text-zinc-950 font-mono text-xs font-black tracking-widest uppercase rounded-2xl flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-100 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" /> Add to Bag
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{product.brand}</span>
                      <h4 className="font-bold text-white text-sm tracking-tight line-clamp-1">{product.name}</h4>
                      
                      <div className="flex items-center justify-between pt-1">
                        <strong className="text-yellow-400 font-mono text-base font-extrabold">{product.price}</strong>
                        <span className="text-[9px] font-mono px-2 py-0.5 border border-zinc-800 rounded text-zinc-400 uppercase">{product.color}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {suggestedList.length === 0 && (
                <div className="col-span-full text-center py-10 bg-zinc-900/10 border border-zinc-800 border-dashed rounded-3xl">
                  <p className="text-zinc-500 text-xs font-mono">No suggested black tees match current category selectors.</p>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Model Outfit Explore Slider Carousel */}
        <section className="py-20 bg-zinc-50 border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest block">Shop the Lookbook</span>
                <h2 className="text-3xl font-chaney-title text-zinc-950 uppercase tracking-tight">
                  EXPLORE OUTFITS
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                {lookbookOutfits.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setLookbookIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${idx === lookbookIndex ? "bg-black w-6" : "bg-zinc-300 hover:bg-zinc-400"}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo Showcase Area */}
              <div className="lg:col-span-7 relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-200/80 shadow-lg bg-zinc-100">
                <Image 
                  src={lookbookOutfits[lookbookIndex].image}
                  alt="Style lookbook fit"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Outfit details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white font-mono text-[9px] uppercase tracking-widest rounded-md">
                  Active Vibe
                </div>
                <h3 className="text-2xl font-chaney-title text-zinc-950 leading-none">
                  {lookbookOutfits[lookbookIndex].styleName}
                </h3>
                <p className="text-zinc-500 font-mono text-xs leading-relaxed">
                  {lookbookOutfits[lookbookIndex].desc}
                </p>

                {/* Grid items list */}
                <div className="border-t border-zinc-200 pt-6 space-y-4">
                  <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider font-mono">Items In Outfit:</h4>
                  
                  <div className="flex items-center gap-4 bg-white border border-zinc-200 rounded-2xl p-4">
                    <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-zinc-100">
                      <Image 
                        src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80" 
                        alt="Product" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[8px] font-mono text-zinc-400 uppercase">Driphunter Custom</span>
                      <h5 className="font-bold text-zinc-800 text-xs">Essential Vintage Tee</h5>
                      <span className="font-mono text-xs text-zinc-950">$49</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart({ id: 299, brand: "DripHunter", name: "Essential Vintage Tee", price: "$49", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80" })}
                      className="px-4 py-2 bg-black hover:bg-zinc-800 text-white font-mono text-[10px] uppercase font-bold rounded-xl cursor-pointer"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Recently Viewed Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-chaney-title text-zinc-950 uppercase tracking-tight">
              Recently Viewed
            </h3>
            <div className="w-12 h-1 bg-black mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyViewedItems.map((product) => {
              const isFav = wishlist.some(item => item.id === product.id);
              return (
                <div 
                  key={product.id}
                  className="bg-white border border-zinc-200 rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <button 
                      onClick={() => handleToggleFavorite(product)}
                      className="absolute top-4 right-4 w-9 h-9 bg-white hover:bg-zinc-50 rounded-full flex items-center justify-center shadow-md transition-colors border border-zinc-100 cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "text-zinc-600"}`} />
                    </button>

                    <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-2.5 bg-black hover:bg-zinc-900 text-white font-mono text-[10px] font-bold tracking-widest uppercase rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block">{product.brand}</span>
                    <h4 className="font-bold text-zinc-800 text-xs tracking-tight line-clamp-1">{product.name}</h4>
                    <strong className="text-zinc-950 font-mono text-sm block font-black">{product.price}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
