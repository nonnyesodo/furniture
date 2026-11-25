"use client";

import React from "react";
import Reveal from "./Reveal";
import { brandStatement } from "@/lib/content";

export default function BrandStatement() {
  return (
    <section
      id="statement"
      aria-label="Brand Philosophy"
      className="relative bg-[#FAF8F5] py-28 sm:py-36 lg:py-44 border-b border-sand-200/60"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8">
        <Reveal threshold={0.2} direction="up">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Small uppercase letter-spaced label */}
            <span className="text-[11px] uppercase tracking-[0.3em] text-oak font-semibold mb-6 sm:mb-8">
              {brandStatement.eyebrow}
            </span>

            {/* Centered large serif quotation */}
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-normal leading-[1.4] sm:leading-[1.45] text-balance mb-8">
              &ldquo;{brandStatement.quote}&rdquo;
            </blockquote>

            {/* Subtle Atelier mark / attribution */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-oak/60" />
              <cite className="not-italic text-xs uppercase tracking-[0.2em] text-charcoal-muted font-sans font-medium">
                {brandStatement.attribution}
              </cite>
              <span className="h-px w-8 bg-oak/60" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
