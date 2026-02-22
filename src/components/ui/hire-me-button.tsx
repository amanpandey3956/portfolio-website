import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight, Sparkles, Copy, Check, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const email = "amanpnd01@gmail.com";

interface HireMeButtonProps {
  variant?: "default" | "navbar" | "navbar-mobile";
  className?: string;
}

export function HireMeButton({ variant = "default", className = "" }: HireMeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast({
        title: "Email copied!",
        description: email,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the email manually",
        variant: "destructive",
      });
    }
  };

  const handleContactForm = () => {
    setIsOpen(false);
    if (location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      sessionStorage.setItem("scrollToContact", "true");
      navigate("/");
    }
  };

  if (variant === "navbar") {
    return (
      <>
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white overflow-hidden ${className}`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 transition-all duration-300 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-indigo-500" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-400/20 via-transparent to-indigo-400/20" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Sparkles className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Hire Me</span>
        </motion.button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-md bg-card/95 backdrop-blur-xl border-border/50 mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Let's Work Together</DialogTitle>
              <DialogDescription>
                I'm open to new opportunities. Let's connect!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 sm:gap-3 pt-4">
              <button
                onClick={handleCopyEmail}
                className="hidden md:flex group items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                    {copied ? "Copied!" : "Copy Email"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
                </div>
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-all" />
              </button>

              <a
                href={`mailto:${email}`}
                onClick={() => setIsOpen(false)}
                className="md:hidden group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">Email Me</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/amanpandey1213/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">LinkedIn</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Connect professionally</p>
                </div>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <button
                onClick={handleContactForm}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">Contact Form</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Send a message directly</p>
                </div>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (variant === "navbar-mobile") {
    return (
      <>
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white overflow-hidden ${className}`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 transition-all duration-300 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-indigo-500" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Sparkles className="w-3 h-3 relative z-10" />
          <span className="relative z-10">Hire Me</span>
        </motion.button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-md bg-card/95 backdrop-blur-xl border-border/50 mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Let's Work Together</DialogTitle>
              <DialogDescription>
                I'm open to new opportunities. Let's connect!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 sm:gap-3 pt-4">
              <button
                onClick={handleCopyEmail}
                className="hidden md:flex group items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                    {copied ? "Copied!" : "Copy Email"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
                </div>
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-all" />
              </button>

              <a
                href={`mailto:${email}`}
                onClick={() => setIsOpen(false)}
                className="md:hidden group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">Email Me</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/amanpandey1213/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">LinkedIn</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Connect professionally</p>
                </div>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <button
                onClick={handleContactForm}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">Contact Form</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Send a message directly</p>
                </div>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white overflow-hidden ${className}`}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 transition-all duration-300 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-indigo-500" />
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Sparkles className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Hire Me</span>
      </motion.button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md bg-card/95 backdrop-blur-xl border-border/50 mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Let's Work Together</DialogTitle>
            <DialogDescription>
              I'm open to new opportunities. Let's connect!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 sm:gap-3 pt-4">
            <button
              onClick={handleCopyEmail}
              className="hidden md:flex group items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                  {copied ? "Copied!" : "Copy Email"}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
              </div>
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-all" />
            </button>

            <a
              href={`mailto:${email}`}
              onClick={() => setIsOpen(false)}
              className="md:hidden group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">Email Me</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/amanpandey1213/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">LinkedIn</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Connect professionally</p>
              </div>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <button
              onClick={handleContactForm}
              className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">Contact Form</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Send a message directly</p>
              </div>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
