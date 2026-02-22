import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SEO } from "@/components/SEO";

const Index = () => {
  useEffect(() => {
    const shouldScrollToContact = sessionStorage.getItem("scrollToContact");
    if (shouldScrollToContact === "true") {
      sessionStorage.removeItem("scrollToContact");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

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
