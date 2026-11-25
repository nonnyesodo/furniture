# PRD: Furniture Landing Page

**Audience:** Codex (AI coding agent) · **Type:** Single-page marketing site · **Version:** 1.0

## 1. Overview

Build a premium, image-led landing page for a furniture brand. The page's job is to make visitors feel the quality of the pieces through large, high-resolution photography, then move them to a clear action (browse the collection, book a showroom visit, or request a quote). The design should feel calm, editorial, and spacious, like a high-end interiors magazine.

**Assumptions (replace as needed):** Brand name is a placeholder ("Maison Oak"). Products are living room, dining, and bedroom furniture. No e-commerce checkout; the CTA leads to a collection section and a contact form.

## 2. Goals and Success Metrics

- Convey premium quality within the first 3 seconds using a full-bleed hero image.
- Drive visitors to the primary CTA ("Explore the Collection") and the secondary CTA ("Book a Showroom Visit").
- Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95 on mobile.
- Largest Contentful Paint under 2.5s on a mid-tier mobile connection, despite image-heavy content.
- Cumulative Layout Shift under 0.1.

## 3. Target Users

- Homeowners (28–55) furnishing or refreshing a space, comparing brands visually.
- Interior designers and architects looking for quality pieces to specify.
- Visitors arriving mostly from mobile (social, ads) and desktop (search).

## 4. Tech Stack and Constraints

- **Framework:** Next.js (App Router) with TypeScript and Tailwind CSS. If a lighter approach is preferred, plain HTML/CSS/JS is acceptable, but keep the same structure.
- **Images:** Use `next/image` (or `<picture>` with `srcset`/`sizes`) for responsive, lazy-loaded delivery. Serve AVIF/WebP with a JPEG fallback.
- **Fonts:** One serif display font (e.g., Cormorant Garamond or Playfair Display) and one clean sans-serif (e.g., Inter). Self-host or use `next/font`. Use `font-display: swap`.
- **No heavy libraries.** Animations via CSS and IntersectionObserver; Framer Motion is optional but keep the bundle lean.
- **Browser support:** Latest two versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome.

## 5. Design Direction

- **Mood:** Warm, minimal, editorial, tactile (wood grain, linen, leather).
- **Palette:** Warm off-white background (#FAF8F5), charcoal text (#1F1D1B), muted oak/sand accent (#B08A5B), deep olive or ink as a secondary accent (#2F3A32).
- **Typography:** Large serif headlines (clamp-based fluid sizing, roughly 40–96px), small uppercase letter-spaced labels, 16–18px body text with generous line height (1.6).
- **Layout:** Generous whitespace, 12-column grid, max content width 1280px, full-bleed imagery where it matters.
- **Imagery first:** Photos carry the design. Avoid decorative clutter, heavy borders, and stock icons.
- **Motion:** Subtle fade-up on scroll, slow zoom (1.0 → 1.05) on hero image, gentle hover scale on product cards. Respect `prefers-reduced-motion`.

## 6. Image Requirements (High Resolution)

High-resolution imagery is the core of this page. Treat it as a first-class requirement.

| Use | Min source size | Aspect ratio | Notes |
| --- | --- | --- | --- |
| Hero | 2560 × 1440 px | 16:9 (crop 4:5 on mobile) | Full-bleed lifestyle room shot |
| Featured collection cards | 1600 × 2000 px | 4:5 | Single hero piece per card |
| Editorial / lifestyle bands | 2400 × 1200 px | 2:1 | Full-width room scenes |
| Detail / craftsmanship shots | 1600 × 1600 px | 1:1 | Close-ups of joinery, fabric, grain |
| Gallery grid | 1600 × 1200 px | 4:3 and 3:4 mix | Masonry or bento layout |

**Implementation rules:**

- Generate responsive widths (e.g., 480, 768, 1080, 1440, 1920, 2560) and set accurate `sizes` attributes so mobile never downloads desktop images.
- Hero image uses `priority` / `fetchpriority="high"`, is preloaded, and is NOT lazy-loaded. All other images are lazy-loaded.
- Reserve space with explicit `width`/`height` or `aspect-ratio` to prevent layout shift. Use a blurred low-quality placeholder (blur-up) or dominant color.
- Use `object-fit: cover` with deliberate `object-position` so furniture stays in frame when cropped.
- Write meaningful, descriptive `alt` text for every image (e.g., "Walnut dining table with six linen-upholstered chairs in a sunlit room"). Decorative images use `alt=""`.
- Provide a `/public/images/` folder structure and a clear placeholder strategy: until real photos are supplied, use high-quality placeholders from Unsplash (credit as needed) with a single config file (`images.ts`) so assets can be swapped in one place.
- Optional: click-to-zoom lightbox on gallery and product images that loads the full-resolution version on demand.

## 7. Page Structure and Content

### 7.1 Header (sticky)

Logo (left), nav links (Collection, Craftsmanship, Gallery, Visit), primary button "Book a Visit" (right). Transparent over the hero, switches to solid off-white with a subtle shadow after scrolling. Mobile: hamburger opening a full-screen menu.

### 7.2 Hero

Full-viewport, full-bleed high-resolution room photograph with a soft dark gradient overlay for text legibility.

- Eyebrow: "The 2026 Collection"
- Headline: "Furniture made to be lived in."
- Subhead: one sentence about craftsmanship and timeless design.
- CTAs: "Explore the Collection" (primary), "Book a Showroom Visit" (secondary, outlined).
- Subtle scroll indicator at the bottom.

### 7.3 Brand Statement

Short centered paragraph (2–3 lines, large serif) about the philosophy: responsibly sourced materials, handcrafted, built to last generations.

### 7.4 Featured Collection

Grid of 3–6 product cards (sofa, dining table, armchair, bed, sideboard, lounge chair). Each card: large 4:5 image, product name, short descriptor, material tag, "View details" link. Hover reveals a second image (alternate angle or detail) with a smooth crossfade.

### 7.5 Editorial Lifestyle Band

Full-width high-resolution room scene with overlaid short text and a link ("See the living room edit"). Include subtle parallax (disabled with reduced motion).

### 7.6 Craftsmanship

Split layout: left a large detail photograph (joinery, grain, stitching), right three short value points with icons or numerals: Solid Materials, Hand-Finished, 10-Year Warranty. Optionally a row of 3 small macro detail images.

### 7.7 Gallery

Responsive masonry or bento grid of 8–12 images with mixed aspect ratios. Click opens a lightbox with keyboard navigation (arrows, Esc) and focus trapping.

### 7.8 Testimonials

Two or three short customer quotes with name and city. Simple carousel or static row. Keep it quiet and typographic.

### 7.9 Showroom and Contact CTA

Split section: left a showroom photo plus address, hours, and map link; right a short form (Name, Email, Phone optional, Interest dropdown, Message) with client-side validation and a success state. Wire the form to a placeholder endpoint (`/api/contact`) that logs the submission and returns success, with a clear TODO for the real integration.

### 7.10 Footer

Logo, short tagline, link columns (Collection, Company, Support), social icons, newsletter email field, legal links, copyright.

## 8. Functional Requirements

1. Smooth in-page anchor scrolling with offset for the sticky header.
2. Scroll-triggered reveal animations using IntersectionObserver.
3. Lightbox for gallery with accessible controls.
4. Contact form with validation, loading state, error state, and success state.
5. Mobile navigation menu with focus management and Esc to close.
6. Sticky header state change on scroll.

## 9. Non-Functional Requirements

- **Responsive:** Breakpoints at 640, 768, 1024, 1280, 1536px. Mobile-first. No horizontal scroll at any width.
- **Accessibility (WCAG 2.2 AA):** Semantic landmarks, visible focus states, 4.5:1 text contrast (check text over images), keyboard-operable everything, `prefers-reduced-motion` support, skip-to-content link.
- **Performance:** Preload hero and primary font, avoid render-blocking resources, defer non-critical JS, total JS under \~150KB gzipped, set long cache headers for images.
- **SEO:** Title and meta description, Open Graph and Twitter card tags (with a high-res OG image at 1200 × 630), semantic headings (one `h1`), JSON-LD for `Organization` and `FurnitureStore`, sitemap and robots.txt.
- **Analytics hooks:** Include a stub for tracking CTA clicks and form submissions (no vendor lock-in).

## 10. Suggested File Structure

```
/app
  layout.tsx
  page.tsx
  /api/contact/route.ts
/components
  Header.tsx  Hero.tsx  BrandStatement.tsx  FeaturedCollection.tsx
  EditorialBand.tsx  Craftsmanship.tsx  Gallery.tsx  Lightbox.tsx
  Testimonials.tsx  ContactSection.tsx  Footer.tsx  Reveal.tsx
/lib
  images.ts   // central image manifest (src, alt, width, height, blur)
  content.ts  // all copy in one place
/public/images/...
```

## 11. Acceptance Criteria

- Page renders all sections above with the specified content and layout on mobile, tablet, and desktop.
- Hero image loads first without layout shift; all below-the-fold images lazy-load.
- No image is visibly pixelated on a 4K or retina display at its largest rendered size.
- Lighthouse mobile targets in Section 2 are met.
- Keyboard-only users can navigate the full page, open and close the lightbox, and submit the form.
- Swapping any image requires editing only `images.ts` and dropping a file in `/public/images`.
- No console errors or warnings; builds cleanly with `npm run build`.

## 12. Out of Scope (v1)

E-commerce checkout, user accounts, CMS integration, multi-language support, and a blog.

## 13. Deliverables and Working Instructions for Codex

1. Scaffold the project and confirm the stack choice in the README.
2. Build section by section in the order above, committing after each.
3. Use placeholder high-resolution images with accurate dimensions and alt text, centralized in `images.ts`.
4. Include a README with run, build, and image-swapping instructions.
5. Before finishing, run a Lighthouse pass and fix any issue that drops a score below target, then summarize what was tested.
