/**
 * Content copy for Maison Oak Landing Page
 * All editorial copy and site configuration in one central place.
 */

export interface SocialLink {
  id:
    | "instagram"
    | "facebook"
    | "x"
    | "linkedin"
    | "pinterest"
    | "tiktok"
    | "youtube"
    | "whatsapp";
  name: string;
  handle: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@maisonoak.ng",
    href: "https://instagram.com/maisonoak.ng",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Maison Oak Nigeria",
    href: "https://facebook.com/maisonoakng",
  },
  {
    id: "x",
    name: "X",
    handle: "@maisonoak_ng",
    href: "https://x.com/maisonoak_ng",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Maison Oak Atelier",
    href: "https://linkedin.com/company/maisonoak-ng",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    handle: "maisonoakng",
    href: "https://pinterest.com/maisonoakng",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@maisonoak.ng",
    href: "https://tiktok.com/@maisonoak.ng",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "Maison Oak Atelier",
    href: "https://youtube.com/@maisonoakng",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+234 809 555 0184",
    href: "https://wa.me/2348095550184?text=Hello%20Maison%20Oak%2C%20I%20would%20like%20to%20inquire%20about%20your%20furniture%20collection.",
  },
];

export const siteConfig = {
  name: "Maison Oak",
  legalName: "Maison Oak Furniture Atelier Ltd.",
  tagline: "Furniture made to be lived in.",
  description:
    "Handcrafted furniture built in Nigeria from sustainably harvested hardwoods, European white oak, and natural textiles. Designed for longevity, calm living, and generations of everyday rituals.",
  url: "https://maisonoak.com",
  ogImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&h=630&q=85",
  socials: socialLinks,
  contact: {
    email: "concierge@maisonoak.com",
    phone: "+234 809 555 0184",
    address: {
      street: "14 Adeola Odeku Street, Victoria Island",
      city: "Lagos",
      region: "LA",
      postalCode: "101241",
      country: "Nigeria",
      mapUrl: "https://maps.google.com/?q=14+Adeola+Odeku+Street+Victoria+Island+Lagos+Nigeria",
    },
    hours: [
      { days: "Tuesday – Saturday", time: "10:00 AM – 6:00 PM WAT" },
      { days: "Sunday", time: "12:00 PM – 5:00 PM WAT" },
      { days: "Monday", time: "Private Appointments Only" },
    ],
  },
};

export const navigationLinks = [
  { label: "Collection", href: "#collection" },
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#showroom" },
];

export const heroContent = {
  eyebrow: "The 2026 Collection",
  headline: "Furniture made to be lived in.",
  subhead:
    "Rooted in Nordic quietude and Mediterranean warmth. Timeless pieces shaped by hand from responsibly harvested European white oak and tactile heritage textiles.",
  primaryCta: {
    label: "Explore the Collection",
    href: "#collection",
  },
  secondaryCta: {
    label: "Book a Showroom Visit",
    href: "#showroom",
  },
  scrollLabel: "Scroll to explore",
};

export const brandStatement = {
  eyebrow: "Our Philosophy",
  quote:
    "We believe true luxury is quiet, tactile, and made to endure. Every joint, grain, and contour is shaped by master artisans from sustainably harvested timbers—built not just for today's space, but for generations of living.",
  attribution: "Maison Oak Atelier · Victoria Island, Lagos",
};

export const editorialBandContent = {
  eyebrow: "The Living Room Edit",
  headline: "Spaces designed for slow living and enduring memories.",
  description:
    "From low-profile sofas tailored in Belgian linen to solid oak coffee tables finished with organic oils, explore our coordinated pieces designed to bring balance and warmth to your home.",
  cta: {
    label: "See the living room edit",
    href: "#collection",
  },
};

export const craftsmanshipContent = {
  eyebrow: "Honest Construction",
  headline: "Crafted without shortcuts.",
  subhead:
    "Every piece begins with whole logs of slow-grown European white oak, dried over twelve months to ensure dimensional stability. We practice traditional cabinetmaking techniques that honor the material.",
  values: [
    {
      numeral: "01",
      title: "Solid Materials Only",
      description:
        "FSC-certified European white oak and American walnut. Never composite boards, synthetic veneers, or fleeting trends.",
    },
    {
      numeral: "02",
      title: "Hand-Finished with Natural Oils",
      description:
        "Three hand-rubbed applications of organic plant wax and linseed oils preserve the natural breathability and tactile warmth of the grain.",
    },
    {
      numeral: "03",
      title: "10-Year Structural Guarantee",
      description:
        "Traditional mortise-and-tenon and precision dovetail joinery engineered to withstand everyday life for decades to come.",
    },
  ],
};

export const testimonialsContent = {
  eyebrow: "Living with Maison Oak",
  headline: "Enduring pieces in real homes.",
  quotes: [
    {
      id: "quote-1",
      quote:
        "The Soren dining table has become the soulful center of our home. After two years of morning coffees, family dinners, and weekend gatherings, the oak has developed the most gorgeous subtle patina.",
      author: "Tunde Bakare",
      role: "Principal Architect",
      city: "Lagos",
    },
    {
      id: "quote-2",
      quote:
        "As an interior designer, I am extremely demanding about timber joinery and upholstery lines. Maison Oak achieves the rare balance of architectural rigor and deeply comfortable living.",
      author: "Amaka Okafor",
      role: "Interior Designer",
      city: "Abuja",
    },
    {
      id: "quote-3",
      quote:
        "The Arlo chair arrived impeccably finished. You can immediately feel the weight and silky touch of solid timber that was cared for by a true craftsperson. Truly heirloom quality.",
      author: "Damilola Adeyemi",
      role: "Creative Director",
      city: "Ikoyi, Lagos",
    },
  ],
};

export const contactFormOptions = {
  interestOptions: [
    { value: "", label: "Select your primary interest" },
    { value: "living", label: "Living Room Collection" },
    { value: "dining", label: "Dining Tables & Seating" },
    { value: "bedroom", label: "Bedroom Suite & Storage" },
    { value: "showroom", label: "Private Showroom Consultation" },
    { value: "trade", label: "Trade & Architectural Specification" },
    { value: "custom", label: "Bespoke Sizing Request" },
  ],
};

export const footerContent = {
  tagline: "Enduring furniture handcrafted for quiet, beautiful living.",
  columns: [
    {
      title: "Collection",
      links: [
        { label: "Living Room", href: "#collection" },
        { label: "Dining Tables", href: "#collection" },
        { label: "Lounge Seating", href: "#collection" },
        { label: "Bedroom & Storage", href: "#collection" },
        { label: "Care & Maintenance", href: "#craftsmanship" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our Story", href: "#" },
        { label: "Craftsmanship", href: "#craftsmanship" },
        { label: "Sustainability", href: "#" },
        { label: "Trade Program", href: "#showroom" },
        { label: "Press & Publications", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Showroom & Appointments", href: "#showroom" },
        { label: "10-Year Warranty", href: "#craftsmanship" },
        { label: "Care & Timber Maintenance", href: "#craftsmanship" },
        { label: "concierge@maisonoak.com", href: "mailto:concierge@maisonoak.com" },
        { label: "+234 809 555 0184", href: "tel:+2348095550184" },
      ],
    },
  ],
  socials: socialLinks,
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "10-Year Warranty", href: "#" },
  ],
  copyright: "© 2026 Maison Oak Furniture Atelier Ltd. Lagos, Nigeria. All rights reserved.",
};
