import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, FolderKanban, Briefcase, BookOpen, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResumeModal } from "@/components/ui/ResumeModal";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Experience", path: "/experience", icon: Briefcase },
  { name: "Blog", path: "/blog", icon: BookOpen },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`relative z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-border shadow-md shadow-zinc-900/5"
            : "bg-background/70 backdrop-blur-md border-transparent"
        }`}
      >
        <nav className="container mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            <Link to="/" className="flex items-center gap-3">
              <span className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-background">
                <img
                  src="/projects/myimg.webp"
                  alt="Aman Pandey"
                  width={44}
                  height={44}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold text-foreground">Aman Pandey</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                  DevOps Engineer
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 bg-primary/10 rounded-lg"
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {location.pathname === "/blog" || location.pathname.startsWith("/blog/") ? (
                <ThemeToggle />
              ) : null}
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Resume
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {location.pathname === "/blog" || location.pathname.startsWith("/blog/") ? (
                <ThemeToggle />
              ) : null}
              <button
                aria-label="Toggle menu"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:border-emerald-500 transition-colors"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-background z-[100] md:hidden"
          >
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-border">
              <span className="font-display text-lg font-bold text-foreground">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground"
              >
                <X size={22} />
              </button>
            </div>

            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col gap-3 px-6 pt-8"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 16 },
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-bold transition-colors border ${
                        isActive
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "text-foreground border-border hover:bg-muted hover:border-emerald-400"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          isActive ? "bg-primary/10 text-primary" : "bg-muted text-foreground/60"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 16 },
                }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsResumeModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-foreground text-background text-lg font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Download Resume
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal open={isResumeModalOpen} onOpenChange={setIsResumeModalOpen} />
    </>
  );
}