"use client";

import React, { useState } from "react";
import FlowingMenu from "../components/FlowingMenu";

const services = [
  { link: '#', text: 'Brand architecture', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Brand strategy dev', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Social media content', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Digital strategy', image: 'https://picsum.photos/600/400?random=4' },
  { link: '#', text: 'Web dev and SEO', image: 'https://picsum.photos/600/400?random=5' },
  { link: '#', text: 'Mass media coord', image: 'https://picsum.photos/600/400?random=6' },
  { link: '#', text: 'On ground activation', image: 'https://picsum.photos/600/400?random=7' }
];

export default function ServicesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-platinum/10 transition-transform duration-500 ease-out">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-base max-w-container-max mx-auto h-[100px]">
          <a
            className="flex items-center gap-3 font-display-lg-mobile text-headline-lg-mobile font-extrabold tracking-tighter text-platinum"
            href="/"
          >
            CATALYST
          </a>
          <div className="hidden md:flex items-center space-x-12">
            <a
              className="text-primary font-bold border-b-2 border-primary pb-1 text-button"
              href="/services"
            >
              Services
            </a>
            <a
              className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button"
              href="#"
            >
              About
            </a>
          </div>
          <div className="hidden md:block">
            <a
              className="btn-hover-fill px-6 py-3 border border-platinum/20 rounded-full font-button text-button text-platinum inline-flex items-center gap-2 group"
              href="#"
            >
              Start a Project
              <span
                className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-300"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </a>
          </div>
          <button 
            className="md:hidden text-platinum p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className="material-symbols-outlined text-[32px]"
              data-icon={isMobileMenuOpen ? "close" : "menu"}
            >
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-[100px] left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-platinum/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
          <div className="flex flex-col items-center space-y-6">
            <a className="text-primary font-bold border-b-2 border-primary pb-1 text-button" href="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button" href="#" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a className="btn-hover-fill px-6 py-3 border border-platinum/20 rounded-full font-button text-button text-platinum inline-flex items-center gap-2 group mt-4" href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Start a Project
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-[100px] flex flex-col h-screen">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pt-12 pb-8 shrink-0">
          <span className="font-label-caps text-label-caps text-electric-indigo mb-4 block uppercase">
            01 — OUR CAPABILITIES
          </span>
          <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] font-light text-platinum">
            What we <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-electric-indigo to-shock-pink">do.</span>
          </h1>
        </div>

        {/* Flowing Menu Section - fills remaining height */}
        <div className="relative flex-grow min-h-[400px] w-full mt-4 pb-12">
          <FlowingMenu 
            items={services} 
            speed={20}
            bgColor="#10141a"
            textColor="#F2F4F7"
            marqueeBgColor="#6A28FF"
            marqueeTextColor="#F2F4F7"
            borderColor="rgba(242, 244, 247, 0.1)"
          />
        </div>
      </main>
    </div>
  );
}
