"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { images } from "@/lib/images";
import { heroContent } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const handleCtaClick = (label: string, targetHref: string) => {
    trackEvent({
      name: "cta_click",
      properties: { label, location: "hero_section", targetHref },
    });
  };

  return (
    <section
      aria-label="Welcome to Maison Oak"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* High-Resolution Full-Bleed Hero Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={90}
          className="object-cover object-[center_45%] animate-slow-zoom transition-transform duration-1000 will-change-transform"
          placeholder="blur"
          blurDataURL={images.hero.blurDataURL}
        />
        {/* Editorial soft dark gradient overlay for optimal 4.5:1 text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 py-32 sm:py-40 flex flex-col items-center text-center text-white">
        {/* Eyebrow */}
        <div className="mb-4 sm:mb-6 inline-flex items-center gap-2">
          <span className="h-px w-6 sm:w-10 bg-oak-light/80" />
          <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-oak-light font-medium">
            {heroContent.eyebrow}
          </span>
          <span className="h-px w-6 sm:w-10 bg-oak-light/80" />
        </div>

        {/* Headline with fluid clamp typography */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] max-w-5xl text-balance font-normal text-white drop-shadow-sm mb-6 sm:mb-8">
          {heroContent.headline}
        </h1>

        {/* Subhead */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed mb-10 sm:mb-12 text-balance">
          {heroContent.subhead}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA */}
          <a
            href={heroContent.primaryCta.href}
            onClick={() =>
              handleCtaClick(heroContent.primaryCta.label, heroContent.primaryCta.href)
            }
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#FAF8F5] text-charcoal font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-oak-light hover:text-charcoal hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
          >
            {heroContent.primaryCta.label}
          </a>

          {/* Secondary CTA */}
          <a
            href={heroContent.secondaryCta.href}
            onClick={() =>
              handleCtaClick(heroContent.secondaryCta.label, heroContent.secondaryCta.href)
            }
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-black/30 backdrop-blur-sm border border-white/70 text-white font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-white hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <a
        href="#statement"
        onClick={() => handleCtaClick("Scroll indicator", "#statement")}
        aria-label="Scroll to brand philosophy"
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/75 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
          {heroContent.scrollLabel}
        </span>
        <ChevronDown
          size={18}
          className="animate-bounce transition-transform group-hover:translate-y-1"
        />
      </a>
    </section>
  );
}
