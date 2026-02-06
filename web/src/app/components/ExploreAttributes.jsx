"use client";
import Link from "next/link";
import styles from "@/app/css/ExploreAttributes.module.css";

export default function ExploreAttributes({
  title = "Explore Materials",
  items = [],
}) {
  if (!items.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.kicker}>{title}</span>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track}>
          {[...items, ...items, ...items].map((item, index) => (
            <Link key={index} href={item.href} className={styles.attributeCard}>
              <span className={styles.typeTag}>{item.type}</span>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.arrow}>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}