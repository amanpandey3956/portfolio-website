import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { GitHubSection } from "@/components/home/GitHubSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { ContactSection } from "@/components/home/ContactSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <GitHubSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
