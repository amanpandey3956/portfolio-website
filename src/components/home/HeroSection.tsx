import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles, Code2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ResumeModal } from "@/components/ui/ResumeModal";

const floatingBadges = [
  { icon: Sparkles, label: "Kubernetes", delay: 1 },
  { icon: Rocket, label: "Cloud Native", delay: 0.5 },
  { icon: Code2, label: "Frontend", delay: 0 },
];

export function HeroSection() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-16 sm:pt-0 md:pt-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:56px_56px]" />
        
        <div className="absolute inset-0 bg-radial-gradient" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent blur-2xl" />
          </div>
          
          <div className="absolute top-0 left-0 w-[600px] h-[800px]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent blur-3xl" />
          </div>
          
          <div className="absolute top-0 right-0 w-[600px] h-[800px]">
            <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 via-transparent to-transparent blur-3xl" />
          </div>
        </div>

        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[80px]"
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(20, 184, 166, 0.1) 100%)"
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-[20%] right-[-5%] w-[50%] h-[50%] rounded-full blur-[100px]"
          style={{
            background: "linear-gradient(225deg, rgba(6, 182, 212, 0.18) 0%, rgba(59, 130, 246, 0.12) 50%, rgba(139, 92, 246, 0.08) 100%)"
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative mb-8"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-2xl opacity-60 animate-pulse" />
            <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mb-6"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-foreground"
            >
              Hi, I'm{" "}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative inline-block"
            >
              <span className="gradient-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold animate-gradient bg-[length:200%_200%]">
                Aman Pandey
              </span>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            DevOps Engineer | Ex-Frontend Developer | Exploring{" "}
            Observability and{" "}
            Cloud Native Technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12"
          >
            <Button 
              asChild 
              size="lg" 
              className="glow group relative overflow-hidden bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 border-0 w-full sm:w-auto"
            >
              <Link to="/projects">
                <span className="relative z-10 flex items-center justify-center">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setIsResumeModalOpen(true)}
              className="border-border hover:bg-secondary hover:text-foreground text-foreground group w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              <span>Download Resume</span>                
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-0"
          >
            {floatingBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + badge.delay, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:border-primary/40 transition-all duration-300 cursor-default"
              >
                <badge.icon size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
      
      <ResumeModal open={isResumeModalOpen} onOpenChange={setIsResumeModalOpen} />
    </section>
  );
}
