import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import FeaturedCollection from "@/components/FeaturedCollection";
import EditorialBand from "@/components/EditorialBand";
import Craftsmanship from "@/components/Craftsmanship";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky Header with Scroll Detection */}
      <Header />

      {/* Main Landmark */}
      <main id="main-content" className="flex-grow">
        {/* 7.2 Hero */}
        <Hero />

        {/* 7.3 Brand Statement */}
        <BrandStatement />

        {/* 7.4 Featured Collection */}
        <FeaturedCollection />

        {/* 7.5 Editorial Lifestyle Band */}
        <EditorialBand />

        {/* 7.6 Craftsmanship */}
        <Craftsmanship />

        {/* 7.7 Gallery */}
        <Gallery />

        {/* 7.8 Testimonials */}
        <Testimonials />

        {/* 7.9 Showroom and Contact CTA */}
        <ContactSection />
      </main>

      {/* 7.10 Footer */}
      <Footer />
    </>
  );
}
