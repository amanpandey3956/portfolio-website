import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Resume = () => {
  const resumeUrl = "/Aman-Pandey.pdf";

  return (
    <Layout>
      <SEO
        title="Resume"
        description="View and download Aman Pandey's resume - Associate Full Stack Engineer specializing in React, TypeScript, and Cloud Native technologies."
        keywords="Resume, CV, Full Stack Engineer, React Developer, TypeScript, Portfolio"
        url="https://amanpandey-portfolio.vercel.app/resume"
      />
      
      <section className="py-16 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-cyan-500/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              title="Resume"
              subtitle="View my professional experience and skills"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="outline"
              asChild
              className="border-border hover:bg-secondary hover:text-foreground text-foreground group"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>
            
            <Button
              asChild
              className="glow group relative overflow-hidden bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 border-0"
            >
              <a href={resumeUrl} download="Aman-Pandey-Resume.pdf">
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-border hover:bg-secondary hover:text-foreground text-foreground group"
            >
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in New Tab
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-cyan-500/20 to-primary/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 border-b border-border/50 flex items-center px-4 gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Aman-Pandey.pdf</span>
              </div>
              
              <div className="pt-12">
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  title="Resume PDF"
                  className="w-full h-[75vh] min-h-[500px] bg-white"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            <p>
              Having trouble viewing?{' '}
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Open in a new tab
              </a>
              {' '}or{' '}
              <a 
                href={resumeUrl} 
                download="Aman-Pandey-Resume.pdf"
                className="text-primary hover:underline"
              >
                download the PDF
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Resume;
