/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView, onSelectProduct }: ProductCardProps) {
  // Check if a badge should show
  const isLimited = product.rating >= 4.9;
  const isNew = product.id.includes('hoodie');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col justify-between h-full bg-[#0a0a0a] border border-white/10 overflow-hidden"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] bg-white/5 border-b border-white/10 flex items-center justify-center p-3 xs:p-4 overflow-hidden select-none">
        <div className="w-full h-full bg-[#121212] border border-white/10 overflow-hidden relative">
          
          {/* Floating Labels / Badges */}
          {isLimited && (
            <span className="absolute top-3 left-3 z-20 bg-white text-black text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase">
              BEST SELLER
            </span>
          )}
          {isNew && (
            <span className="absolute top-3 left-3 z-20 bg-[#121212] border border-white/10 text-white text-[9px] font-mono tracking-widest px-2.5 py-1 uppercase">
              NEW COLD CAPSULE
            </span>
          )}

          <img
            src={product.bgImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
          />

          {/* Action Overlay - Premium Overlay with seamless button entries */}
          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-10 px-2">
            <button
              onClick={() => onQuickView(product)}
              className="p-2 bg-white text-black rounded-none shadow-md hover:bg-neutral-200 transition-all cursor-pointer transform translate-y-3 group-hover:translate-y-0 duration-300 flex items-center justify-center gap-1.5 text-[9px] font-mono tracking-widest font-black"
              title="Quick View Details"
              id={`quick-view-${product.id}`}
            >
              <Eye className="w-3.5 h-3.5" />
              QUICK
            </button>
            
            <button
              onClick={() => onSelectProduct(product)}
              className="p-2 bg-[#121212] border border-white/10 text-white rounded-none hover:bg-[#1a1a1a] transition-all cursor-pointer transform translate-y-3 group-hover:translate-y-0 duration-300 flex items-center justify-center gap-1.5 text-[9px] font-mono tracking-widest font-black"
              title="View Full Product Page"
              id={`view-details-${product.id}`}
            >
              <Plus className="w-3.5 h-3.5" />
              DETAILS
            </button>
          </div>
        </div>
      </div>

      {/* Product Metadata Details */}
      <div className="p-4 flex flex-col flex-grow bg-black">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[9px] font-mono tracking-wider text-gray-400 uppercase">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-[10px] font-mono text-white">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3
          onClick={() => onSelectProduct(product)}
          className="text-xs font-display font-bold text-white tracking-wider uppercase hover:text-gray-400 transition-colors cursor-pointer line-clamp-1 mb-2"
        >
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between pt-3 border-t border-white/10">
          <p className="text-[9px] font-mono text-gray-400">
            {product.color}
          </p>
          <p className="text-xs font-mono font-bold text-white tracking-widest">
            R {product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
