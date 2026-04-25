"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PwaRegister() {
  const pathname = usePathname();

  useEffect(() => {
    if ("serviceWorker" in navigator && pathname.startsWith("/admin")) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Fail silently: no impact on core booking flow.
      });
    }
  }, [pathname]);

  return null;
}
