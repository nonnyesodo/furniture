"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { navigationLinks, siteConfig } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";
import SocialLinks from "./SocialLinks";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and handle Escape key for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
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
  }, [isMobileMenuOpen]);

  const handleNavClick = (label: string, href: string) => {
    trackEvent({
      name: "cta_click",
      properties: { label, location: "header_nav", targetHref: href },
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FAF8F5]/90 backdrop-blur-md text-charcoal shadow-sm border-b border-sand-200/60 py-4"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white py-6"
        }`}
      >
        <div className="max-w-site mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
            aria-label={`${siteConfig.name} - Home`}
          >
            <span
              className={`font-serif text-2xl sm:text-3xl tracking-[0.18em] uppercase font-medium transition-colors ${
                isScrolled ? "text-charcoal" : "text-white"
              }`}
            >
              Maison Oak
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.3em] font-sans transition-colors ${
                isScrolled ? "text-charcoal-muted" : "text-white/70"
              }`}
            >
              Atelier & Showroom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center space-x-8 lg:space-x-10"
          >
            {navigationLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.label, item.href)}
                className={`text-xs uppercase tracking-widest font-medium transition-colors duration-200 py-1 border-b border-transparent hover:border-oak focus:outline-none focus-visible:ring-2 focus-visible:ring-oak ${
                  isScrolled
                    ? "text-charcoal-light hover:text-charcoal"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Book a Visit */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#showroom"
              onClick={() => handleNavClick("Book a Visit", "#showroom")}
              className={`inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-oak ${
                isScrolled
                  ? "bg-charcoal text-sand-100 hover:bg-olive"
                  : "bg-white/95 text-charcoal hover:bg-white hover:shadow-lg backdrop-blur-sm"
              }`}
            >
              Book a Visit
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={`md:hidden p-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak ${
              isScrolled
                ? "text-charcoal hover:bg-sand-200"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-50 bg-[#FAF8F5] transition-all duration-500 ease-in-out md:hidden flex flex-col justify-between p-8 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex flex-col"
          >
            <span className="font-serif text-2xl tracking-[0.18em] uppercase text-charcoal">
              Maison Oak
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-charcoal-muted font-sans">
              Atelier & Showroom
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 text-charcoal hover:bg-sand-200 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
          >
            <X size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Mobile menu links" className="flex flex-col space-y-6 my-auto">
          {navigationLinks.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.label, item.href)}
              style={{ transitionDelay: `${index * 60}ms` }}
              className="group flex items-center justify-between py-2 border-b border-sand-200 text-charcoal font-serif text-3xl sm:text-4xl tracking-tight hover:text-oak transition-colors"
            >
              <span>{item.label}</span>
              <ArrowRight
                size={22}
                className="text-oak-light opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all"
              />
            </a>
          ))}
        </nav>

        {/* Mobile Footer Info & CTA */}
        <div className="flex flex-col space-y-6 pt-6 border-t border-sand-200">
          <a
            href="#showroom"
            onClick={() => handleNavClick("Book a Showroom Visit (Mobile)", "#showroom")}
            className="w-full text-center py-4 bg-charcoal text-sand-100 uppercase tracking-widest text-xs font-medium hover:bg-olive transition-colors"
          >
            Book a Showroom Visit
          </a>
          <div className="text-xs text-charcoal-muted space-y-1">
            <p className="font-medium text-charcoal">
              {siteConfig.contact.address.street}, {siteConfig.contact.address.city}, {siteConfig.contact.address.country}
            </p>
            <p>{siteConfig.contact.phone} · {siteConfig.contact.email}</p>
          </div>
          <SocialLinks
            socials={siteConfig.socials}
            variant="light"
            location="mobile_menu"
          />
        </div>
      </div>
    </>
  );
}
