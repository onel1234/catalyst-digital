import React, { use } from "react";
import NavBar from "../../components/NavBar";
import { services } from "../../../lib/constants";
import Image from "next/image";

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
          <h1 className="text-4xl">Service not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-grow pt-[140px]">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-12">
          <span className="font-label-caps text-label-caps text-electric-indigo mb-4 block uppercase">
            SERVICE DETAIL
          </span>
          <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] md:text-[56px] lg:text-[64px] font-bold text-platinum mb-8">
            {service.text}
          </h1>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-platinum/10 shadow-2xl">
            <Image 
              src={service.image} 
              alt={service.text}
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-3xl">
            <p className="font-body-lg text-platinum/80 text-xl leading-relaxed">
              We provide exceptional {service.text.toLowerCase()} to help your brand grow and succeed in the modern digital landscape. Our approach is tailored to your unique needs, ensuring maximum impact and ROI.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
