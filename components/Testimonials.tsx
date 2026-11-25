"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { testimonialsContent } from "@/lib/content";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quotes = testimonialsContent.quotes;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <section
      aria-label="Customer Testimonials"
      className="py-24 sm:py-32 bg-sand-100 border-b border-sand-200/60"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8">
        <Reveal threshold={0.15} direction="up">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Section Eyebrow */}
            <span className="text-[11px] uppercase tracking-[0.25em] text-oak font-semibold block mb-4">
              {testimonialsContent.eyebrow}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-tight font-normal mb-12 sm:mb-16">
              {testimonialsContent.headline}
            </h2>

            {/* Quiet Typographic Quote Card */}
            <div className="relative w-full min-h-[220px] flex flex-col justify-center items-center">
              <Quote
                size={40}
                className="text-sand-300 mb-6 -rotate-12 select-none"
                aria-hidden="true"
              />

              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal font-normal leading-relaxed text-balance max-w-3xl mb-8">
                &ldquo;{quotes[currentIndex].quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center">
                <cite className="not-italic font-sans text-sm font-semibold tracking-wide text-charcoal">
                  {quotes[currentIndex].author}
                </cite>
                <span className="text-xs text-charcoal-muted font-sans mt-0.5">
                  {quotes[currentIndex].role} · {quotes[currentIndex].city}
                </span>
              </div>
            </div>

            {/* Typographic Pagination & Navigation Controls */}
            <div className="flex items-center gap-6 mt-12">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-sand-200 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {quotes.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      currentIndex === idx ? "w-8 bg-charcoal" : "w-2 bg-sand-300 hover:bg-charcoal-muted"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-sand-200 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
