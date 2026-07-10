"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import NavBar from "./components/NavBar";
import { services } from "../lib/constants";

export default function Home() {

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delayStr = entry.target.getAttribute("data-delay") || "0";
          const delay = parseInt(delayStr, 10);
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-white">
        <div className="absolute inset-0 w-full h-full block z-0">
          {/* Desktop Image */}
          <Image
            src="/catalyst hero image.jpeg"
            alt="Catalyst Hero Background"
            fill
            className="hidden md:block object-cover object-[center_20%]"
            priority
            sizes="100vw"
          />
          {/* Mobile Image */}
          <Image
            src="/catalyst mobile logo.jpeg"
            alt="Catalyst Mobile Logo"
            fill
            className="block md:hidden object-contain object-center"
            priority
            sizes="100vw"
          />
        </div>
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50"></div>
        
        {/* Main Content (Pushes bottom bar down) */}
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-[140px] md:pt-[180px] pb-12 flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
            {/* Text Content */}
            <div
              className="col-span-1 lg:col-span-8 fade-in-up"
              data-delay="100"
            >
            <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] xl:text-[80px] font-light text-ink-black mb-6 md:mb-8">
              The catalyst for <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-electric-indigo to-shock-pink">
                Industry
              </span>
              <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-shock-pink to-cyber-cyan">
                Disruption.
              </span>
            </h1>
            <p className="font-body-lg text-base md:text-body-lg text-ink-black/80 mb-8 md:mb-12 max-w-xl">
              Your innovative strategic partner. We empower small and medium enterprises with untapped digital potential, turning vision into disruptive brand experiences.
            </p>
          </div>
        </div>
        </div>
        
        {/* Bottom Actions Bar */}
        <div className="relative z-30 w-full px-margin-mobile md:px-margin-desktop pb-12 md:pb-24 pointer-events-none shrink-0">
          <div className="max-w-container-max mx-auto relative flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-8 md:gap-0">
            {/* Buttons */}
            <div
              className="w-full md:w-auto pointer-events-auto"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '460px', margin: '0 auto' }}
            >
              <button
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="px-2 py-3 sm:px-8 sm:py-4 bg-electric-indigo/10 backdrop-blur-md border border-electric-indigo/50 text-ink-black hover:text-platinum font-button font-bold text-xs sm:text-button rounded-full hover:bg-electric-indigo hover:scale-105 active:scale-95 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(106,40,255,0.2)] hover:shadow-[0_0_30px_rgba(106,40,255,0.5)] whitespace-nowrap"
                onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
              >
                Start a Project
              </button>
              <a
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="group px-2 py-3 sm:px-8 sm:py-4 bg-white/60 backdrop-blur-md border border-white/50 text-ink-black font-button font-bold text-xs sm:text-button rounded-full gap-1 sm:gap-2 hover:bg-white/90 hover:text-electric-indigo transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] whitespace-nowrap"
                href="#portfolio"
              >
                Explore Our Work
                <span
                  className="material-symbols-outlined text-[16px] sm:text-[18px] group-hover:translate-x-1 transition-transform duration-300"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </a>
            </div>

            {/* Scroll Indicator */}
            <a
              href="#services"
              className="pointer-events-auto flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300 group cursor-pointer animate-pulse md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2"
              aria-label="Scroll down"
            >
              <svg
                className="w-10 h-10 text-platinum group-hover:text-electric-indigo group-hover:drop-shadow-[0_0_12px_rgba(106,40,255,0.8)] transition-all duration-300 animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* What We Do (Light Section for Contrast) */}
      <section
        className="py-[120px] bg-platinum text-ink-black clip-diagonal relative z-20 -mt-16"
        id="services"
      >
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12 md:mb-24 fade-in-up">
            <div className="md:col-span-5">
              <span className="font-label-caps text-label-caps text-electric-indigo mb-4 block">
                01 — CAPABILITIES
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black tracking-tighter text-ink-black leading-tight">
                Creativity.<br />Vision. Disruption.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="font-body-lg text-body-lg text-surface-container-high/80">
                We aren&apos;t just another agency—we become part of your business. From developing GenZ-focused concepts to comprehensive on-site branding, we are the affordable alternative to industry titans.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up" data-delay="100">
            {services.map((service, index) => (
              <div key={index} className="relative group rounded-3xl overflow-hidden h-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col justify-end">
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.text}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay for Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-ink-black/50 to-transparent"></div>
                
                {/* Card Content */}
                <div className="relative z-10 p-6 flex flex-col gap-4">
                  <div>
                    <h3 className="font-headline-md text-2xl font-bold text-platinum mb-2">{service.text}</h3>
                    <p className="text-platinum/80 text-sm line-clamp-3 font-body-md">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {service.tags?.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 rounded-full bg-platinum/10 backdrop-blur-md text-platinum text-xs font-medium flex items-center gap-1 border border-platinum/10">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Button */}
                  <a href={service.link} className="mt-auto w-full py-3.5 bg-platinum text-ink-black font-button text-sm font-semibold text-center rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg">
                    Learn more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-[160px] bg-surface-container-lowest relative z-10 clip-diagonal-reverse -mt-16 pb-[240px]">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-12 fade-in-up" data-delay="100">
              <span className="font-label-caps text-label-caps text-shock-pink mb-4 block">
                02 — PORTFOLIO
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-md md:text-headline-md font-bold text-platinum mb-12 leading-tight">
                Featured Client Work
              </h2>
            </div>
            
            <div className="md:col-span-12 fade-in-up" data-delay="200">
              <Link 
                href="/portfolio/chill-co" 
                className="group block relative w-full rounded-[32px] overflow-hidden bg-surface-container hover:shadow-[0_0_80px_rgba(106,40,255,0.15)] transition-all duration-700 ease-out border border-platinum/5 hover:border-electric-indigo/30"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Visual Side */}
                  <div className="relative w-full aspect-square lg:aspect-auto bg-[#0d1117] overflow-hidden">
                    {/* Animated glowing orbs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(106,40,255,0.15)_0%,transparent_50%)] group-hover:scale-110 transition-transform duration-1000 ease-in-out"></div>
                    <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_50%)] group-hover:translate-x-10 transition-transform duration-1000 ease-in-out"></div>
                    
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
                    
                    {/* Website Preview Iframe */}
                    <div className="absolute inset-4 sm:inset-8 lg:inset-12 rounded-[16px] sm:rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] sm:group-hover:scale-105 transition-all duration-700 ease-out bg-surface-container z-10 pointer-events-none">
                      {/* Browser Header Mockup */}
                      <div className="h-6 sm:h-8 bg-[#1a1b23] border-b border-white/5 flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="relative w-full h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] bg-white pointer-events-none">
                        <iframe 
                          src="https://chill-co.vercel.app/" 
                          className="w-full h-full border-0 pointer-events-none"
                          tabIndex={-1}
                          scrolling="no"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="relative p-6 sm:p-10 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-surface-container to-background z-10 border-t lg:border-t-0 lg:border-l border-platinum/5">
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-electric-indigo to-shock-pink transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-platinum/10 text-[10px] sm:text-xs font-button tracking-wider text-platinum/70 uppercase group-hover:border-electric-indigo/30 transition-colors duration-300">E-Commerce</span>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-platinum/10 text-[10px] sm:text-xs font-button tracking-wider text-platinum/70 uppercase group-hover:border-shock-pink/30 transition-colors duration-300">Digital Identity</span>
                    </div>
                    
                    <h3 className="font-display-lg-mobile text-[32px] sm:text-[40px] md:text-[56px] font-bold text-platinum mb-4 sm:mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-platinum group-hover:to-platinum/60 transition-all duration-300">
                      Chill Co.
                    </h3>
                    
                    <p className="font-body-lg text-platinum/60 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 max-w-lg">
                      CHILL CO. transforms Sri Lanka’s rich history, folklore, and ancient art into premium oversized apparel. Every collection begins with a story—whether it’s a legendary king, a timeless love story, or a forgotten piece of heritage—and is reimagined into wearable artwork.
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 sm:pt-8 border-t border-platinum/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-[11px] tracking-widest font-label-caps text-platinum/40 mb-1 sm:mb-2 uppercase">Measurable Impact</span>
                        <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-electric-indigo">+240% Conv. Rate</span>
                      </div>
                      
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-platinum/10 flex items-center justify-center bg-surface-variant/50 group-hover:bg-electric-indigo group-hover:border-electric-indigo group-hover:shadow-[0_0_20px_rgba(106,40,255,0.4)] transition-all duration-500 ease-out">
                        <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-platinum group-hover:translate-x-1 transition-transform duration-300">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest w-full py-[120px] border-t border-platinum/10 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="md:col-span-4 mb-12 md:mb-0">
            <a
              className="font-display-lg-mobile text-display-lg-mobile font-black text-platinum tracking-tighter block mb-6 hover:text-shock-pink transition-all duration-300"
              href="#"
            >
              CATALYST MARKETING
            </a>
            <p className="font-body-md text-body-md text-platinum/50 mb-8 max-w-xs">
              Engineering momentum for ambitious brands through rigorous
              strategy and high-impact design.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-7 mb-8 md:mb-0">
            <h4 className="font-button text-button text-platinum mb-6 tracking-widest uppercase">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="/#services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="/#portfolio"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="#"
                >
                  Insights
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-button text-button text-platinum mb-6 tracking-widest uppercase">
              Legal &amp; Social
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="#"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="#"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-12 mt-24 pt-8 border-t border-platinum/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body-md text-body-md text-platinum/50">
              © 2024 Catalyst Marketing Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-body-md text-body-md text-platinum/50">
                Developed by <a href="https://www.swiftstack.digital/" target="_blank" rel="noopener noreferrer" className="text-platinum hover:text-electric-indigo transition-colors duration-300">SwiftStack Digital</a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
