import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ResumeModal } from "@/components/ui/ResumeModal";

const socials = [
  { icon: Github, href: "https://github.com/amanpandey3956", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/amanpandey1213/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:amanpnd01@gmail.com", label: "Email" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a06_1px,transparent_1px),linear-gradient(to_bottom,#0f172a06_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-emerald-400/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-400/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-sm font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display mt-7 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05]"
          >
            <span className="relative inline-block">
              Aman Pandey
              <svg
                viewBox="0 0 300 14"
                fill="none"
                className="absolute -bottom-2 left-0 w-full h-4 text-emerald-400"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 10C80 4 220 4 297 10"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-8 text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed font-medium"
          >
            DevOps Engineer | Kubernetes | Golang | Observability | Exploring{" "}
            Opentelemetry and Cloud Native Technologies
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-base rounded-xl px-9 py-6 shadow-lg shadow-zinc-900/10 hover:shadow-emerald-500/25"
            >
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsResumeModalOpen(true)}
              className="text-base rounded-xl px-9 py-6 border-2 border-foreground/80 bg-transparent text-foreground hover:bg-foreground hover:text-background hover:border-foreground"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-10 flex items-center gap-3"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 bg-white text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors shadow-sm"
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <ResumeModal open={isResumeModalOpen} onOpenChange={setIsResumeModalOpen} />
    </section>
  );
}