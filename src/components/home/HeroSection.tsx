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
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-16 sm:pt-0 md:pt-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 60% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse 80% 50% at 30% 30%, rgba(16, 185, 129, 0.18) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 70% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 50% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 60% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
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

          <motion.div
            className="absolute bottom-[-10%] left-[20%] w-[55%] h-[45%] rounded-full blur-[90px]"
            style={{
              background: "linear-gradient(45deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(16, 185, 129, 0.08) 100%)"
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />

          <motion.div
            className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full blur-[70px]"
            style={{
              background: "linear-gradient(180deg, rgba(20, 184, 166, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)"
            }}
            animate={{
              x: [0, -30, 30, 0],
              y: [0, 40, -20, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aurora-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="aurora-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.25" />
              <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,200 Q200,100 400,200 T800,200 T1200,200 T1600,200 T2000,200"
            fill="none"
            stroke="url(#aurora-gradient-1)"
            strokeWidth="100"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.3, 0.5, 0.3],
              y: [0, -20, 0]
            }}
            transition={{
              pathLength: { duration: 3, ease: "easeInOut" },
              opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.path
            d="M0,400 Q300,300 600,400 T1200,400 T1800,400 T2400,400"
            fill="none"
            stroke="url(#aurora-gradient-2)"
            strokeWidth="80"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.2, 0.4, 0.2],
              y: [0, 15, 0]
            }}
            transition={{
              pathLength: { duration: 4, ease: "easeInOut" },
              opacity: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 },
              y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          />
        </svg>

        <motion.div
          className="absolute top-[25%] left-[10%] w-1.5 h-1.5 rounded-full bg-emerald-400"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[45%] right-[15%] w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ 
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[35%] left-[20%] w-1 h-1 rounded-full bg-violet-400"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[65%] right-[25%] w-1 h-1 rounded-full bg-teal-400"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
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
              asChild
              className="border-border hover:bg-secondary hover:text-foreground text-foreground group w-full sm:w-auto"
            >
              <a href="/Aman-Pandey.pdf" download>
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                <span>Download Resume</span>                
              </a>
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
    </section>
  );
}
