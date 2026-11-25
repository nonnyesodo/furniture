"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Compass, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import { images } from "@/lib/images";
import { craftsmanshipContent } from "@/lib/content";

export default function Craftsmanship() {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="text-oak" size={24} />;
      case 1:
        return <Sparkles className="text-oak" size={24} />;
      case 2:
      default:
        return <ShieldCheck className="text-oak" size={24} />;
    }
  };

  return (
    <section
      id="craftsmanship"
      aria-label="Atelier Craftsmanship"
      className="py-24 sm:py-32 bg-[#FAF8F5] border-b border-sand-200/60"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal threshold={0.15} direction="up">
          <div className="max-w-2xl mb-16 sm:mb-20">
            <span className="text-[11px] uppercase tracking-[0.25em] text-oak font-semibold block mb-3">
              {craftsmanshipContent.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-tight font-normal mb-4">
              {craftsmanshipContent.headline}
            </h2>
            <p className="font-sans text-base sm:text-lg text-charcoal-muted leading-relaxed">
              {craftsmanshipContent.subhead}
            </p>
          </div>
        </Reveal>

        {/* Split Layout: Left Large 1:1 Detail Photo, Right 3 Value Points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          {/* Left: Large 1:1 Detail Photo */}
          <div className="lg:col-span-6">
            <Reveal threshold={0.15} direction="left">
              <div className="relative aspect-square w-full overflow-hidden bg-sand-200 shadow-lg">
                <Image
                  src={images.craftsmanship.main.src}
                  alt={images.craftsmanship.main.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={images.craftsmanship.main.blurDataURL}
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 text-white text-xs font-sans">
                  <p className="font-serif text-sm tracking-wide text-white">Hand-Rubbed Finish</p>
                  <p className="text-white/70">Solid European white oak dining plank, Copenhagen Atelier</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Three Value Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-10">
            {craftsmanshipContent.values.map((val, idx) => (
              <Reveal
                key={val.numeral}
                delay={idx * 100}
                threshold={0.15}
                direction="right"
              >
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-sand-200/80 text-charcoal border border-sand-300/40 group-hover:border-oak transition-colors">
                    {getIcon(idx)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-oak font-semibold tracking-wider">
                        {val.numeral}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal">
                        {val.title}
                      </h3>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Row of 3 Macro Detail Images */}
        <div className="pt-8 border-t border-sand-200">
          <div className="mb-8">
            <h3 className="font-serif text-xl text-charcoal font-normal">
              Macro Details & Material Precision
            </h3>
            <p className="text-xs uppercase tracking-widest text-charcoal-muted">
              Inspect the tolerances and tactile textures up close
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {images.craftsmanship.details.map((detail, index) => (
              <Reveal
                key={detail.id}
                delay={index * 100}
                threshold={0.1}
                direction="up"
              >
                <div className="group bg-white p-4 rounded-sm border border-sand-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-square w-full overflow-hidden bg-sand-200 mb-4">
                    <Image
                      src={detail.src}
                      alt={detail.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={85}
                      placeholder="blur"
                      blurDataURL={detail.blurDataURL}
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-serif text-lg text-charcoal font-normal mb-1">
                    {detail.title}
                  </h4>
                  <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
                    {detail.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
