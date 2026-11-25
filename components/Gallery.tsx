"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import Reveal from "./Reveal";
import Lightbox, { LightboxItem } from "./Lightbox";
import { images } from "@/lib/images";
import { trackEvent } from "@/lib/analytics";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories = ["All", "Living", "Dining", "Bedroom", "Details"];

  const filteredItems =
    activeCategory === "All"
      ? images.gallery
      : images.gallery.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    const item = filteredItems[index];
    trackEvent({
      name: "gallery_lightbox_open",
      properties: {
        imageId: item.id,
        imageTitle: item.caption,
      },
    });
  };

  // Map to LightboxItem format
  const lightboxItems: LightboxItem[] = filteredItems.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    category: item.category,
    width: item.width,
    height: item.height,
  }));

  return (
    <section
      id="gallery"
      aria-label="Photo Gallery"
      className="py-24 sm:py-32 bg-[#FAF8F5] border-b border-sand-200/60"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal threshold={0.15} direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-oak font-semibold block mb-3">
                Atmosphere & Spaces
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-tight font-normal">
                In Situ
              </h2>
            </div>

            {/* Gallery Category Filter */}
            <div
              role="tablist"
              aria-label="Filter gallery images by room type"
              className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest transition-all rounded-full whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-oak ${
                    activeCategory === cat
                      ? "bg-charcoal text-sand-100 shadow-sm"
                      : "bg-sand-200/70 text-charcoal-muted hover:text-charcoal hover:bg-sand-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Bento / Masonry Responsive Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            // Give varied span patterns to create editorial bento rhythm
            const isWide = index === 0 || index === 6;
            const spanClass = isWide ? "sm:col-span-2 lg:col-span-2" : "col-span-1";

            return (
              <Reveal
                key={item.id}
                delay={index * 60}
                threshold={0.1}
                direction="up"
                className={spanClass}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenLightbox(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenLightbox(index);
                    }
                  }}
                  aria-label={`Open photo in lightbox: ${item.caption || item.alt}`}
                  className="group relative w-full h-[360px] sm:h-[420px] overflow-hidden bg-sand-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-oak"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      isWide
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    quality={85}
                    placeholder="blur"
                    blurDataURL={item.blurDataURL}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />

                  {/* Hover Caption & Zoom Icon */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300">
                    <div className="flex justify-end">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-transform group-hover:scale-110">
                        <ZoomIn size={18} />
                      </span>
                    </div>

                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] uppercase tracking-widest text-oak-light font-medium block mb-1">
                        {item.category}
                      </span>
                      <p className="font-serif text-lg sm:text-xl text-white font-normal">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={lightboxItems}
        currentIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={(index) => setActiveImageIndex(index)}
      />
    </section>
  );
}
