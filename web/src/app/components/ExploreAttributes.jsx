"use client";

import Link from "next/link";
import styles from "@/app/css/ExploreAttributes.module.css";

/**
 * Reusable attribute marquee
 * Works for categories, collections & filters
 */
export default function ExploreAttributes({
  title = "Explore Attributes",
  items = [],
}) {
  if (!items.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <span className={styles.kicker}>{title}</span>

        <div className={styles.marquee}>
          <div className={styles.track}>
            {[...items, ...items].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={styles.card}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}