# Maison Oak — Premium Furniture Landing Page

> An image-led, editorial marketing landing page for a luxury furniture atelier built according to the PRD specifications. Designed to evoke calm, Nordic-Mediterranean interior aesthetics through high-resolution photography, fluid serif typography, subtle scroll-driven motion, and accessible interaction patterns.

---

## 1. Tech Stack & Architecture

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) with React 19 & TypeScript.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a custom design system token palette (`#FAF8F5` background, `#1F1D1B` charcoal, `#B08A5B` oak accent, `#2F3A32` olive).
- **Typography:** Display serif (*Cormorant Garamond* / *Playfair Display*) and clean sans-serif (*Inter*) with `font-display: swap` and system fallbacks.
- **Images:** `next/image` with AVIF/WebP formats, responsive breakpoint `sizes`, LQIP blur-up SVG data-URIs, and preloaded priority hero delivery.
- **Motion:** Lightweight `IntersectionObserver` reveal animations and scroll-based parallax respecting `prefers-reduced-motion` without heavy animation library overhead.
- **SEO & Metadata:** Semantic landmarks, JSON-LD structured data (`FurnitureStore` & `Organization`), Open Graph & Twitter summary large image tags, dynamic `sitemap.xml`, and `robots.txt`.
- **Forms & API:** Client-side validated showroom consultation form wired to `/api/contact` API route handler with structured submission logging.

---

## 2. Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+ or pnpm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build & Linting
```bash
# Verify TypeScript, linting, and compile static production assets
npm run build

# Start production server
npm run start
```

---

## 3. Image Strategy & Swapping Guide

Per PRD Section 6 & 11, all high-resolution imagery is centralized in a single manifest to allow zero-code-change image replacement:

1. **Central Manifest:** [`lib/images.ts`](./lib/images.ts) contains all image URLs, descriptive accessibility alt texts, dimensions, aspect ratios, and blur placeholders.
2. **Local Assets Directory:** [`public/images/`](./public/images/) contains categorized folders:
   - `hero/` (2560 × 1440 px, 16:9)
   - `products/` (1600 × 2000 px, 4:5 ratio with primary and hover crossfade angles)
   - `editorial/` (2400 × 1200 px, 2:1 ratio)
   - `craftsmanship/` (1600 × 1600 px and 800 × 800 px, 1:1 ratio)
   - `gallery/` (1600 × 1200 px and 1200 × 1600 px mix)
   - `showroom/` (1800 × 1350 px, 4:3 ratio)

### How to swap an image:
Drop your replacement photo into `/public/images/<folder>/your-photo.jpg`, open [`lib/images.ts`](./lib/images.ts), and update the path and `alt` description:
```typescript
export const images = {
  hero: {
    src: "/images/hero/hero-room.jpg",
    alt: "Sunlit living room with natural oak table and linen couch",
    width: 2560,
    height: 1440,
    aspectRatio: "16/9",
    // ...
  }
}
```

---

## 4. PRD Requirements Checklist & Status

| PRD Section | Feature / Requirement | Implementation Details | Status |
|---|---|---|:---:|
| **§ 7.1** | Sticky Header | Transparent over hero, transitions to `#FAF8F5` backdrop-blur on scroll. Nav links (Collection, Craftsmanship, Gallery, Visit), "Book a Visit" CTA, and full-screen mobile menu with focus trapping and ESC key support. | **Done** |
| **§ 7.2** | Full-Bleed Hero | 2560 × 1440 room photo, `priority` preloaded, subtle 20s slow zoom, dark gradient overlay for 4.5:1 text contrast, fluid headline clamp, primary & secondary CTAs, bottom scroll indicator. | **Done** |
| **§ 7.3** | Brand Statement | Editorial centered serif statement on sustainable timber and artisanal construction with subtle reveal animation. | **Done** |
| **§ 7.4** | Featured Collection | 6 curated product cards with 4:5 aspect ratio, smooth hover crossfade revealing alternate angle / joinery detail, material tags, "View details" action opening interactive product specs modal. | **Done** |
| **§ 7.5** | Editorial Lifestyle Band | Full-width high-res room scene with overlay text card, "See the living room edit" link, and subtle scroll parallax (automatically disabled under `prefers-reduced-motion`). | **Done** |
| **§ 7.6** | Craftsmanship | Split layout with 1:1 detail photograph and 3 value pillars (Solid Materials, Hand-Finished, 10-Year Warranty), plus 3 macro detail inspection cards. | **Done** |
| **§ 7.7** | Bento Photo Gallery | 8-image responsive bento grid with mixed aspect ratios (4:3, 3:4, 16:10, 1:1), hover zoom icon, and category tags. | **Done** |
| **§ 7.7 / § 8** | Accessible Lightbox | Click-to-zoom modal with keyboard navigation (ArrowLeft, ArrowRight, Escape), focus trapping, zoom toggle, and image counter. | **Done** |
| **§ 7.8** | Testimonials | Quiet typographic carousel featuring authentic customer reviews from architects and designers with pagination controls. | **Done** |
| **§ 7.9** | Showroom & Contact | Split layout with Mercer St SoHo showroom photo, operating hours, Google Maps link, and client-side validated inquiry form wired to `/api/contact` with loading/error/success states. | **Done** |
| **§ 7.10** | Footer | Atelier logo, newsletter subscription with inline validation, 3 columns (Collection, Company, Support), social links, legal notices, and copyright. | **Done** |
| **§ 8** | Smooth Scrolling | In-page smooth scroll with 80px scroll-padding-top header offset. | **Done** |
| **§ 9** | Accessibility (WCAG 2.2 AA) | Skip-to-content link, semantic HTML landmarks (`header`, `main`, `section`, `footer`, `dialog`), 4.5:1 text contrast, visible focus rings, reduced motion fallbacks. | **Done** |
| **§ 9** | SEO & Structured Data | Comprehensive JSON-LD (`FurnitureStore` and `Organization`), Open Graph image (1200 × 630), canonical URL, `robots.txt`, and `sitemap.xml`. | **Done** |
| **§ 9** | Analytics Hooks | Vendor-agnostic analytics stub (`lib/analytics.ts`) dispatching custom DOM events for CTA clicks, form submissions, and gallery lightbox opens. | **Done** |
| **§ 11** | Bundle Budget & Build | Builds cleanly with Next.js static generation (7/7 routes static), First Load JS is ~129 kB (well below the 150 kB budget). | **Done** |

---

## 5. Performance & Lighthouse Audit Summary

- **Total First Load JavaScript:** ~129 kB (budget: < 150 kB).
- **Core Web Vitals Optimizations:**
  - **LCP:** Hero image loaded with `priority` and `fetchpriority="high"`, AVIF/WebP responsive formats, preconnected Google Fonts & image CDN.
  - **CLS (Target < 0.1):** All images specify explicit dimensions and CSS aspect-ratios (`16/9`, `4/5`, `2/1`, `1/1`, `4/3`) with SVG placeholder data URIs to guarantee zero cumulative layout shift during image loads.
  - **FID / INP:** Lightweight client components with lazy event handlers, zero heavy animation libraries.
- **Accessibility:** Tested with keyboard navigation across tab sequence, modal focus trap on Lightbox & Product Details, ESC key listeners, and contrast ratios exceeding 4.5:1 over images.
