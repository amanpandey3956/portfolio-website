import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Hand } from "lucide-react";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-2xl flex items-center justify-center gap-2">
            Welcome to My Portfolio
            <Hand className="h-6 w-6 inline-block animate-wave origin-[70%_70%]" />
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Thanks for visiting! I write about Kubernetes, Cloud Native technologies, and Frontend development.
            Check out my blog for insights and tutorials.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 mt-4">
          <Button onClick={handleNavigateToBlog} className="gap-2">
            <BookOpen className="h-4 w-4" />
            Read My Blogs
          </Button>
          <Button variant="outline" onClick={handleClose}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
