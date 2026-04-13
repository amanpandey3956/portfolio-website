import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useThemeManager() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isBlogRoute = location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  return { mounted, isBlogRoute };
}
