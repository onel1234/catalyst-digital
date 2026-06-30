import React from "react";
import NavBar from "../components/NavBar";
import { portfolios } from "../../lib/constants";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest text-platinum">
      <NavBar />
      <main className="flex-grow pt-[140px] pb-32">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          
          <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto fade-in-up">
            <span className="font-label-caps text-label-caps text-shock-pink mb-4 block uppercase tracking-wider">
              OUR WORK
            </span>
            <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] font-bold text-platinum mb-6">
              Featured Client Work
            </h1>
            <p className="font-body-lg text-platinum/70 text-xl leading-relaxed">
              Explore our diverse portfolio of impactful digital experiences, strategic branding, and transformative campaigns that drive measurable results.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {portfolios.map((portfolio, index) => (
              <div key={index} className="fade-in-up" data-delay={100 * (index + 1)}>
                <Link 
                  href={portfolio.link} 
                  className="group block relative w-full rounded-[32px] overflow-hidden bg-surface-container hover:shadow-[0_0_80px_rgba(106,40,255,0.15)] transition-all duration-700 ease-out border border-platinum/5 hover:border-electric-indigo/30"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Visual Side */}
                    <div className="relative w-full aspect-square lg:aspect-auto bg-[#0d1117] overflow-hidden min-h-[400px]">
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
                            src={portfolio.websiteUrl} 
                            className="w-full h-full border-0 pointer-events-none"
                            tabIndex={-1}
                            scrolling="no"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="relative p-8 sm:p-10 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-surface-container to-background z-10 border-t lg:border-t-0 lg:border-l border-platinum/5">
                      {/* Top Accent Bar */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-electric-indigo to-shock-pink transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
                        {portfolio.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-platinum/10 text-[10px] sm:text-xs font-button tracking-wider text-platinum/70 uppercase group-hover:border-electric-indigo/30 transition-colors duration-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="font-display-lg-mobile text-[32px] sm:text-[40px] md:text-[56px] font-bold text-platinum mb-4 sm:mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-platinum group-hover:to-platinum/60 transition-all duration-300">
                        {portfolio.client}
                      </h3>
                      
                      <p className="font-body-lg text-platinum/60 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 max-w-lg line-clamp-3">
                        {portfolio.landingPageDescription}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-6 sm:pt-8 border-t border-platinum/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] sm:text-[11px] tracking-widest font-label-caps text-platinum/40 mb-1 sm:mb-2 uppercase">
                            {portfolio.metricLabel}
                          </span>
                          <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-electric-indigo">
                            {portfolio.metricValue}
                          </span>
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
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
