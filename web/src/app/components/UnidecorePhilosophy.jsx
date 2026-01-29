"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/css/Philosophy.module.css";

export default function UnidecorPhilosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.isVisible);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "40% 0px -20% 0px",
  }
);

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>

        {/* TEXT */}
        <div
          data-reveal
          className={`${styles.content} ${styles.revealText}`}
        >
          <span className={styles.kicker}>Our Foundation</span>
          <h2 className={styles.title}>The Unidecor Philosophy</h2>

          <p className={styles.text}>
            At Unidecor, we don’t just manufacture interior products —
            we engineer material systems for modern Indian spaces.
          </p>

          <p className={styles.textMuted}>
            Materials should elevate spaces and stand the test of time.
          </p>
        </div>

        {/* VIDEO */}
        <div
          data-reveal
          className={`${styles.videoWrap} ${styles.revealVideo}`}
        >
          <iframe
            src="https://www.youtube.com/embed/G4Tl3vmHxPo?controls=0&playsinline=1"
            loading="lazy"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
}