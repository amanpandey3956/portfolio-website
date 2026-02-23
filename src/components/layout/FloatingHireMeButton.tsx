import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { HireMeButton } from "@/components/ui/hire-me-button";

export function FloatingHireMeButton() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-[60] group"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
        <div className="relative flex items-center px-3 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-full shadow-lg">
          <HireMeButton variant="navbar-mobile" className="!px-0 !py-0 !bg-transparent text-white text-sm font-medium" />
        </div>
      </motion.div>
      
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute -top-2 -right-2 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-secondary"
        aria-label="Dismiss"
      >
        <X className="w-3 h-3 text-muted-foreground" />
      </button>
    </motion.div>
  );
}
