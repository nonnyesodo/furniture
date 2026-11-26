/**
 * Central Image Manifest for Maison Oak
 * 
 * High-resolution imagery configuration.
 * All image sources, dimensions, and descriptive alt texts are centralized here.
 * To swap any image, update the URL or path in this file.
 */

export interface ImageAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  blurDataURL?: string;
  dominantColor?: string;
  objectPosition?: string;
}

// Low-quality SVG data-uri blur placeholders for instant perception
const createSvgBlur = (color: string) =>
  `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E`;

export const images = {
  // Hero: Full-bleed lifestyle room shot (2560 x 1440)
  hero: {
    id: "hero-living-room",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2560&q=85",
    alt: "Sunlit minimalist living room featuring a solid oak coffee table, linen sofa, and architectural ceramics in warm natural morning light",
    width: 2560,
    height: 1440,
    aspectRatio: "16/9",
    dominantColor: "#EAE5DF",
    blurDataURL: createSvgBlur("#EAE5DF"),
    objectPosition: "center 45%",
  },

  // Featured Collection Products (Cards: 1600 x 2000, 4:5 ratio)
  // Each has primary and secondary hover reveal images
  products: [
    {
      id: "arlo-lounge-chair",
      name: "The Arlo Lounge Chair",
      descriptor: "Sculpted solid white oak frame with Belgian oat linen cushioning.",
      material: "Solid Oak · Belgian Linen",
      category: "Seating",
      price: "₦1,850,000",
      primary: {
        id: "arlo-primary",
        src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "The Arlo Lounge Chair in natural oak with textured oatmeal linen upholstery against a neutral wall",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#E5E0D8"),
      },
      secondary: {
        id: "arlo-secondary",
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "Detail view of the Arlo Lounge Chair showing hand-shaped armrest joinery and tactile fabric weave",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#DDD8CE"),
      },
    },
    {
      id: "soren-dining-table",
      name: "The Soren Dining Table",
      descriptor: "European white oak dining table with soft beveled edges and continuous plank grain.",
      material: "European Oak · Organic Oil",
      category: "Dining",
      price: "₦3,650,000",
      primary: {
        id: "soren-primary",
        src: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "The Soren Dining Table in white oak with six minimalist dining chairs in a serene dining space",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#E2DCD4"),
      },
      secondary: {
        id: "soren-secondary",
        src: "https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "Close-up of the Soren Dining Table surface highlighting the natural timber grain and soft radius edging",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#D5CFC5"),
      },
    },
    {
      id: "kanso-linen-sofa",
      name: "The Kanso Modular Sofa",
      descriptor: "Low-profile sectional tailored in unbleached French flax with down-blend cushions.",
      material: "French Flax · Down Fill",
      category: "Living",
      price: "₦4,950,000",
      primary: {
        id: "kanso-primary",
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "The Kanso Modular Sofa in warm sand flax linen situated in a bright, modern living room",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#DFDAD1"),
      },
      secondary: {
        id: "kanso-secondary",
        src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "Three-quarter profile of the Kanso Modular Sofa displaying its low solid wood base and relaxed drape",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#D4CEC3"),
      },
    },
    {
      id: "astrid-credenza",
      name: "The Astrid Sideboard",
      descriptor: "Fluted oak sideboard with concealed push-to-open doors and satin bronze plinth.",
      material: "Quartered Oak · Bronze",
      category: "Storage",
      price: "₦2,950,000",
      primary: {
        id: "astrid-primary",
        src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "The Astrid Sideboard with handcrafted tambour slats styled with minimalist ceramics",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#E7E2DA"),
      },
      secondary: {
        id: "astrid-secondary",
        src: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "Detail of the Astrid Sideboard showing the fluted timber profile and precision joint tolerances",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#DFD8CD"),
      },
    },
    {
      id: "mara-armchair",
      name: "The Mara Occasional Chair",
      descriptor: "Curved silhouette in rich textured bouclé resting on sculpted walnut conical legs.",
      material: "Wool Bouclé · Walnut",
      category: "Seating",
      price: "₦2,100,000",
      primary: {
        id: "mara-primary",
        src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "The Mara Occasional Chair in cream textured bouclé with rich dark walnut legs",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#E3DFD7"),
      },
      secondary: {
        id: "mara-secondary",
        src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "Detailed view of the Mara Chair's curved backrest and luxurious nubby wool bouclé texture",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#DCD6CC"),
      },
    },
    {
      id: "oakhaven-bed",
      name: "The Oakhaven Platform Bed",
      descriptor: "Low architectural frame in solid American white oak with integrated floating ledges.",
      material: "American Oak · Hidden Joinery",
      category: "Bedroom",
      price: "₦3,850,000",
      primary: {
        id: "oakhaven-primary",
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "The Oakhaven Platform Bed with natural linen bedding in an airy, tranquil bedroom sanctuary",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#E0DAD1"),
      },
      secondary: {
        id: "oakhaven-secondary",
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&h=2000&q=85",
        alt: "Detail of the Oakhaven headboard highlighting the continuous timber grain and seamless mitre corners",
        width: 1600,
        height: 2000,
        aspectRatio: "4/5",
        blurDataURL: createSvgBlur("#D7D0C5"),
      },
    },
  ],

  // Editorial Lifestyle Band (2400 x 1200, 2:1 ratio)
  editorialBand: {
    id: "editorial-living-room-edit",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&h=1200&q=85",
    alt: "Spacious architectural living room with floor-to-ceiling windows, natural linen upholstery, and solid timber accents",
    width: 2400,
    height: 1200,
    aspectRatio: "2/1",
    dominantColor: "#DBD5CC",
    blurDataURL: createSvgBlur("#DBD5CC"),
  },

  // Craftsmanship Section: Large detail shot + 3 macro detail images
  craftsmanship: {
    main: {
      id: "craftsmanship-main",
      src: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1600&h=1600&q=85",
      alt: "Woodworker hand-sanding a solid white oak dining table surface to a silky matte finish",
      width: 1600,
      height: 1600,
      aspectRatio: "1/1",
      blurDataURL: createSvgBlur("#D3CCC1"),
    },
    details: [
      {
        id: "craft-joinery",
        title: "Mortise & Tenon",
        caption: "Precision interlocking joints cut from singular timber blocks.",
        src: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&h=800&q=85",
        alt: "Close-up macro of traditional exposed mortise and tenon wood joinery",
        width: 800,
        height: 800,
        aspectRatio: "1/1",
        blurDataURL: createSvgBlur("#C9C1B5"),
      },
      {
        id: "craft-finishing",
        title: "Hand-Applied Oil",
        caption: "Three coats of plant-based wax oils that let the wood breathe.",
        src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=800&q=85",
        alt: "Craftsman wiping organic finishing oil onto a richly grained oak board",
        width: 800,
        height: 800,
        aspectRatio: "1/1",
        blurDataURL: createSvgBlur("#CEC6B8"),
      },
      {
        id: "craft-textiles",
        title: "Heritage Weaves",
        caption: "Belgian flax and Scottish wool bouclé woven on historic looms.",
        src: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&h=800&q=85",
        alt: "Macro detail of unbleached tactile natural linen fabric texture",
        width: 800,
        height: 800,
        aspectRatio: "1/1",
        blurDataURL: createSvgBlur("#D6D0C5"),
      },
    ],
  },

  // Gallery: 10 images with mixed aspect ratios (bento / masonry)
  gallery: [
    {
      id: "gallery-1",
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&h=1200&q=85",
      alt: "Minimalist living room with oak furniture, neutral tones, and afternoon shadows",
      width: 1600,
      height: 1200,
      aspectRatio: "4/3",
      caption: "The Light & Timber Study, Ikoyi",
      category: "Living",
      blurDataURL: createSvgBlur("#D8D2C7"),
    },
    {
      id: "gallery-2",
      src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&h=1600&q=85",
      alt: "Warm kitchen dining nook with solid oak round table and woven pendant light",
      width: 1200,
      height: 1600,
      aspectRatio: "3/4",
      caption: "Mornings at Casa Fika",
      category: "Dining",
      blurDataURL: createSvgBlur("#D3CCC1"),
    },
    {
      id: "gallery-3",
      src: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1600&h=1600&q=85",
      alt: "Minimalist shelf detail holding ceramic vases and art books",
      width: 1600,
      height: 1600,
      aspectRatio: "1/1",
      caption: "Curated Object Arrangement",
      category: "Details",
      blurDataURL: createSvgBlur("#DDD7CD"),
    },
    {
      id: "gallery-4",
      src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&h=1000&q=85",
      alt: "Modern sanctuary bedroom with low platform oak bed and washed linen sheets",
      width: 1600,
      height: 1000,
      aspectRatio: "16/10",
      caption: "Sanctuary Suite, Maitama",
      category: "Bedroom",
      blurDataURL: createSvgBlur("#CDC7BD"),
    },
    {
      id: "gallery-5",
      src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&h=1600&q=85",
      alt: "Sculptural wooden lounge chair beside a sun-drenched arched window",
      width: 1200,
      height: 1600,
      aspectRatio: "3/4",
      caption: "Solitude in Sunlit Arch",
      category: "Living",
      blurDataURL: createSvgBlur("#DAD4CA"),
    },
    {
      id: "gallery-6",
      src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&h=1200&q=85",
      alt: "Close-up of oak tabletop setting with ceramic tableware and linen napkins",
      width: 1600,
      height: 1200,
      aspectRatio: "4/3",
      caption: "Tactile Dining Rituals",
      category: "Dining",
      blurDataURL: createSvgBlur("#D5CFC3"),
    },
    {
      id: "gallery-7",
      src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&h=1000&q=85",
      alt: "Expansive modern loft with low seating and architectural oak partition",
      width: 1600,
      height: 1000,
      aspectRatio: "16/10",
      caption: "The Banana Island Residence",
      category: "Living",
      blurDataURL: createSvgBlur("#D6D1C6"),
    },
    {
      id: "gallery-8",
      src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&h=1600&q=85",
      alt: "Natural bedroom scene with warm morning sunlight streaming across wood flooring",
      width: 1200,
      height: 1600,
      aspectRatio: "3/4",
      caption: "Dusk & Dawn in Oak",
      category: "Bedroom",
      blurDataURL: createSvgBlur("#CEC7BC"),
    },
  ],

  // Showroom Interior
  showroom: {
    id: "showroom-space",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&h=1350&q=85",
    alt: "The Maison Oak Victoria Island, Lagos showroom featuring warm timber floors, high ceilings, curated furniture vignettes, and soft diffused daylight",
    width: 1800,
    height: 1350,
    aspectRatio: "4/3",
    blurDataURL: createSvgBlur("#DBD5CB"),
  },

  // Open Graph Social Share Image (1200 x 630)
  ogImage: {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&h=630&q=85",
    width: 1200,
    height: 630,
    alt: "Maison Oak - Handcrafted furniture made to be lived in",
  },
};
