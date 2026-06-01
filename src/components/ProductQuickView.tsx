/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductQuickView({ product, onClose, onAddToCart }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  // Set default size if only one option exists
  const isOneSize = product.sizes.length === 1;
  const currentSize = selectedSize || (isOneSize ? product.sizes[0] : '');

  const handleAddToCart = () => {
    const sizeToUse = currentSize || (isOneSize ? product.sizes[0] : '');
    if (!sizeToUse) return; // Must select size if not single-size!

    onAddToCart(product, sizeToUse);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose(); // auto-close after adding to simplify UX
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 flex flex-col md:flex-row text-white text-left"
          id="quickview-modal-container"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 text-neutral-400 hover:text-white p-2 bg-black/60 hover:bg-[#121212] border border-transparent hover:border-white/10 transition-all rounded-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Left Carousel/Grid (using Unsplash Image) with double borders */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center bg-black/40 border-b md:border-b-0 md:border-r border-white/10">
            <div className="w-full h-[300px] md:h-[450px] bg-white/5 border border-white/10 flex items-center justify-center p-3 sm:p-4 overflow-hidden select-none">
              <div className="w-full h-full bg-[#121212] border border-white/10 overflow-hidden relative">
                <img
                  src={product.bgImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Column: Information Forms */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] font-semibold text-neutral-500 uppercase">
                OVS // {product.category}
              </span>
              
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wide uppercase mt-1 mb-2">
                {product.name}
              </h2>

              <p className="text-xl md:text-2xl font-mono text-white font-semibold mb-6">
                R {product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </p>

              {/* Description */}
              <div className="text-neutral-400 space-y-4 text-xs md:text-sm leading-relaxed font-sans font-light">
                <p>{product.description}</p>
              </div>

              {/* Key Features details */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-3">CONSTRUCTION DETAILS</p>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs font-mono font-light text-neutral-300 gap-2">
                      <span className="text-white font-black mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selector */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">SELECT SIZE</p>
                  <span className="text-[9px] font-mono text-neutral-500 hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> FIT SPECIFICATIONS
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded-none ${
                        currentSize === size
                          ? 'bg-white text-black font-bold'
                          : 'bg-black border border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!currentSize || addedSuccess}
                className={`w-full py-4 uppercase font-mono text-xs tracking-[0.25em] font-bold transition-all duration-300 flex items-center justify-center gap-2 rounded-none h-12 ${
                  addedSuccess
                    ? 'bg-[#121212] text-neutral-400 cursor-not-allowed'
                    : !currentSize
                    ? 'bg-[#121212] text-neutral-600 border border-white/5 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-neutral-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                }`}
                id="modal-add-to-cart-btn"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    ADDED TO CART
                  </>
                ) : !currentSize ? (
                  'SELECT SIZE TO ADD'
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    ADD TO CART
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-neutral-500 text-[10px] font-mono tracking-wide">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>HANDY WORKED IN SOUTH AFRICA — ETHICALLY SOURCED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
