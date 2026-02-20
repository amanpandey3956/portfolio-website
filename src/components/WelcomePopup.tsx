import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const WELCOME_POPUP_KEY = "welcome_popup_shown";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem(WELCOME_POPUP_KEY);
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(WELCOME_POPUP_KEY, "true");
    setOpen(false);
  };

  const handleNavigateToBlog = () => {
    localStorage.setItem(WELCOME_POPUP_KEY, "true");
    setOpen(false);
    navigate("/blog");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:max-w-lg md:max-w-xl lg:max-w-2xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <div className="relative rounded-2xl sm:rounded-3xl border-gradient glass-strong overflow-hidden">
          <div className="absolute inset-0 mesh-gradient-strong opacity-50" />
          <div className="relative p-5 sm:p-8 md:p-10">
            <DialogHeader className="text-center sm:text-center space-y-4">
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center justify-center gap-2 sm:gap-3">
                <span className="gradient-text">Welcome to My Portfolio</span>
                <span className="animate-wave-icon origin-[70%_70%] inline-block text-2xl sm:text-3xl md:text-4xl">
                  👋
                </span>
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base md:text-lg pt-2 sm:pt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">
                Thanks for visiting! I write about Kubernetes, Cloud Native technologies, and Frontend development.
                Check out my blog for insights and tutorials.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center">
              <Button 
                onClick={handleNavigateToBlog} 
                className="gap-2 h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary via-teal-500 to-cyan-500 hover:from-primary/90 hover:via-teal-500/90 hover:to-cyan-500/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
              >
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                Read My Blogs
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold border-2 hover:bg-secondary/80 transition-all duration-300 hover:scale-[1.02]"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
