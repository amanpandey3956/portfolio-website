import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, FolderKanban, Briefcase, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      setScrolled(window.scrollY > 20);
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
      <motion.header
        className={`relative z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/5" 
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 sm:py-2 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="sm:w-16 sm:h-16 w-12 h-12 rounded-full overflow-hidden border-2 border-border"
              >
                <img
                  src="/projects/myimg.webp"
                  alt="Aman Pandey"
                  width={56}
                  height={56}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <div className="flex items-center bg-secondary/80 backdrop-blur-md rounded-full p-1 border border-border/60 shadow-sm">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative px-4 py-2 text-sm font-medium transition-colors"
                    >
                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 bg-primary rounded-full"
                      />
                      <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsResumeModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 transition-all duration-300 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-indigo-500" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-400/20 via-transparent to-indigo-400/20" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <FileText className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Resume</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[100] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center md:hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent" />

              <nav className="flex flex-col items-center gap-4 w-full max-w-sm px-8">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      variants={{
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: { type: "spring", stiffness: 300, damping: 24 },
                        },
                        closed: {
                          opacity: 0,
                          y: 20,
                          transition: { duration: 0.2 },
                        },
                      }}
                      className="w-full"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center gap-4 w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-secondary/50 border border-border/50 hover:bg-secondary hover:border-primary/30"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive 
                            ? "bg-primary-foreground/20" 
                            : "bg-primary/10 group-hover:bg-primary/20"
                        }`}>
                          <Icon size={20} className={isActive ? "text-primary-foreground" : "text-primary"} />
                        </div>
                        <span className="text-lg font-medium">{link.name}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 300, damping: 24 },
                    },
                    closed: {
                      opacity: 0,
                      y: 20,
                      transition: { duration: 0.2 },
                    },
                  }}
                  className="w-full pt-4"
                >
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                      setIsResumeModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-medium text-white overflow-hidden cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 transition-all duration-300 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-indigo-500" />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-400/20 via-transparent to-indigo-400/20" />
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <FileText className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Download Resume</span>
                  </motion.button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <ResumeModal open={isResumeModalOpen} onOpenChange={setIsResumeModalOpen} />
    </>
  );
}
