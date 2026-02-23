import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const ANNOUNCEMENT_DISMISSED_KEY = "announcement_bar_dismissed";

interface AnnouncementContextType {
  isAnnouncementVisible: boolean;
  setAnnouncementVisible: (visible: boolean) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [isAnnouncementVisible, setAnnouncementVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY);
    if (!dismissed) {
      setAnnouncementVisible(true);
    }
  }, []);

  return (
    <AnnouncementContext.Provider value={{ isAnnouncementVisible, setAnnouncementVisible }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error("useAnnouncement must be used within an AnnouncementProvider");
  }
  return context;
}
