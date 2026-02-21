"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/app/css/ProductGrid.module.css";

export default function ProductGrid({ title, products = [] }) {
  if (!products.length) {
    return (
      <div className={styles.empty}>
        <p>No products found in this section.</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {title && <h2 className={styles.heading}>{title}</h2>}

        <div className={styles.grid}>
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              // whileInView={{ opacity: 1, y: 0 }}
              animate={{opacity:1, y:0}}
              transition={{
                duration: 0.8,
                delay: (i % 4) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link href={`/product/${product.slug.current}`} className={styles.card}>
                <div className={styles.imageWrap}>
                  {product.image?.url && (
                    <Image
                      src={product.image.url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className={styles.image}
                      priority={i < 4}
                    />
                  )}
                  
           
                  <div className={styles.metaOverlay}>
                    {product.designCode && (
                      <span className={styles.designCode}>{product.designCode}</span>
                    )}
                  </div>
                </div>

                <div className={styles.content}>
                  {product.finish && (
                    <span className={styles.finishTag}>{product.finish}</span>
                  )}
                  <h3 className={styles.name}>{product.name}</h3>

                  <div className={styles.cardFooter}>
                    {product.size && (
                      <span className={styles.sizeLabel}>{product.size}</span>
                    )}
                    <span className={styles.viewLink}>Explore Series</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}