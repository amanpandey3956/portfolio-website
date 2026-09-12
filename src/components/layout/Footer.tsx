import { useState } from "react";
import { Github, Linkedin, Mail, ArrowUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, href: "https://github.com/amanpandey3956", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/amanpandey1213/", label: "LinkedIn" },
];

const email = "amanpnd01@gmail.com";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Blog", path: "/blog" },
  { name: "Certifications", path: "/certifications" },
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
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <span className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-muted">
                <img
                  src="/projects/myimg.webp"
                  alt="Aman Pandey"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="font-display text-xl font-bold text-foreground">Aman Pandey</span>
            </Link>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors shadow-sm"
                >
                  <social.icon size={17} />
                </a>
              ))}
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors shadow-sm"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-5">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium text-foreground/85 hover:text-emerald-700 transition-colors w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-5">
              Get In Touch
            </h3>
            <div className="space-y-3.5">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-emerald-700 transition-colors"
              >
                <Mail size={16} className="text-primary" />
                {copied ? "Copied to clipboard!" : email}
              </button>
              <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                <MapPin size={16} className="text-primary" />
                Maharashtra, India
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-foreground/75">
            © {new Date().getFullYear()} Aman Pandey. Built with React & Tailwind CSS.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card hover:bg-foreground hover:text-background hover:border-foreground transition-colors shadow-sm">
              <ArrowUp size={15} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}