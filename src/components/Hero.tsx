/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onShopClick: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  return (
    <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black/80">
      
      {/* Background Streetwear Imagery with Monochrome Grade filter */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1920&auto=format&fit=crop"
          alt="South African Urban Concrete Streetwear Vibe"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[0.35] contrast-[1.2] scale-[1.03] transition-transform duration-[10000ms]"
          style={{ animation: 'slowpan 20s infinite alternate ease-in-out' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/40 to-black/50 z-10" />
        <div className="absolute inset-0 streetwear-grid z-10 opacity-30" />
      </div>

      {/* Floating coordinates or system details - authentic styling details */}
      <div className="absolute left-6 bottom-12 z-20 font-mono text-[9px] tracking-[0.2em] text-neutral-500 hidden md:block">
        <p>COORDS // 26.1952° S, 28.0340° E (JHB)</p>
        <p>COORDS // 33.9249° S, 18.4241° E (CPT)</p>
        <p>COLLECTION // OVS.01-ESSENTIALS</p>
      </div>

      <div className="absolute right-6 bottom-12 z-20 font-mono text-[9px] tracking-[0.2em] text-neutral-500 hidden md:block">
        <p>© OVS SOUTH AFRICA</p>
        <p>ALL STATEMENT STYLES RESERVED</p>
      </div>

      {/* Hero content container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p className="text-xs md:text-sm font-mono tracking-[0.3em] font-semibold text-neutral-400">
            OVS ESSENTIALS — VOLUME // I
          </p>
          
          <h1 className="text-5xl md:text-8xl font-display font-extrabold text-white tracking-tighter leading-none uppercase">
            Built for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              Originals.
            </span>
          </h1>

          <p className="text-neutral-300 max-w-xl mx-auto text-sm md:text-lg font-sans font-light tracking-wide leading-relaxed md:px-0 px-4">
            Created to move with you from the streets to the moments that matter. Thoughtfully crafted pieces, intentional design, and a culture rooted in authenticity.
          </p>

          {/* Call to Actions with pristine interactive micro-transitions */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onShopClick}
              className="group relative bg-white text-black text-xs font-mono font-bold tracking-[0.2em] px-8 py-4 uppercase transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] w-60 sm:w-auto h-12 flex items-center justify-center gap-2"
              id="hero-shop-collection-btn"
            >
              SHOP COLLECTION
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href="#about-section"
              className="text-xs font-mono font-semibold tracking-[0.2em] px-8 py-4 text-white hover:text-neutral-300 transition-colors bg-transparent border border-white/20 hover:border-white/60 w-60 sm:w-auto h-12 flex items-center justify-center uppercase"
            >
              OUR STORY
            </a>
          </div>
        </motion.div>

        {/* Scroll helper */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center">
          <p className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase mb-2">SCROLL DOWN</p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-neutral-400"
          >
            <ChevronDown className="w-5 h-5 cursor-pointer hover:text-white" onClick={onShopClick} />
          </motion.div>
        </div>
      </div>
      
      {/* Keyframe animation for pan background image */}
      <style>{`
        @keyframes slowpan {
          0% {
            transform: scale(1.02) translate(0px, 0px);
          }
          100% {
            transform: scale(1.08) translate(-10px, -5px);
          }
        }
      `}</style>
    </section>
  );
}
