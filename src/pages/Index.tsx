import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <Layout>
      <SEO 
        type="profile"
        url="https://amanpandey-portfolio.vercel.app/"
      />
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
