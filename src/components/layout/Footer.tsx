import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail, ArrowUp, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, href: "https://github.com/amanpandey3956", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/amanpandey1213/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/aman_pandey_39563/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/amanpandey39563", label: "Twitter" },
];

const email = "amanpnd01@gmail.com";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Blog", path: "/blog" },
];

export function Footer() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">Aman Pandey</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Associate Full Stack Engineer @CloudRaft
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
              <motion.button
                onClick={handleCopyEmail}
                className="hidden md:flex p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Copy email"
              >
                {copied ? <Check size={20} /> : <Mail size={20} />}
              </motion.button>
              <motion.a
                href={`mailto:${email}`}
                className="md:hidden p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aman Pandey. Built with ❤️ using React & Tailwind CSS
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="hover:bg-primary/20 hover:text-primary"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </Button>
        </div>
      </div>
    </footer>
  );
}
