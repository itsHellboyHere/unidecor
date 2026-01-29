"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/css/StatsStrip.module.css";

const STATS = [
  { label: "Years of Experience", value:5, suffix: "+" },
  { label: "Interior Products", value: 102, suffix: "+" },
  { label: "Dealer Network", value: 300, suffix: "+" },
  { label: "Cities Served", value: 50, suffix: "+" },
];

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startTime = performance.now();
        const duration = 1200;

        const animate = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsStrip() {
  return (
    <section className={styles.strip}>
      <div className={styles.inner}>
        <div className={styles.kickerWrap}>
          <span className={styles.kicker}>At a Glance</span>
        </div>
        {STATS.map((item, index) => (
          <div key={index} className={styles.stat}>
            <div className={styles.number}>
              <AnimatedNumber value={item.value} />
              <span className={styles.suffix}>{item.suffix}</span>
            </div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}