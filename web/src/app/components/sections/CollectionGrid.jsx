"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "@/app/css/CollectionGrid.module.css";
import { urlFor } from "@/app/lib/sanity.image";

export default function CollectionGrid({ kicker, title, items, baseSlug }) {
  if (!items || items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* HEADER: Minimalist Architectural Alignment */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          {kicker && <span className={styles.kicker}>{kicker}</span>}
          <h2 className={styles.title}>{title}</h2>
        </motion.div>

        {/* GRID: High Vertical Breathing Room */}
        <div className={styles.grid}>
          {items.map((item, i) => {
            const imageUrl = item.hero?.image
              ? urlFor(item.hero.image).width(800).height(1000).url()
              : null;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`${baseSlug}/${item.slug.current}`}
                  className={styles.card}
                >
                  <div className={styles.imageWrap}>
                    {imageUrl && (
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    )}
                    <div className={styles.overlay} />
                  </div>

                  {/* CONTENT: Detached architectural label */}
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>
                      {item.title}
                    </h3>
                    <span className={styles.arrow}>→</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}