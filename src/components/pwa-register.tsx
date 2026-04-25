"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PwaRegister() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // In dev, always remove stale SW/cache so localhost reflects latest code.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().catch(() => undefined);
        });
      });

      if ("caches" in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => {
            caches.delete(key).catch(() => undefined);
          });
        });
      }
      return;
    }

    if (!pathname.startsWith("/admin")) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Fail silently: no impact on core booking flow.
    });
  }, [pathname]);

  return null;
}
