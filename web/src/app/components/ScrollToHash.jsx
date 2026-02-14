"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export  function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;

    if (hash === "#collections") {
      const el = document.getElementById("collections");

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 150);
      }
    }
  }, [pathname]);

  return null;
}