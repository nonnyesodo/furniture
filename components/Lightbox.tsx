"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  isOpen: boolean;
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onSelectIndex,
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  // Keyboard navigation & accessibility focus trap
  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      return;
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus close button
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Tab") {
        // Simple focus trap
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery lightbox: ${currentItem.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Controls */}
      <div
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 text-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-oak-light">
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          {currentItem.category && (
            <span className="hidden sm:inline-block rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-white/60">
              {currentItem.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-oak"
            aria-label={isZoomed ? "Reset zoom" : "Zoom in"}
          >
            {isZoomed ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-oak"
            aria-label="Close gallery lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Area */}
      <div
        className="relative flex h-full w-full max-w-6xl items-center justify-center p-4 pt-16 pb-20 sm:p-8 sm:pt-20 sm:pb-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative max-h-full max-w-full overflow-hidden transition-all duration-300 ${
            isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            width={currentItem.width || 1600}
            height={currentItem.height || 1200}
            className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl transition-transform duration-300 select-none"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-oak"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-oak"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Caption Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-5 text-center text-white/90"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-serif text-base sm:text-lg tracking-wide text-white">
          {currentItem.caption || currentItem.alt}
        </p>
      </div>
    </div>
  );
}
