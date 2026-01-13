import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-8 md:pt-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
          >
            Hi, I'm{" "}
            <span className="gradient-text">Aman Pandey</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 text-lg text-muted-foreground mb-6"
          >
            <span className="flex items-center gap-2">
              <Briefcase size={18} className="text-primary" />
              Associate Full Stack Engineer
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              CloudRaft
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
          >
            Frontend Developer | Exploring Kubernetes, Observability and Cloud Native Technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="glow"
            >
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="border-border text-foreground hover:bg-secondary hover:text-foreground"
            >
              <a href="/Aman-Pandey.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Download Resume</span>
                <span className="sm:hidden">View Resume</span>                
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
