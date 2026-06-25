"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactModal from "./ContactModal";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isContactModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactModalOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-platinum/10 transition-transform duration-500 ease-out">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-base max-w-container-max mx-auto h-[100px]">
          <Link
            className="flex items-center gap-3 font-display-lg-mobile text-headline-lg-mobile font-extrabold tracking-tighter text-platinum hover:text-shock-pink transition-colors duration-300"
            href="/"
          >
            CATALYST
          </Link>
          <div className="hidden md:flex items-center space-x-12">
            <Link
              className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button"
              href="/#services"
            >
              Services
            </Link>
            <Link
              className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button"
              href="/#portfolio"
            >
              Portfolio
            </Link>
          </div>
          <div className="hidden md:block">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="btn-hover-fill px-6 py-3 border border-platinum/20 rounded-full font-button text-button text-platinum inline-flex items-center gap-2 group cursor-pointer"
            >
              Start a Project
              <span
                className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-300"
              >
                arrow_forward
              </span>
            </button>
          </div>
          <button 
            className="md:hidden text-platinum p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className="material-symbols-outlined text-[32px]"
            >
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-[100px] left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-platinum/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
          <div className="flex flex-col items-center space-y-6">
            <Link 
              className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button"
              href="/#services"
            >
              Services
            </Link>
            <Link className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button" href="/#portfolio">
              Portfolio
            </Link>
            <button 
              className="btn-hover-fill px-6 py-3 border border-platinum/20 rounded-full font-button text-button text-platinum inline-flex items-center gap-2 group mt-4 cursor-pointer" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactModalOpen(true);
              }}
            >
              Start a Project
            </button>
          </div>
        </div>
      </nav>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
