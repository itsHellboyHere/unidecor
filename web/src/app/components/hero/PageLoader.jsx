"use client";

import styles from "@/app/css/PageLoader.module.css";

export default function PageLoader({ hide }) {
  return (
    <div className={`${styles.loader} ${hide ? styles.hide : ""}`}>
      <div className={styles.logoWrap}>
        {"UNIDECOR".split("").map((char, i) => (
          <span
            key={i}
            className={styles.char}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className={styles.line} />
    </div>
  );
}