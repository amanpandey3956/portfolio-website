import { Download, ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const devOpsResumeUrl = "/Aman-Pandey-Resume.pdf";

interface ResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResumeModal({ open, onOpenChange }: ResumeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md bg-card/95 backdrop-blur-xl border-border/50 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Resume
          </DialogTitle>
          <DialogDescription>
            View or download my DevOps resume
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <a
            href={devOpsResumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpenChange(false)}
            className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">DevOps Engineer</p>
              <p className="text-sm text-muted-foreground">View in new tab</p>
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href={devOpsResumeUrl}
            download="Aman-Pandey-DevOps-Resume.pdf"
            onClick={() => onOpenChange(false)}
            className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Download className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">Download DevOps Resume</p>
              <p className="text-sm text-muted-foreground">Save PDF to your device</p>
            </div>
            <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
