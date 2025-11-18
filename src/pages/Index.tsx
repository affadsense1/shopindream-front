import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <Header />
      <Hero />
      <ProductSection title="Hot Products" category="hot" count={8} />
      <ProductSection title="New Arrivals" category="new" count={8} />
      <ProductSection title="Latest Products" category="latest" count={8} />
      
      <Footer />
    </div>
  );
};

export default Index;
