import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/content";
import { images } from "@/lib/images";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${siteConfig.name} — Handcrafted Furniture Atelier & Showroom`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — Furniture Made to be Lived In`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: images.ogImage.src,
        width: images.ogImage.width,
        height: images.ogImage.height,
        alt: images.ogImage.alt,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Furniture Made to be Lived In`,
    description: siteConfig.description,
    images: [images.ogImage.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Data for SEO: FurnitureStore & Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FurnitureStore",
        "@id": `${siteConfig.url}/#store`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/logo.png`,
        image: images.ogImage.src,
        description: siteConfig.description,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        priceRange: "$$$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.street,
          addressLocality: siteConfig.contact.address.city,
          addressRegion: siteConfig.contact.address.region,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: siteConfig.contact.address.country,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday"],
            opens: "11:00",
            closes: "17:00",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        sameAs: siteConfig.socials
          .filter((social) => social.id !== "whatsapp")
          .map((social) => social.href),
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#FAF8F5] text-charcoal antialiased selection:bg-oak/20 selection:text-charcoal min-h-screen flex flex-col">
        {/* WCAG 2.2 AA Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-charcoal focus:text-sand-100 focus:outline-none focus:ring-2 focus:ring-oak focus:shadow-xl text-xs uppercase tracking-widest font-semibold"
        >
          Skip to main content
        </a>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
