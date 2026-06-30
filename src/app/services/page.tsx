import React from "react";
import NavBar from "../components/NavBar";
import { services } from "../../lib/constants";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-platinum">
      <NavBar />
      <main className="flex-grow pt-[140px] pb-24">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          
          <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <span className="font-label-caps text-label-caps text-electric-indigo mb-4 block uppercase tracking-wider">
              OUR CAPABILITIES
            </span>
            <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] font-bold text-platinum mb-6">
              Creativity. Vision. Disruption.
            </h1>
            <p className="font-body-lg text-platinum/70 text-xl leading-relaxed">
              We aren&apos;t just another agency—we become part of your business. From developing GenZ-focused concepts to comprehensive on-site branding, we are the affordable alternative to industry titans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="relative group rounded-3xl overflow-hidden h-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-end border border-platinum/10">
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.text}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay for Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-ink-black/50 to-transparent"></div>
                
                {/* Card Content */}
                <div className="relative z-10 p-8 flex flex-col gap-4 h-full justify-end">
                  <div>
                    <h3 className="font-headline-md text-2xl font-bold text-platinum mb-3">{service.text}</h3>
                    <p className="text-platinum/80 text-base line-clamp-3 font-body-md mb-4">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags?.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1.5 rounded-full bg-platinum/10 backdrop-blur-md text-platinum text-xs font-medium flex items-center gap-1.5 border border-platinum/10">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Button */}
                  <a href={service.link} className="mt-auto w-full py-4 bg-platinum/10 hover:bg-electric-indigo border border-platinum/20 text-platinum font-button text-sm font-semibold text-center rounded-full transition-all duration-300 shadow-lg backdrop-blur-md flex items-center justify-center gap-2 group-hover:border-electric-indigo">
                    Learn more
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
