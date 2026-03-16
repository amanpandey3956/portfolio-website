import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";

export function useThemeManager() {
  const location = useLocation();
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isBlogRoute = location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  
  useEffect(() => {
    if (!mounted) return;
    
    setTheme("dark");
  }, [location.pathname, setTheme, mounted]);

  return { mounted, isBlogRoute };
}
