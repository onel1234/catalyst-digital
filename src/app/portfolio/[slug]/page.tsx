import React, { use } from "react";
import NavBar from "../../components/NavBar";
import { portfolios } from "../../../lib/constants";
import ContactButton from "../../components/ContactButton";

export function generateStaticParams() {
  return portfolios.map((portfolio) => ({
    slug: portfolio.link.split('/').pop(),
  }));
}

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const portfolio = portfolios.find((p) => p.link.endsWith(`/${unwrappedParams.slug}`));

  if (!portfolio) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-platinum">
        <NavBar />
        <main className="flex-grow pt-[140px] flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Project not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-grow pt-[140px] pb-24">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          {/* Header Section */}
          <div className="mb-12">
            <span className="font-label-caps text-label-caps text-electric-indigo mb-4 block uppercase tracking-wider">
              {portfolio.tags.join(" • ")}
            </span>
            <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] font-bold text-platinum mb-6">
              {portfolio.client}
            </h1>
            <p className="font-body-lg text-platinum/90 text-2xl md:text-3xl font-medium max-w-4xl">
              {portfolio.description}
            </p>
          </div>

          {/* Website Preview Iframe Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-platinum/10 shadow-2xl bg-surface-container flex flex-col">
            {/* Browser Header Mockup */}
            <div className="h-10 bg-[#1a1b23] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            {/* Iframe */}
            <div className="relative flex-grow bg-white">
              <iframe 
                src={portfolio.websiteUrl} 
                className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                tabIndex={-1}
                scrolling="no"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Main Description */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {portfolio.fullDescription.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={
                    index === 0 
                      ? "font-headline-md text-2xl md:text-3xl font-bold text-platinum mb-2" 
                      : "font-body-lg text-platinum/80 text-lg md:text-xl leading-relaxed"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Impact sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-surface-container-low border border-platinum/10 rounded-3xl p-8 sticky top-32 shadow-xl flex flex-col items-center text-center">
                <span className="text-sm tracking-widest font-label-caps text-platinum/60 mb-2 uppercase">
                  {portfolio.metricLabel}
                </span>
                <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-electric-indigo mb-8">
                  {portfolio.metricValue}
                </span>
                
                <a 
                  href={portfolio.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-platinum/5 border border-platinum/20 text-platinum font-button text-sm font-semibold rounded-full hover:bg-platinum/10 transition-colors"
                >
                  Visit Live Site
                </a>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-32 text-center bg-electric-indigo/5 border border-electric-indigo/20 rounded-3xl p-12 lg:p-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/10 to-shock-pink/10 opacity-50"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:text-4xl font-bold text-platinum mb-6">Ready to create something amazing?</h2>
              <p className="font-body-md text-platinum/70 mb-10 text-lg">
                Let's discuss how we can help your brand stand out and drive real market impact.
              </p>
              <ContactButton />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
