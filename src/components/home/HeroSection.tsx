import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Briefcase, Sparkles, Code2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const floatingBadges = [
  { icon: Code2, label: "Frontend", delay: 0 },
  { icon: Rocket, label: "Cloud Native", delay: 0.5 },
  { icon: Sparkles, label: "Kubernetes", delay: 1 },
];

export function HeroSection() {
  const gridDots = Array.from({ length: 100 }, (_, i) => i);

  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-0 sm:pt-8 md:pt-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, hsl(180 100% 50% / 0.08) 0%, transparent 50%)
            `
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {gridDots.map((dot) => {
            const row = Math.floor(dot / 10);
            const col = dot % 10;
            const left = (col / 9) * 90 + 5;
            const top = (row / 9) * 90 + 5;
            const delay = (row + col) * 0.1;
            
            return (
              <motion.div
                key={dot}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  background: `radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)`,
                  boxShadow: `0 0 6px hsl(var(--primary) / 0.4)`
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3,
                  delay: delay % 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>

        <motion.div
          className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-cyan-400"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] w-2 h-2 rounded-full bg-primary"
          animate={{ 
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-teal-400"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-[60%] right-[30%] w-1.5 h-1.5 rounded-full bg-cyan-500"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-lg text-muted-foreground mb-8"
          >
            <span className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:border-primary/30 transition-colors">
              <Briefcase size={18} className="text-primary" />
              <span className="font-medium">Associate Full Stack Engineer</span>
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:border-primary/30 transition-colors">
              <MapPin size={18} className="text-cyan-400" />
              <span className="font-medium">CloudRaft</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            Frontend Developer | Exploring{" "}
            <span className="text-primary font-medium">Kubernetes</span>,{" "}
            <span className="text-cyan-400 font-medium">Observability</span> and{" "}
            <span className="text-teal-400 font-medium">Cloud Native Technologies</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button 
              asChild 
              size="lg" 
              className="glow group relative overflow-hidden bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 border-0"
            >
              <Link to="/projects">
                <span className="relative z-10 flex items-center">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="border-border hover:bg-secondary hover:text-foreground text-foreground group"
            >
              <a href="/Aman-Pandey.pdf" download>
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                <span className="hidden sm:inline">Download Resume</span>
                <span className="sm:hidden">Resume</span>                
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
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
    </section>
  );
}
