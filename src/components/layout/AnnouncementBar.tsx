import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { HireMeButton } from "@/components/ui/hire-me-button";
import { useAnnouncement } from "./AnnouncementContext";

export function AnnouncementBar() {
  const { isAnnouncementVisible, setAnnouncementVisible } = useAnnouncement();

  const handleDismiss = () => {
    setAnnouncementVisible(false);
    localStorage.setItem("announcement_bar_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isAnnouncementVisible && (
        <motion.div
          className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"
        >
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            
            <div className="container mx-auto px-4 py-2.5">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
                
                <p className="text-white text-sm sm:text-base font-medium">
                  <span className="hidden sm:inline">Open to new opportunities — </span>
                  <span className="sm:hidden">Open to opportunities — </span>
                  <span className="text-yellow-200">Let's work together!</span>
                </p>
                
                <HireMeButton variant="navbar-mobile" className="!py-1.5 !px-3 text-xs !bg-amber-400 hover:!bg-amber-300 !text-slate-900 mr-6 sm:mr-0" />
                
                <button
                  onClick={handleDismiss}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Dismiss announcement"
                >
                  <X className="w-4 h-4 text-white/80 hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
