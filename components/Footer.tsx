"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { footerContent, siteConfig } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");

    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterSuccess(true);
    trackEvent({
      name: "newsletter_subscribe",
      properties: { location: "footer" },
    });
  };

  return (
    <footer
      role="contentinfo"
      className="bg-charcoal text-sand-100 pt-20 pb-12 border-t border-charcoal-light"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8">
        {/* Top Newsletter & Brand Band */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.16em] uppercase text-white font-medium">
                Maison Oak
              </span>
            </Link>
            <p className="font-sans text-sm text-sand-200/80 max-w-sm leading-relaxed mb-6">
              {footerContent.tagline}
            </p>
            <div className="flex items-center gap-5">
              {footerContent.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-sand-200/70 hover:text-oak-light transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-oak"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 lg:pl-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-oak-light font-semibold block mb-2">
              The Atelier Journal
            </span>
            <p className="font-serif text-xl sm:text-2xl text-white font-normal mb-4">
              Receive seasonal collection releases and private preview invitations.
            </p>

            {newsletterSuccess ? (
              <div className="flex items-center gap-3 p-4 bg-white/10 border border-white/20 text-white text-xs uppercase tracking-wider">
                <Check size={18} className="text-oak-light" />
                <span>Thank you. You have been added to our private dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Newsletter email address"
                    className="flex-grow px-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-oak-light transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-sand-100 text-charcoal uppercase tracking-widest text-xs font-medium hover:bg-oak-light transition-colors flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-xs text-red-400 font-sans">{newsletterError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-16 border-b border-white/10">
          {footerContent.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-oak-light font-medium mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-sand-200/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>{footerContent.copyright}</p>
          <div className="flex items-center gap-6">
            {footerContent.legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
