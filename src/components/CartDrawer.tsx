/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, ShoppingBag, ArrowRight, Check, CreditCard, Sparkles, Building } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Instant EFT' // PayFast, EFT, Card
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const totalCost = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = true;
  const deliveryFee = 0;
  const grandTotal = totalCost;

  // South African Rand formatting helper
  const formatZAR = (value: number) => {
    return 'R ' + value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium payment gateways processing (Ozow, PayFast, Paygate)
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      setTimeout(() => {
        setOrderComplete(false);
        setCheckoutOpen(false);
        onClearCart();
        onClose();
      }, 3500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!checkoutOpen) onClose();
          }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Outer drawer frame */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 md:pl-20">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="w-screen max-w-md bg-[#0a0a0a] border-l border-white/10 flex flex-col justify-between text-white text-left shadow-2xl relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neutral-400" />
                <h2 className="text-sm font-display font-bold uppercase tracking-widest text-white">
                  YOUR COLLECTION ({cartItems.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 border border-transparent hover:border-white/15 text-neutral-400 hover:text-white transition-all bg-white/5 hover:bg-white/10"
                aria-label="Close cart side panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Dynamic Progress Widget */}
            {cartItems.length > 0 && !checkoutOpen && (
              <div className="bg-[#121212]/40 p-4 border-b border-white/10 text-xs text-center font-mono">
                <p className="text-neutral-200 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
                  FREE PREMIUM DELIVERY APPLIED THROUGHOUT
                </p>
              </div>
            )}

            {/* Cart list body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {orderComplete ? (
                /* Beautiful design checkout confirmation */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4 py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-zinc-900">
                    <Check className="w-8 h-8 text-black stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold tracking-widest text-white uppercase">
                    ORDER RECEIVED
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 tracking-wider">
                    DECO // OVS-SECURE-ID-772922
                  </p>
                  <p className="text-sm font-sans font-light text-neutral-300 leading-relaxed max-w-xs">
                    Your designer apparel will begin tailoring and packout. A courier dispatch notification (DPD/Aramex) will be SMSed to you shortly.
                  </p>
                  <div className="mt-6 pt-6 border-t border-neutral-900 w-full text-[10px] font-mono tracking-widest text-neutral-500">
                    OVS STREETWEAR — BRAAMFONTEIN // SOUTH AFRICA
                  </div>
                </motion.div>
              ) : checkoutOpen ? (
                /* Elegant billing simulated checkout form */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <button
                    onClick={() => setCheckoutOpen(false)}
                    className="text-white text-xs font-mono tracking-widest uppercase hover:underline mb-2 flex items-center gap-1"
                  >
                    ← BACK TO ITEM PACKOUT
                  </button>

                  <h3 className="text-md font-display font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
                    COURIER SHIPPING &amp; PAYMENT
                  </h3>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs font-mono" id="simulated-checkout-form">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 text-[10px] tracking-wider uppercase">FULL CUSTOMER NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sinethemba Nkosi"
                        value={shippingDetails.fullName}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                        className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400 text-[10px] tracking-wider uppercase">EMAIL FOR DISPATCH LOGS</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@domain.co.za"
                        value={shippingDetails.email}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                        className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400 text-[10px] tracking-wider uppercase">STREET SHIPPING ADDRESS</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 73 Juta St, Braamfontein"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                        className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 text-[10px] tracking-wider uppercase">CITY</label>
                        <input
                          type="text"
                          required
                          placeholder="Johannesburg"
                          value={shippingDetails.city}
                          onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                          className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 text-[10px] tracking-wider uppercase">POSTAL CODE</label>
                        <input
                          type="text"
                          required
                          placeholder="2001"
                          value={shippingDetails.postalCode}
                          onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                          className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-neutral-400 text-[10px] tracking-wider uppercase">SELECT LOCAL PAYMENT ENGINE</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Ozow EFT', 'PayFast', 'Visa/Mastercard'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: method })}
                            className={`p-3 text-[10px] border tracking-wider transition-all rounded-none font-bold select-none ${
                              shippingDetails.paymentMethod === method
                                ? 'bg-white border-white text-black'
                                : 'bg-black border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit checkout btn */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-neutral-200 mt-6 py-4 uppercase font-bold tracking-[0.2em] transition-all h-12 flex items-center justify-center gap-2 rounded-none cursor-pointer"
                      id="submit-payments-payment-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          AUTHORIZING TRANSACTION...
                        </>
                      ) : (
                        <>
                          PROCEED WITH {shippingDetails.paymentMethod.toUpperCase()}
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty Cart visual */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-12">
                  <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-mono tracking-widest text-neutral-400 font-bold uppercase">
                    Your collection is empty
                  </h3>
                  <p className="text-xs font-sans text-neutral-500 max-w-xs font-light">
                    Browse the essentials catalog and select original wear tailored to your aesthetic.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 border border-white/20 text-white hover:border-white px-6 py-3 font-mono text-[10px] tracking-widest uppercase transition-all rounded-none"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                /* Active items */
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-black border border-white/10 p-3 hover:border-white/20 transition-colors"
                    >
                      <div className="w-20 h-20 bg-white/5 border border-white/10 flex items-center justify-center p-1 relative shrink-0">
                        <div className="w-full h-full bg-[#121212] border border-white/10 overflow-hidden relative">
                          <img
                            src={item.product.bgImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-display font-medium text-white truncate uppercase tracking-wider">
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                          SIZE: <span className="text-white font-semibold">{item.size}</span>
                        </p>
                        <p className="text-xs font-mono font-bold text-white mt-1.5">
                          {formatZAR(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity manager columns */}
                      <div className="flex flex-col items-end justify-between gap-3 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-500 hover:text-white p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center border border-white/10 bg-[#0a0a0a] font-mono text-xs select-none">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-neutral-400 hover:text-white hover:bg-white/5 border-r border-white/10"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-[11px] text-white font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-neutral-400 hover:text-white hover:bg-white/5 border-l border-white/10"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom aggregate checkout tags */}
            {cartItems.length > 0 && !orderComplete && (
              <div className="p-6 border-t border-white/10 bg-black space-y-4">
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>ITEMS SUB-PAC:</span>
                    <span>{formatZAR(totalCost)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>DISPATCH COURIER:</span>
                    <span>{deliveryFee === 0 ? 'FREE' : formatZAR(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white pt-2 border-t border-white/10 font-bold tracking-wider">
                    <span>ESTIMATED TOTAL:</span>
                    <span>{formatZAR(grandTotal)}</span>
                  </div>
                </div>

                {!checkoutOpen && (
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full bg-white text-black hover:bg-neutral-200 py-4 uppercase font-bold tracking-[0.25em] text-xs transition-all h-12 flex items-center justify-center gap-2 rounded-none cursor-pointer"
                    id="checkout-summary-trigger-btn"
                  >
                    SECURE CHECKOUT
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center justify-center gap-2 text-neutral-500 text-[9px] font-mono tracking-wider pt-1.5">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <span>SECURED BY CODYPAY ENGINE // RSA GATEWAY</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
