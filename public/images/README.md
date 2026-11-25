# Maison Oak — Image Asset Manifest & Storage

This directory structure mirrors the image sections defined in `lib/images.ts`.

## Image Specifications & Dimensions

| Directory | Typical Use | Target Dimensions | Aspect Ratio | Format |
|---|---|---|---|---|
| `/images/hero/` | Full-bleed hero lifestyle room | 2560 × 1440 px | 16:9 (crops 4:5 on mobile) | AVIF / WebP / JPG |
| `/images/products/` | Featured collection cards & hover reveals | 1600 × 2000 px | 4:5 | AVIF / WebP / JPG |
| `/images/editorial/` | Editorial lifestyle room band | 2400 × 1200 px | 2:1 | AVIF / WebP / JPG |
| `/images/craftsmanship/` | Detail joinery and macro shots | 1600 × 1600 px / 800 × 800 px | 1:1 | AVIF / WebP / JPG |
| `/images/gallery/` | Bento/masonry photo gallery | 1600 × 1200 px / 1200 × 1600 px | 4:3 & 3:4 mix | AVIF / WebP / JPG |
| `/images/showroom/` | SoHo showroom architecture & space | 1800 × 1350 px | 4:3 | AVIF / WebP / JPG |

## How to Swap Any Image

1. Place your high-resolution asset into the corresponding subfolder, for example:
   `/public/images/hero/hero-room.jpg`
2. Open `lib/images.ts` and update the `src` property to the local path:
   ```ts
   // In lib/images.ts:
   hero: {
     src: "/images/hero/hero-room.jpg",
     alt: "Your descriptive photo alt text",
     width: 2560,
     height: 1440,
     aspectRatio: "16/9",
   }
   ```
3. Run `npm run build` or `npm run dev` to verify responsive loading and blurred placeholder rendering.
