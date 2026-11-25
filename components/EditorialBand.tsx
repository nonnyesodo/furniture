"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { images } from "@/lib/images";
import { editorialBandContent } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export default function EditorialBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top <= windowHeight && rect.bottom >= 0) {
              const centerOffset = (rect.top + rect.height / 2) - windowHeight / 2;
              setOffsetY(centerOffset * 0.12);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaClick = () => {
    trackEvent({
      name: "cta_click",
      properties: {
        label: editorialBandContent.cta.label,
        location: "editorial_band",
        targetHref: editorialBandContent.cta.href,
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Editorial Living Room Edit"
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-sand-200"
    >
      {/* High-Resolution Editorial Background Image with Subtle Parallax */}
      <div className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translate3d(0, ${offsetY}px, 0)`,
          }}
        >
          <Image
            src={images.editorialBand.src}
            alt={images.editorialBand.alt}
            fill
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL={images.editorialBand.blurDataURL}
            className="object-cover object-center"
          />
        </div>

        {/* Soft dark vignette & gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"
        />

        {/* Editorial Text Overlay Card */}
        <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 py-16 w-full flex justify-end">
          <Reveal threshold={0.2} direction="up" className="w-full max-w-xl">
            <div className="bg-[#FAF8F5]/95 backdrop-blur-md p-8 sm:p-12 shadow-2xl border border-white/60">
              <span className="text-[11px] uppercase tracking-[0.25em] text-oak font-semibold block mb-4">
                {editorialBandContent.eyebrow}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-normal leading-tight mb-4">
                {editorialBandContent.headline}
              </h2>

              <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8">
                {editorialBandContent.description}
              </p>

              <a
                href={editorialBandContent.cta.href}
                onClick={handleCtaClick}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-charcoal text-sand-100 uppercase tracking-widest text-xs font-medium hover:bg-olive transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
              >
                <span>{editorialBandContent.cta.label}</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
