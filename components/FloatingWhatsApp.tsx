"use client";

import React from "react";
import { siteConfig } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const whatsappSocial = siteConfig.socials.find((s) => s.id === "whatsapp");
  const href =
    whatsappSocial?.href ||
    `https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`;

  const handleClick = () => {
    trackEvent({
      name: "cta_click",
      properties: {
        label: "Floating WhatsApp Concierge",
        location: "floating_whatsapp",
        targetHref: href,
      },
    });
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={`Chat with Maison Oak on WhatsApp (${siteConfig.contact.phone})`}
        className="group flex items-center gap-3 rounded-full bg-charcoal text-sand-100 p-3 sm:pr-5 sm:pl-3.5 sm:py-3 shadow-[0_10px_30px_rgba(31,29,27,0.28)] border border-white/15 hover:bg-charcoal-light hover:shadow-[0_14px_34px_rgba(31,29,27,0.36)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.391c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2.016 1.438-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.328-1.766-.656-3.094-1.344-5.109-4.469-5.266-4.672-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.313.625-.391.828-.391.203 0 .406.016.594.016.188 0 .453-.078.703.531.266.625.891 2.172.969 2.328.078.156.125.344.016.547-.109.203-.156.344-.313.516-.156.172-.328.391-.469.531-.156.156-.313.328-.141.641.172.313.781 1.297 1.672 2.094 1.156 1.031 2.125 1.344 2.438 1.5.313.156.484.125.672-.078.188-.203.781-.906.984-1.219.203-.313.406-.266.688-.156.281.109 1.797.844 2.109 1 .313.156.516.234.594.359.078.125.078.734-.172 1.438z" />
          </svg>
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#25D366] ring-2 ring-charcoal animate-pulse"
          />
        </span>

        <span className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[10px] uppercase tracking-[0.2em] text-oak-light font-semibold">
            Concierge
          </span>
          <span className="text-xs font-sans font-medium tracking-wide text-white">
            Chat on WhatsApp
          </span>
        </span>
      </a>
    </div>
  );
}
