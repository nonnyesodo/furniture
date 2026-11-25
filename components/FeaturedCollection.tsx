"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, X, ChevronRight, Eye } from "lucide-react";
import Reveal from "./Reveal";
import { images } from "@/lib/images";
import { trackEvent } from "@/lib/analytics";

type ProductType = (typeof images.products)[number];

export default function FeaturedCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductType | null>(null);
  const [modalImageMode, setModalImageMode] = useState<"primary" | "secondary">("primary");
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  const categories = ["All", "Seating", "Dining", "Storage", "Bedroom"];

  const filteredProducts =
    selectedCategory === "All"
      ? images.products
      : images.products.filter((p) => p.category === selectedCategory);

  const handleOpenDetails = (product: ProductType) => {
    setActiveModalProduct(product);
    setModalImageMode("primary");
    trackEvent({
      name: "cta_click",
      properties: {
        label: `View Details - ${product.name}`,
        location: "featured_collection",
        targetHref: "#details-modal",
      },
    });
  };

  // Keyboard accessibility for product modal
  useEffect(() => {
    if (activeModalProduct) {
      document.body.style.overflow = "hidden";
      modalCloseRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveModalProduct(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeModalProduct]);

  return (
    <section
      id="collection"
      aria-label="Featured Collection"
      className="py-24 sm:py-32 bg-[#FAF8F5] border-b border-sand-200/60"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal threshold={0.15} direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.25em] text-oak font-semibold block mb-3">
                Curated Selection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-tight font-normal">
                The 2026 Pieces
              </h2>
            </div>

            {/* Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter collection by room category"
              className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest transition-all rounded-full whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-oak ${
                    selectedCategory === cat
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

        {/* Product Cards Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {filteredProducts.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 80}
              threshold={0.1}
              direction="up"
              className="group flex flex-col h-full"
            >
              <article
                className="flex flex-col h-full bg-white p-4 sm:p-5 rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.08)] border border-sand-200/60"
                onMouseEnter={() =>
                  trackEvent({
                    name: "product_card_hover",
                    properties: { productId: product.id },
                  })
                }
              >
                {/* 4:5 Aspect Ratio Image Container with Hover Crossfade & Click to View */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenDetails(product)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenDetails(product);
                    }
                  }}
                  aria-label={`View details and photography for ${product.name}`}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-sand-200/50 mb-5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
                >
                  {/* Primary Image */}
                  <Image
                    src={product.primary.src}
                    alt={product.primary.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={product.primary.blurDataURL}
                    className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />

                  {/* Secondary Image (Alternate angle / craftsmanship detail) - Crossfade on hover */}
                  <Image
                    src={product.secondary.src}
                    alt={product.secondary.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={product.secondary.blurDataURL}
                    className="object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                  />

                  {/* Material Tag Badge */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-charcoal font-medium shadow-sm">
                      <Sparkles size={11} className="text-oak" />
                      {product.material}
                    </span>
                  </div>

                  {/* Hover "Alternate Angle" Hint */}
                  <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-[10px] uppercase tracking-widest text-white">
                      <Eye size={12} />
                      <span>Alternate Angle</span>
                    </span>
                  </div>
                </div>

                {/* Product Information */}
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3
                        onClick={() => handleOpenDetails(product)}
                        className="font-serif text-xl sm:text-2xl text-charcoal font-normal group-hover:text-oak transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <span className="font-serif text-base text-charcoal-light font-medium whitespace-nowrap">
                        {product.price}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-charcoal-muted leading-relaxed line-clamp-2 mb-4">
                      {product.descriptor}
                    </p>
                  </div>

                  {/* Card Footer: View Details CTA (PRD 7.4 requirement) */}
                  <div className="pt-4 border-t border-sand-200/80 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-charcoal-muted">
                      {product.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(product)}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-medium text-charcoal hover:text-oak transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
                    >
                      <span>View details</span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-oak"
                      />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Accessible Product Details & Zoom Lightbox Modal */}
      {activeModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Product details: ${activeModalProduct.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] shadow-2xl overflow-y-auto grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              ref={modalCloseRef}
              type="button"
              onClick={() => setActiveModalProduct(null)}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-20 p-2 text-charcoal hover:bg-sand-200 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
            >
              <X size={22} />
            </button>

            {/* Modal Left: High-Res Imagery with Toggle */}
            <div className="relative bg-sand-200/60 p-6 flex flex-col justify-between">
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-sm">
                <Image
                  src={
                    modalImageMode === "primary"
                      ? activeModalProduct.primary.src
                      : activeModalProduct.secondary.src
                  }
                  alt={
                    modalImageMode === "primary"
                      ? activeModalProduct.primary.alt
                      : activeModalProduct.secondary.alt
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center transition-all duration-500"
                />
              </div>

              {/* View Angle Switcher */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModalImageMode("primary")}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-all ${
                    modalImageMode === "primary"
                      ? "bg-charcoal text-white"
                      : "bg-white/80 text-charcoal hover:bg-white"
                  }`}
                >
                  Front Perspective
                </button>
                <button
                  type="button"
                  onClick={() => setModalImageMode("secondary")}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-all ${
                    modalImageMode === "secondary"
                      ? "bg-charcoal text-white"
                      : "bg-white/80 text-charcoal hover:bg-white"
                  }`}
                >
                  Detail & Joinery
                </button>
              </div>
            </div>

            {/* Modal Right: Specifications and Inquire Action */}
            <div className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-oak font-semibold block mb-2">
                  {activeModalProduct.category} · 2026 Collection
                </span>

                <h3 className="font-serif text-3xl text-charcoal font-normal mb-3">
                  {activeModalProduct.name}
                </h3>

                <p className="font-serif text-2xl text-oak-dark mb-6">
                  {activeModalProduct.price}
                </p>

                <p className="font-sans text-sm text-charcoal-muted leading-relaxed mb-6">
                  {activeModalProduct.descriptor}
                </p>

                {/* Specs Box */}
                <div className="border-t border-b border-sand-200 py-4 mb-6 space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted uppercase tracking-wider">Materials</span>
                    <span className="font-medium text-charcoal">{activeModalProduct.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted uppercase tracking-wider">Finish</span>
                    <span className="font-medium text-charcoal">Hand-rubbed organic plant oil</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted uppercase tracking-wider">Guarantee</span>
                    <span className="font-medium text-charcoal">10-Year Structural Warranty</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted uppercase tracking-wider">Origin</span>
                    <span className="font-medium text-charcoal">Copenhagen Atelier</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <a
                  href="#showroom"
                  onClick={() => {
                    setActiveModalProduct(null);
                    trackEvent({
                      name: "cta_click",
                      properties: {
                        label: `Inquire Modal - ${activeModalProduct.name}`,
                        location: "product_modal",
                        targetHref: "#showroom",
                      },
                    });
                  }}
                  className="w-full py-4 bg-charcoal text-sand-100 uppercase tracking-widest text-xs font-medium hover:bg-olive transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book Consultation for this Piece</span>
                  <ChevronRight size={15} />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-widest text-charcoal-muted hover:text-charcoal"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
