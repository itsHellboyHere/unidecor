"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/css/KeyFeatures.module.css";
import { featureIconMap } from "@/app/components/icons/featureIcons";

export default function KeyFeatures({ 
  kicker = "Key Features",
  title,
  features,
}) {
  const itemsRef = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...new Set([...prev, entry.target])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!features || features.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* LEFT AREA */}
        <div className={styles.sticky}>
          {kicker && <span className={styles.kicker}>{kicker}</span>}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* RIGHT AREA - Horizontal Grid */}
        <div className={styles.list}>
          {features.map((item, index) => {
            const Icon = featureIconMap[item.icon];
            const isVisible = visibleItems.includes(itemsRef.current[index]);

            return (
              <div
                key={index}
                ref={el => (itemsRef.current[index] = el)}
                className={`${styles.item} ${isVisible ? styles.itemVisible : ""}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {Icon && <Icon size={24} strokeWidth={1.5} />}
                <div className={styles.itemContent}>
                  <h3>{item.label}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}