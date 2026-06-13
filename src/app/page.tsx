"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-platinum/10 transition-transform duration-500 ease-out">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-base max-w-container-max mx-auto h-[100px]">
          <a
            className="flex items-center gap-3 font-display-lg-mobile text-headline-lg-mobile font-extrabold tracking-tighter text-platinum"
            href="#"
          >
            {/* <Image
              src="/Logo Mark.png"
              alt="Catalyst Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            /> */}
            CATALYST
          </a>
          <div className="hidden md:flex items-center space-x-12">
            <a
              className="text-primary font-bold border-b-2 border-primary pb-1 text-button"
              href="#"
            >
              Services
            </a>
            <a
              className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button"
              href="#"
            >
              Portfolio
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
            <a className="text-primary font-bold border-b-2 border-primary pb-1 text-button" href="#" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button" href="#" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</a>
            <a className="text-platinum/70 font-medium hover:text-primary transition-colors duration-300 text-button" href="#" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a className="btn-hover-fill px-6 py-3 border border-platinum/20 rounded-full font-button text-button text-platinum inline-flex items-center gap-2 group mt-4" href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Start a Project
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-[100dvh] md:min-h-[850px] pt-[120px] md:pt-[160px] overflow-hidden bg-transparent">
        <div className="absolute inset-0 w-full h-full block z-0">
          <Image
            src="/hero_city_crossing.png"
            alt="City Intersection Aerial View"
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay for text legibility and cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90 mix-blend-multiply"></div>
        </div>
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50"></div>
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div
            className="col-span-1 lg:col-span-8 fade-in-up"
            data-delay="100"
          >
            <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] xl:text-[80px] font-light text-platinum mb-6 md:mb-8">
              Turn ideas into <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-electric-indigo to-shock-pink">
                impactful brand
              </span>
              <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-shock-pink to-cyber-cyan">
                experiences.
              </span>
            </h1>
            <p className="font-body-lg text-base md:text-body-lg text-platinum/70 mb-8 md:mb-12 max-w-xl">
              We engineer momentum for ambitious brands. A rigorous blend of
              strategy, creative logic, and high-performance execution.
            </p>
          </div>
        </div>
        
        {/* Bottom Actions Bar */}
        <div className="absolute z-30 bottom-6 md:bottom-12 left-0 w-full px-margin-mobile md:px-margin-desktop pointer-events-none">
          <div className="max-w-container-max mx-auto relative flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-8 md:gap-0">
            {/* Buttons */}
            <div className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 w-full md:w-auto pointer-events-auto">
              <a
                className="flex-1 sm:flex-none text-center px-4 py-3 sm:px-8 sm:py-4 bg-electric-indigo/10 backdrop-blur-md border border-electric-indigo/50 text-platinum font-button text-xs sm:text-button rounded-full hover:bg-electric-indigo hover:scale-105 active:scale-95 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(106,40,255,0.2)] hover:shadow-[0_0_30px_rgba(106,40,255,0.5)] whitespace-nowrap"
                href="#work"
              >
                Explore Our Work
              </a>
              <a
                className="flex-1 sm:flex-none justify-center group px-4 py-3 sm:px-8 sm:py-4 text-platinum font-button text-xs sm:text-button rounded-full flex items-center gap-2 hover:text-electric-indigo transition-colors duration-300 whitespace-nowrap border border-transparent hover:border-platinum/20"
                href="#services"
              >
                View Capabilities
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
              className="pointer-events-auto flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300 group cursor-pointer animate-pulse md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-0"
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24 fade-in-up">
            <div className="md:col-span-5">
              <span className="font-label-caps text-label-caps text-electric-indigo mb-4 block">
                01 — CAPABILITIES
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black tracking-tighter text-ink-black leading-tight">
                Rigorous Strategy.<br />Reckless Creativity.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="font-body-lg text-body-lg text-surface-container-high/80">
                We don&apos;t just make things look good. We build scalable
                digital ecosystems that drive engagement, convert audiences, and
                establish enduring market authority.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div
              className="group bg-white p-8 rounded-lg border border-platinum/20 shadow-sm hover:shadow-xl transition-all duration-500 card-momentum fade-in-up"
              data-delay="100"
            >
              <div className="w-16 h-16 bg-electric-indigo/10 rounded flex items-center justify-center mb-8 group-hover:bg-electric-indigo group-hover:scale-110 transition-all duration-300">
                <span
                  className="material-symbols-outlined text-[32px] text-electric-indigo group-hover:text-white transition-colors"
                  data-icon="architecture"
                >
                  architecture
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold mb-4">
                Brand Architecture
              </h3>
              <p className="font-body-md text-body-md text-surface-container-high/70 mb-8">
                Foundational identity systems built for scale. We define the
                visual and verbal rules that govern how your brand exists in the
                world.
              </p>
              <a
                className="inline-flex items-center gap-2 font-button text-button text-electric-indigo group-hover:text-shock-pink transition-colors"
                href="#"
              >
                Learn more{" "}
                <span
                  className="material-symbols-outlined text-[16px]"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </a>
            </div>
            {/* Service Card 2 */}
            <div
              className="group bg-white p-8 rounded-lg border border-platinum/20 shadow-sm hover:shadow-xl transition-all duration-500 card-momentum fade-in-up"
              data-delay="200"
            >
              <div className="w-16 h-16 bg-shock-pink/10 rounded flex items-center justify-center mb-8 group-hover:bg-shock-pink group-hover:scale-110 transition-all duration-300">
                <span
                  className="material-symbols-outlined text-[32px] text-shock-pink group-hover:text-white transition-colors"
                  data-icon="campaign"
                >
                  campaign
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold mb-4">
                Social &amp; Engagement
              </h3>
              <p className="font-body-md text-body-md text-surface-container-high/70 mb-8">
                High-velocity content engines designed to capture attention and
                sustain momentum across all major digital touchpoints.
              </p>
              <a
                className="inline-flex items-center gap-2 font-button text-button text-shock-pink group-hover:text-electric-indigo transition-colors"
                href="#"
              >
                Learn more{" "}
                <span
                  className="material-symbols-outlined text-[16px]"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </a>
            </div>
            {/* Service Card 3 */}
            <div
              className="group bg-white p-8 rounded-lg border border-platinum/20 shadow-sm hover:shadow-xl transition-all duration-500 card-momentum fade-in-up"
              data-delay="300"
            >
              <div className="w-16 h-16 bg-cyber-cyan/10 rounded flex items-center justify-center mb-8 group-hover:bg-cyber-cyan group-hover:scale-110 transition-all duration-300">
                <span
                  className="material-symbols-outlined text-[32px] text-cyber-cyan group-hover:text-white transition-colors"
                  data-icon="insights"
                >
                  insights
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold mb-4">
                Digital Strategy
              </h3>
              <p className="font-body-md text-body-md text-surface-container-high/70 mb-8">
                Data-informed roadmaps that align business objectives with user
                behavior, ensuring every initiative delivers measurable ROI.
              </p>
              <a
                className="inline-flex items-center gap-2 font-button text-button text-cyber-cyan group-hover:text-electric-indigo transition-colors"
                href="#"
              >
                Learn more{" "}
                <span
                  className="material-symbols-outlined text-[16px]"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Catalyst Difference (Editorial Section) */}
      <section className="py-[160px] bg-surface-container-lowest relative z-10 clip-diagonal-reverse -mt-16 pb-[240px]">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-5 fade-in-up">
              <div className="relative w-full aspect-[4/5] rounded bg-surface-container border border-surface-variant overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-electric-indigo/20 to-transparent mix-blend-overlay z-10 group-hover:opacity-50 transition-opacity duration-500"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Team working"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbK2JKH_OpY6uwOLpL-PM35kPur1HqSXm1XCjm1SWkTiycbisgJwZ68Vb416KxoUa_NbZWyF71ebp1ZrSxs88pTGT-xOyzrFkCxooPP1nBj7QJxmpcwo0Wjy6VyDATMXGM-K97zBOKRaMYd3Ax4hpG5jsIt6E1rgNGLGu3wThMs7COxS6RFuGjS4i2JTvk6E0sugeMAE3zMeUYTbRbsOFIiShWeJQWexh_AIdAdz_hinuibuBVaaQ2pCVqNNxiErLrQwwuaIcxCSY"
                />
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7 mt-16 md:mt-0 fade-in-up" data-delay="200">
              <span className="font-label-caps text-label-caps text-shock-pink mb-4 block">
                02 — THE DIFFERENCE
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-md md:text-headline-md font-bold text-platinum mb-8 leading-tight">
                We don&apos;t follow trends. We establish them through systemic
                design and behavioral logic.
              </h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-electric-indigo/30 hover:border-electric-indigo transition-colors duration-300">
                  <h4 className="font-button text-button text-platinum mb-2">
                    Institutional Authority
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    We bring global network rigor to every project, ensuring
                    structural integrity and strategic depth before a single
                    pixel is placed.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-shock-pink/30 hover:border-shock-pink transition-colors duration-300">
                  <h4 className="font-button text-button text-platinum mb-2">
                    Boutique Agility
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Unencumbered by traditional agency bloat, our senior teams
                    operate with high-velocity sprints, moving from insight to
                    execution rapidly.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-cyber-cyan/30 hover:border-cyber-cyan transition-colors duration-300">
                  <h4 className="font-button text-button text-platinum mb-2">
                    Quantifiable Impact
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Creativity without metrics is just art. We build feedback
                    loops into our digital products to ensure continuous
                    optimization and growth.
                  </p>
                </div>
              </div>
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
              CATALYST
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
                  href="#"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="#"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-body-md text-platinum/50 hover:text-shock-pink hover:translate-x-1 transition-all duration-300 inline-block"
                  href="#"
                >
                  About
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
              <span className="w-2 h-2 rounded-full bg-cyber-cyan"></span>
              <span className="font-label-caps text-label-caps text-platinum/50">
                SYSTEM STATUS: OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
