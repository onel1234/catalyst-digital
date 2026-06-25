"use client";

import React, { useState, useEffect } from "react";
import { services } from "@/lib/constants";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedServices: [] as string[]
  });

  // Reset form when modal closes/opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        selectedServices: []
      });
    }
  }, [isOpen]);

  const handleServiceToggle = (serviceText: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedServices.includes(serviceText);
      if (isSelected) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter(s => s !== serviceText)
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, serviceText]
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Auto close after 3 seconds of success message
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md transition-all duration-500">
      <div 
        className="relative w-full max-w-2xl bg-[#0a0a0e]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-platinum">
            Start a Project
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-platinum/50 hover:text-platinum hover:bg-white/5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center fade-in-up is-visible">
              <div className="w-20 h-20 bg-electric-indigo/20 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-electric-indigo">check_circle</span>
              </div>
              <h3 className="font-headline-md text-2xl font-bold text-platinum mb-4">Request Received</h3>
              <p className="font-body-md text-platinum/70 max-w-md">
                Thank you for your interest! Our team will review your project details and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 fade-in-up is-visible">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="font-button text-sm text-platinum/70 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric-indigo focus:bg-white/10 transition-all placeholder:text-platinum/30"
                    placeholder="Jane Doe"
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="font-button text-sm text-platinum/70 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric-indigo focus:bg-white/10 transition-all placeholder:text-platinum/30"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="font-button text-sm text-platinum/70 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric-indigo focus:bg-white/10 transition-all placeholder:text-platinum/30"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Services Checkboxes */}
              <div className="space-y-3">
                <label className="font-button text-sm text-platinum/70 block">
                  Which services are you interested in? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {services.map((service, idx) => {
                    const isSelected = formData.selectedServices.includes(service.text);
                    return (
                      <label 
                        key={idx} 
                        onClick={() => handleServiceToggle(service.text)}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? "bg-electric-indigo/20 border-electric-indigo text-platinum shadow-[0_0_15px_rgba(106,40,255,0.2)]" 
                            : "bg-white/5 border-white/10 text-platinum/70 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 border transition-colors duration-300 ${
                          isSelected ? "bg-electric-indigo border-electric-indigo" : "bg-black/20 border-white/20"
                        }`}>
                          <span 
                            className={`material-symbols-outlined text-[14px] text-white font-bold transition-all duration-300 ${
                              isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0"
                            }`}
                          >
                            check
                          </span>
                        </div>
                        <span className="font-body-md text-sm">{service.text}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hover-fill px-6 py-4 bg-electric-indigo border-none rounded-lg font-button text-button text-platinum inline-flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Submitting...</span>
                  ) : (
                    <>
                      Submit Request
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-300">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
