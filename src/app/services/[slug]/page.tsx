import React, { use } from "react";
import NavBar from "../../components/NavBar";
import { services } from "../../../lib/constants";
import Image from "next/image";
import ContactButton from "../../components/ContactButton";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.link.split('/').pop(),
  }));
}

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Using React.use to unwrap params
  const unwrappedParams = use(params);
  const service = services.find((s) => s.link.endsWith(`/${unwrappedParams.slug}`));

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-platinum">
        <NavBar />
        <main className="flex-grow pt-[140px] flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Service not found</h1>
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
              {service.tags.join(" • ")}
            </span>
            <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] font-bold text-platinum mb-6">
              {service.text}
            </h1>
            <p className="font-body-lg text-platinum/90 text-2xl md:text-3xl font-medium max-w-4xl">
              {service.tagline}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 border border-platinum/10 shadow-2xl">
            <Image 
              src={service.image} 
              alt={service.text}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/60 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Main Description */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {service.fullDescription.map((paragraph, index) => (
                <p key={index} className="font-body-lg text-platinum/80 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Deliverables / Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-low border border-platinum/10 rounded-3xl p-8 sticky top-32 shadow-xl">
                <h3 className="font-headline-md text-2xl font-bold text-platinum mb-6">
                  {service.deliverablesHeading}
                </h3>
                <ul className="flex flex-col gap-4">
                  {service.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span 
                        className="material-symbols-outlined text-electric-indigo shrink-0" 
                        data-icon="check_circle"
                      >
                        check_circle
                      </span>
                      <span className="font-body-md text-platinum/90 text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-32 text-center bg-electric-indigo/5 border border-electric-indigo/20 rounded-3xl p-12 lg:p-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/10 to-shock-pink/10 opacity-50"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:text-4xl font-bold text-platinum mb-6">Ready to elevate your brand?</h2>
              <p className="font-body-md text-platinum/70 mb-10 text-lg">
                Let's discuss how our {service.text} services can help you achieve your business goals.
              </p>
              <ContactButton />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
