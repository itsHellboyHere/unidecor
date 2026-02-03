"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/app/css/ProductGrid.module.css";

export default function ProductGrid({ title, products = [] }) {
  if (!products.length) {
    return (
      <div className={styles.empty}>
        <p>No finishes found in this selection.</p>
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: i % 4 * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link href={`/products/${product.slug.current}`} className={styles.card}>
                <div className={styles.imageWrap}>
                  {product.image?.url && (
                    <Image 
                      src={product.image.url} 
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className={styles.image}
                    />
                  )}
                  <div className={styles.shimmer} />
                  
                  {/* Floating Badges */}
                  <div className={styles.badgeStack}>
                    <span className={styles.designCode}>{product.designCode}</span>
                    <span className={styles.finishTag}>{product.finish}</span>
                  </div>
                </div>
                
                <div className={styles.content}>
                  <h3 className={styles.name}>{product.name}</h3>
                  
                  <div className={styles.cardFooter}>
                    <div className={styles.details}>
                      <span className={styles.sizeLabel}>{product.size || "8ft × 4ft"}</span>
                    </div>
                    <div className={styles.arrowIcon}>
                      <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"/>
                      </svg>
                    </div>
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