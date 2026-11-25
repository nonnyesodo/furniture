"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number; // in milliseconds
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.05,
  direction = "up",
  duration = 600,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion or if IntersectionObserver is unsupported, reveal immediately
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const currentRef = domRef.current;
    if (!currentRef) {
      setIsVisible(true);
      return;
    }

    // Fallback timer: ensure element is revealed even if observer is throttled
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 600 + delay);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            clearTimeout(fallbackTimer);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: "80px 0px 80px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      clearTimeout(fallbackTimer);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, delay]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 28px, 0)";
      case "down":
        return "translate3d(0, -28px, 0)";
      case "left":
        return "translate3d(28px, 0, 0)";
      case "right":
        return "translate3d(-28px, 0, 0)";
      case "none":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
