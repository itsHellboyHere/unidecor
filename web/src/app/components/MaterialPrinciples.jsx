"use client";

import styles from "@/app/css/MaterialPrinciple.module.css";
import { useEffect, useRef } from "react";
import useScrollFade from "@/app/hooks/useScrollFade";

const PRINCIPLES = [
  {
    title: "Design Integrity",
    text: "Every surface is designed to belong — not just exist.",
  },
  {
    title: "Material Longevity",
    text: "Engineered for durability in real Indian living conditions.",
  },
  {
    title: "Installation Simplicity",
    text: "Products that respect the craftsman’s workflow.",
  },
  {
    title: "Indian Context",
    text: "Designed for Indian homes, climates, and lifestyles.",
  },
];

export default function MaterialPrinciples() {
  const stickyRef = useRef(null);

  /* ===============================
     FADE-IN FOR RIGHT CONTENT
     =============================== */
  useScrollFade({
    selector: ".scroll-fade",
    threshold: 0.3,
  });

  /* ===============================
     STICKY TITLE MOTION
     =============================== */
  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    const onScroll = () => {
      const rect = sticky.getBoundingClientRect();

      // progress: 0 → 1
      const progress = Math.min(
        Math.max((rect.top - 120) / 220, 0),
        1
      );

      sticky.style.opacity = progress;
      sticky.style.transform = `translateY(${(1 - progress) * 20}px)`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        
        {/* LEFT — STICKY */}
        <div
          ref={stickyRef}
          className={`${styles.sticky} scroll-fade`}
        >
          <span className={styles.kicker}>Our Approach</span>
          <h2 className={styles.title}>
            Material<br />Principles
          </h2>
        </div>

        {/* RIGHT — SCROLL CONTENT */}
        <div className={styles.list}>
          {PRINCIPLES.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} scroll-fade`}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}

          <div className={styles.spacer} />
        </div>
      </div>
    </section>
  );
}