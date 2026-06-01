/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Plus, Minus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactForm() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API form submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="contact-section" className="py-24 px-6 md:px-12 bg-black border-t border-white/10 relative">
      <div className="absolute inset-0 streetwear-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Title Section */}
        <div className="text-left space-y-4">
          <span className="text-xs font-mono tracking-[0.3em] font-semibold text-neutral-400 uppercase block">
            // COMMUNAL SUPPORT
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-none">
            GET IN TOUCH // FAQ ARCHIVE
          </h2>
          <div className="h-[1px] w-20 bg-white pt-0.5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Form & Info (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-8 bg-[#0a0a0a] p-6 md:p-10 border border-white/10">
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white">
                SUBMIT TRANSMISSION
              </h3>
              <p className="text-xs font-sans font-light text-neutral-400 leading-relaxed max-w-md">
                Have a sizing question, press inquiry, or order logistics question? Drop a transmission below. Our JHB studio support operations are live weekdays 09:00 - 17:00.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-neutral-900 border border-neutral-800 p-6 text-center space-y-3"
                  id="contact-form-success"
                >
                  <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                  <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-white">
                    TRANSMISSION DISPATCHED
                  </h4>
                  <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                    Thank you. Your request was securely logged on ticket <span className="text-white font-mono">#OVS-LOG-4739</span>. Our coordinators will review and report back within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs" id="contact-feedback-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 text-[10px] tracking-wider uppercase">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 text-[10px] tracking-wider uppercase">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="john@email.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 text-[10px] tracking-wider uppercase">SUBJECT INQUIRY</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Orbit Camper Cap Sizing"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 text-[10px] tracking-wider uppercase">MESSAGE DETAIL</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your transmission here..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-black border border-white/10 focus:border-white focus:outline-hidden p-3 text-white transition-all rounded-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group bg-white text-black hover:bg-neutral-200 uppercase font-bold tracking-[0.2em] px-8 py-3.5 transition-all text-[11px] h-12 flex items-center justify-center gap-2 rounded-none cursor-pointer"
                    id="contact-form-submit-btn"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        DISPATCHING...
                      </>
                    ) : (
                      <>
                        SEND DISPATCH
                        <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: FAQ Accordion & Studio Info (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white">
                FREQUENT QUESTIONS
              </h3>
              
              {/* Accordion Component */}
              <div className="space-y-3 text-left">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 bg-[#0a0a0a]/50"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                      id={`faq-trigger-${idx}`}
                    >
                      <span className="text-xs font-display font-bold tracking-wider uppercase text-neutral-200">
                        {faq.question}
                      </span>
                      {activeFaq === idx ? (
                        <Minus className="w-4 h-4 text-white shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 pt-1 text-xs font-sans font-light text-neutral-400 leading-relaxed border-t border-white/10">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Headquarters directions/info */}
            <div className="pt-6 border-t border-white/10 space-y-4 text-left">
              <h4 className="text-xs font-mono tracking-widest text-white uppercase">HEADQUARTERS &amp; STORES</h4>
              <div className="space-y-3 font-sans text-xs font-light text-neutral-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">OVS Johannesburg Studio</p>
                    <p>73 Juta Street, Braamfontein, South Africa</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">Digital Logistics Inquiry</p>
                    <p>support@ovsstreetwear.co.za</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">Hotline Support</p>
                    <p>+27 82 482 5898</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
