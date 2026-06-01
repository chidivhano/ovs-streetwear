/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  ShieldCheck,
  ChevronRight,
  Truck,
  RotateCcw,
  Check,
  Star,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data and Models
import { PRODUCTS, REVIEWS } from './data';
import { Product, CartItem } from './types';

// Component Splits
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import ContactForm from './components/ContactForm';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // home, shop, about, contact, product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Active product main view image selector
  const [activeProductImage, setActiveProductImage] = useState('');

  // Synchronize first image when selected product transitions
  useEffect(() => {
    if (selectedProduct) {
      setActiveProductImage(selectedProduct.bgImage);
    }
  }, [selectedProduct]);

  // Load and persist cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ovs-streetwear-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.warn('Failed to parse saved cart details:', err);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('ovs-streetwear-cart', JSON.stringify(updatedCart));
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string) => {
    const itemId = `${product.id}-${size}`;
    const duplicateIdx = cart.findIndex((i) => i.id === itemId);

    if (duplicateIdx > -1) {
      const updated = [...cart];
      updated[duplicateIdx].quantity += 1;
      saveCartToStorage(updated);
    } else {
      const newItem: CartItem = {
        id: itemId,
        product,
        size,
        quantity: 1
      };
      saveCartToStorage([...cart, newItem]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = cart.map((item) => (item.id === id ? { ...item, quantity } : item));
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (id: string) => {
    const filtered = cart.filter((item) => item.id !== id);
    saveCartToStorage(filtered);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Navigation callbacks
  const handleShopRedirect = (categoryFilter?: string) => {
    setCurrentTab('shop');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (categoryFilter) {
      // Toggle custom event or handle active filter
      setTimeout(() => {
        const filterBtn = document.getElementById(`filter-btn-${categoryFilter}`);
        if (filterBtn) filterBtn.click();
      }, 100);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 4000);
  };

  // Filter shop categorizations
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const filteredProducts = activeCategory === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const featuredSelections = PRODUCTS.filter((p) => p.rating >= 4.8);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col font-sans relative selection:bg-white selection:text-black">
      
      {/* Sticky header controls */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedProduct(null);
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="flex-1 pt-24 md:pt-28">
        <AnimatePresence mode="wait">
          
          {/* HOMEPAGE VIEW */}
          {currentTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-0 text-left"
            >
              {/* Immersive Hero Header */}
              <Hero onShopClick={() => handleShopRedirect()} />

              {/* Featured Collections split banner - highly visual bento layout */}
              <section className="py-24 px-6 md:px-12 bg-black border-b border-white/10">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="space-y-3">
                      <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-500 uppercase">
                        // CURATED CATEGORIES
                      </span>
                      <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-none">
                        FEATURED CAPSULES
                      </h2>
                    </div>
                    <button
                      onClick={() => handleShopRedirect()}
                      className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-[0.2em] text-neutral-300 hover:text-white transition-all uppercase"
                    >
                      VIEW ARCHIVE RETAILS
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Collection Card 1 */}
                    <div
                      onClick={() => handleShopRedirect('Caps')}
                      className="aspect-square bg-[#0a0a0a] border border-white/10 relative group overflow-hidden cursor-pointer"
                    >
                      <img
                        src="https://i.postimg.cc/kXVLbRDS/OVS-Orbit-Camper-Cap-Black.jpg"
                        alt="Summer Camper Caps Series"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                      <div className="absolute bottom-6 left-6 z-20 space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">ESSENTIALS // CAPS</span>
                        <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">THE ORBIT CAMPER</h3>
                        <p className="text-[11px] font-mono text-neutral-400 gap-1 inline-flex items-center">
                          EXPLORE MODEL RANGE <ArrowRight className="w-3.5 h-3.5" />
                        </p>
                      </div>
                    </div>

                    {/* Collection Card 2 */}
                    <div
                      onClick={() => handleShopRedirect('T-Shirts')}
                      className="aspect-square bg-[#0a0a0a] border border-white/10 relative group overflow-hidden cursor-pointer"
                    >
                      <img
                        src="https://i.postimg.cc/BQ8RKPt8/OVS-Echo-Tee-Black.jpg"
                        alt="Everyday Tees Capsule"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                      <div className="absolute bottom-6 left-6 z-20 space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">ESSENTIALS // GRAPHICS</span>
                        <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">OVS ECHO TEES</h3>
                        <p className="text-[11px] font-mono text-neutral-400 gap-1 inline-flex items-center">
                          EXPLORE SELECTION <ArrowRight className="w-3.5 h-3.5" />
                        </p>
                      </div>
                    </div>

                    {/* Collection Card 3 */}
                    <div
                      onClick={() => handleShopRedirect('Beanies')}
                      className="aspect-square bg-[#0a0a0a] border border-white/10 relative group overflow-hidden cursor-pointer"
                    >
                      <img
                        src="https://i.postimg.cc/PfVBJQfp/OVS-Core-Beanie-White.jpg"
                        alt="Original Knit Beanies"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                      <div className="absolute bottom-6 left-6 z-20 space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">ESSENTIALS // COLD CAPSULE</span>
                        <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">OVS CORE BEANIE</h3>
                        <p className="text-[11px] font-mono text-neutral-400 gap-1 inline-flex items-center">
                          EXPLORE BEANIES <ArrowRight className="w-4 h-4" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured products grid */}
              <section className="py-24 px-6 md:px-12 bg-[#0b0b0b]">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-left space-y-3">
                    <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-500 uppercase block">
                      // HIGH-END DEMAND
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-none">
                      STREET SELECTIONS
                    </h2>
                    <div className="h-[2px] w-12 bg-white mt-4" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredSelections.map((item) => (
                      <ProductCard
                        key={item.id}
                        product={item}
                        onQuickView={(p) => setQuickViewProduct(p)}
                        onSelectProduct={(p) => handleSelectProduct(p)}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Customer opinion statement section */}
              <section className="py-24 px-6 md:px-12 bg-black border-t border-b border-white/10 overflow-hidden relative">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center max-w-xl mx-auto space-y-3">
                    <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-500 uppercase">
                      // CUSTOMER STORIES
                    </span>
                    <h2 className="text-2xl md:text-4xl font-display font-extrabold uppercase text-white tracking-tight leading-none">
                      WEARERS STATEMENT
                    </h2>
                    <p className="text-xs font-sans text-neutral-400 leading-relaxed font-light">
                      Hear how locals represent OVS streetwear across South Africa's diverse concrete hubs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {REVIEWS.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-[#0a0a0a] p-6 md:p-8 border border-white/10 text-left flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(rev.rating) ? 'text-white fill-white' : 'text-neutral-700'
                                }`}
                              />
                            ))}
                          </div>
                          
                          <p className="text-xs sm:text-sm font-sans font-light text-neutral-300 leading-relaxed italic">
                            "{rev.comment}"
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-display font-bold uppercase tracking-wider text-white">
                              {rev.author}
                            </h4>
                            <p className="text-[10px] font-mono text-neutral-500 mt-0.5 uppercase">
                              {rev.location}
                            </p>
                          </div>
                          <span className="text-[9px] font-mono text-neutral-600 font-semibold uppercase">
                            {rev.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Newsletter Signup Segment */}
              <section className="py-24 px-6 bg-[#0a0a0a] border-b border-white/10 relative">
                <div className="absolute inset-0 streetwear-grid opacity-5 pointer-events-none" />
                
                <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                  <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-500 uppercase block">
                    // BROADCAST RADAR
                  </span>
                  
                  <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-widest leading-none">
                    JOIN THE RADAR
                  </h2>
                  
                  <p className="text-neutral-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed font-sans font-light">
                    Subscribe to receive notification updates on early releases, limited capsules, and local pop-up warehouse drops across South Africa.
                  </p>

                  <div className="max-w-md mx-auto">
                    {newsletterSuccess ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#0a0a0a] border border-white/10 py-3.5 px-6 flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-white uppercase text-center"
                        id="newsletter-success-bar"
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                        CONNECTED TO OVS RADAR SYSTEM
                      </motion.div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2" id="newsletter-form">
                        <input
                          type="email"
                          required
                          placeholder="WRITE_YOUR_EMAIL@DOMAIN.CO.ZA"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="flex-grow bg-black text-white text-xs font-mono border border-white/10 focus:border-white focus:outline-hidden px-4 py-3.5 tracking-wider uppercase rounded-none"
                        />
                        <button
                          type="submit"
                          className="bg-white text-black hover:bg-neutral-200 transition-all font-mono font-bold tracking-[0.25em] text-[10px] uppercase px-6 py-3.5 rounded-none flex items-center justify-center cursor-pointer"
                        >
                          SUBSCRIBE
                        </button>
                      </form>
                    )}
                  </div>
                  
                  <p className="text-[9px] font-mono text-neutral-600 uppercase">
                    STRICTLY OPT-IN DISPATCHES • UNCONNECTED OPTION AT ANY TIME
                  </p>
                </div>
              </section>
            </motion.div>
          )}

          {/* SHOP PAGE VIEW */}
          {currentTab === 'shop' && (
            <motion.div
              key="shop-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-left"
            >
              {/* Shop Header */}
              <div className="border-b border-white/10 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-500 uppercase">
                    // STREET ESSENTIALS
                  </span>
                  <h1 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-none">
                    OVS SHOP ARCHIVE
                  </h1>
                </div>

                <div className="font-mono text-right text-[10px] text-neutral-500 hidden md:block">
                  <p>SHOWING {filteredProducts.length} OF {PRODUCTS.length} ITEMS</p>
                  <p>LOCALLY STITCHED • READY TO PACK</p>
                </div>
              </div>

              {/* Minimal category filters */}
              <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
                {['ALL', 'Caps', 'T-Shirts', 'Beanies'].map((cat) => (
                  <button
                    key={cat}
                    id={`filter-btn-${cat}`}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all rounded-none ${
                      activeCategory === cat
                        ? 'bg-white text-black font-semibold'
                        : 'bg-[#0a0a0a] border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 cursor-pointer'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid Layout */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onSelectProduct={(p) => handleSelectProduct(p)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <p className="font-mono text-sm text-neutral-400">NO PIECES MATCH THIS ARCHIVE FILTER</p>
                  <button
                    onClick={() => setActiveCategory('ALL')}
                    className="border border-white/25 px-5 py-2 text-xs font-mono text-white tracking-widest uppercase hover:border-white rounded-none"
                  >
                    RESET CONFIGURATION
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* DEDICATED PRODUCT DETAILS PAGE VIEW */}
          {currentTab === 'product' && selectedProduct && (
            <motion.div
              key="product-details-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-left"
            >
              {/* Back navigation */}
              <button
                onClick={() => handleShopRedirect()}
                className="text-white hover:text-neutral-400 font-mono text-xs tracking-widest uppercase mb-10 pb-2 border-b border-transparent hover:border-neutral-400 transition-all flex items-center gap-1 cursor-pointer"
              >
                ← BACK TO LIST ARCHIVES
              </button>

              {/* Main detail grid columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left side Image selector carousel (5 cols) */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  <div className="aspect-square bg-white/5 border border-white/10 flex items-center justify-center p-3 sm:p-4 overflow-hidden relative">
                    <div className="w-full h-full bg-[#121212] border border-white/10 overflow-hidden relative">
                      <img
                        src={activeProductImage}
                        alt={selectedProduct.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-95 animate-fade-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Carousel list detailed thumbs */}
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveProductImage(img)}
                        className={`aspect-square bg-white/5 border p-1 cursor-pointer relative flex items-center justify-center ${
                          activeProductImage === img ? 'border-white' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="w-full h-full bg-[#121212] border border-white/10 overflow-hidden relative">
                          <img src={img} alt={`Thumb detail view ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side product purchase controls (6 cols) */}
                <div className="lg:col-span-6 space-y-8 lg:pl-4">
                  <div className="space-y-4">
                    <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-500 uppercase block">
                      OVS STORE // {selectedProduct.category.toUpperCase()}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-none">
                      {selectedProduct.name}
                    </h1>
                    <p className="text-2xl md:text-3xl font-mono text-white font-semibold">
                      R {selectedProduct.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <hr className="border-white/10" />

                  <div className="text-neutral-300 font-sans font-light text-sm md:text-base leading-relaxed space-y-4">
                    <p>{selectedProduct.description}</p>
                  </div>

                  {/* Sizing coordinates */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">SIZES SPECIFIED</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-4 py-2 border border-white/10 bg-black text-xs font-mono tracking-wider font-semibold uppercase text-white"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-neutral-500 leading-relaxed pt-1.5 uppercase">
                      * OUR SILHOUETTES RUN RELAXED STREET FIT COORDS. SIZE UP ONLY FOR ADVANCED UNDERGROUND DRAPE.
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 space-y-4">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct, selectedProduct.sizes[0]);
                        setIsCartOpen(true);
                      }}
                      className="w-full bg-white text-black hover:bg-neutral-200 py-4 uppercase font-mono text-xs tracking-[0.25em] font-bold transition-all h-14 flex items-center justify-center gap-2 rounded-none cursor-pointer"
                      id="detspage-add-to-cart-btn"
                    >
                      ADD TO STREET SELECTIONS
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono text-neutral-400">
                      <div className="flex items-center gap-2 p-3 bg-[#0a0a0a] border border-white/10">
                        <Truck className="w-4 h-4 text-white shrink-0" />
                        <span>SA COURIER (2-4 DAYS)</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#0a0a0a] border border-white/10">
                        <RotateCcw className="w-4 h-4 text-white shrink-0" />
                        <span>14 DAY COZY RETURN</span>
                      </div>
                    </div>
                  </div>

                  {/* Construction points split */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4">ENGINEERING HIGHLIGHTS</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-mono font-light text-neutral-300">
                          <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>

              {/* Related collections (Related products) */}
              <div className="mt-28 border-t border-white/10 pt-16 space-y-12">
                <div className="text-left space-y-3">
                  <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-500 uppercase block">
                    // ARCHIVES CAPSULES IN MATCH
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-extrabold uppercase text-white tracking-tight">
                    RELATED STREETWEAR SELECTIONS
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(0, 3).map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onSelectProduct={(p) => handleSelectProduct(p)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}


          {/* CONTACT FULL PAGE VIEW */}
          {currentTab === 'contact' && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {/* Contact Segment Wrapper */}
              <ContactForm />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER SECTION COMPLIANT */}
      <footer className="bg-black border-t border-white/10 py-16 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 text-left">
          
          {/* Column 1: Core logo and brand tags */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-2xl font-display font-black tracking-[0.25em] text-white">OVS</h3>
            <p className="text-xs font-sans font-light text-neutral-400 leading-relaxed max-w-xs">
              Sovereign South African Streetwear. Minimal apparel built to survive movement, handcrafted ethically in Johannesburg and Cape Town.
            </p>
            <p className="text-[10px] font-mono text-neutral-500 tracking-wider">
              OVS SOUTH AFRICA — EST. 2026 // ALL COZY RIGHTS RESERVED
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">DISCOVER</h4>
            <ul className="space-y-2 text-xs font-mono">
              {['home', 'shop', 'contact'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => {
                      setCurrentTab(tab);
                      setSelectedProduct(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-neutral-400 hover:text-white uppercase tracking-wider text-left transition-colors cursor-pointer"
                  >
                    {tab === 'home' ? 'HOMEPAGE' : tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Support */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">RADAR CHANNELS</h4>
            <div className="flex space-x-4 items-center">
              <a href="https://www.instagram.com/oviaas_official?igsh=ZjE5c2pxMDBsaHpw" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors" title="Instagram Link">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors" title="X Twitter Link">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors" title="YouTube Channel Link">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors" title="GitHub Source Link">
                <Users className="w-5 h-5" />
              </a>
            </div>
            
            <div className="space-y-1 text-xs font-sans text-neutral-400">
              <p>Hotline: +27 82 482 5898</p>
              <p>Email: support@ovsstreetwear.co.za</p>
            </div>
          </div>

          {/* Column 4: Local security credentials */}
          <div className="md:col-span-2 space-y-4 flex flex-col items-start justify-between">
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">RSA DISPATCH</h4>
              <p className="text-[9px] font-mono text-neutral-500 leading-normal">
                COURIER HANDLERS:<br />
                DPD LASER / ARAMEX ZA
              </p>
            </div>
            
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" /> SECURE STRIPE &amp; PayFast CO-SIGNED
            </span>
          </div>

        </div>
      </footer>

      {/* SLIDING CART DRAWER SYSTEM */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* PRODUCT QUICK VIEW MODAL OVERLAY */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
