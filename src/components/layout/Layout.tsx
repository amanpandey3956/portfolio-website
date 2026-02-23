import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnnouncementBar } from "./AnnouncementBar";
import { FloatingHireMeButton } from "./FloatingHireMeButton";
import { AnnouncementProvider, useAnnouncement } from "./AnnouncementContext";

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isAnnouncementVisible } = useAnnouncement();
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 isolate">
        <AnnouncementBar />
        <Navbar />
      </div>
      <main className={`flex-1 relative z-0 transition-all duration-300 ${isAnnouncementVisible ? "pt-32" : "pt-20"}`}>
        {children}
      </main>
      <Footer />
      <FloatingHireMeButton />
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <AnnouncementProvider>
      <LayoutContent>{children}</LayoutContent>
    </AnnouncementProvider>
  );
}
