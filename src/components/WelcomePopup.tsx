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
      <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border-0 bg-transparent p-0 shadow-none sm:max-w-md sm:rounded-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-emerald-50/80 via-white to-white shadow-2xl shadow-zinc-900/20 sm:rounded-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-16 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute -bottom-20 -right-14 h-40 w-40 rounded-full bg-teal-200/30 blur-3xl" />
          </div>

          <div className="relative p-5 sm:p-8">
            <DialogHeader className="space-y-4 text-center sm:text-center">
              <div className="mx-auto h-16 w-16 overflow-hidden rounded-full bg-white ring-2 ring-emerald-500/30 ring-offset-2 ring-offset-emerald-50">
                <img
                  src="/projects/myimg.webp"
                  alt="Aman Pandey"
                  width={64}
                  height={64}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                  DevOps Engineer
                </p>
                <DialogTitle className="font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                  Welcome to my website <span className="inline-block">👋</span>
                </DialogTitle>
                <DialogDescription className="mx-auto max-w-sm text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                  I'm Aman. I write about Kubernetes, cloud-native technologies, and observability. Thanks for stopping by — have a look around.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="mt-7 grid grid-cols-2 gap-2.5">
              <Button
                onClick={handleNavigateToBlog}
                className="h-10 w-full gap-1.5 whitespace-nowrap rounded-xl bg-emerald-700 px-1.5 text-[11px] font-semibold text-white shadow-sm shadow-emerald-700/20 hover:bg-emerald-800 sm:h-11 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <BookOpen className="h-4 w-4 shrink-0" />
                Read my blog
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="h-10 w-full whitespace-nowrap rounded-xl border-zinc-300 bg-white/80 px-1.5 text-[11px] font-semibold text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 sm:h-11 sm:px-4 sm:text-sm"
              >
                Continue browsing
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
