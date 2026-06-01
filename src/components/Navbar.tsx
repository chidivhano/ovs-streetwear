/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, Shield, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  toggleCart: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, cartCount, toggleCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    "FREE COURIER DELIVERY THROUGHOUT SOUTH AFRICA",
    "OVS ESSENTIALS COLLECTION IS NOW ONLINE",
    "FREE DOOR-TO-DOOR SHIPPING ON ALL ORDERS"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Swap announcement text every 5 seconds
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { id: 'home', label: 'HOMEPAGE' },
    { id: 'shop', label: 'SHOP' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Premium Ticker bar */}
      <div className="bg-white text-black py-2 px-4 text-center text-[10px] font-mono tracking-[0.2em] font-semibold transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" /> ZA
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={announcementIndex}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mx-auto"
            >
              {announcements[announcementIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="hidden sm:inline-flex items-center gap-1 text-[9px]">
            <Shield className="w-3 h-3" /> SECURE CHECKOUT
          </span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <nav
        className={`w-full px-6 md:px-12 transition-all duration-300 border-b border-white/10 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md py-3'
            : 'bg-black/40 backdrop-blur-xs py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-neutral-400 p-1"
            id="mobile-menu-trigger"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Nav Links - Left on Desktop */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-mono tracking-widest transition-all relative py-1 hover:text-white ${
                  currentTab === item.id ? 'text-white font-medium' : 'text-neutral-400'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {currentTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Centered Brand Identity Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-3xl font-black tracking-tighter text-white hover:opacity-85"
              id="brand-logo"
            >
              OVS
            </button>
          </div>

          {/* Action Icons - Right side */}
          <div className="flex items-center space-x-6">
            <button 
              className="text-neutral-400 hover:text-white transition-colors cursor-not-allowed"
              title="Search collection (Display)"
            >
              <Search className="w-5 h-5 hidden sm:block" />
            </button>

            {/* Cart trigger button */}
            <button
              onClick={toggleCart}
              className="text-white hover:text-neutral-400 transition-colors relative p-1 flex items-center gap-1.5"
              id="cart-trigger-btn"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 ? (
                <span className="bg-white text-black text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[10px] font-mono text-neutral-400 hidden lg:inline">CART (0)</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Header drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-[100%] left-0 w-full bg-black border-b border-neutral-900 shadow-2xl z-40 block md:hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-lg font-display tracking-[0.15em] py-2 border-b border-neutral-900 transition-all ${
                    currentTab === item.id ? 'text-white font-bold pl-2' : 'text-neutral-400'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col space-y-3 font-mono text-[10px] text-neutral-500">
                <p>OVS Essentials</p>
                <p>BUILT FOR THE ORIGINALS.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
