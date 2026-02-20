"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, MoveLeft, ShieldCheck, Ruler } from "lucide-react";
import styles from "@/app/product/css/ProductDescrption.module.css";

export default function ProductDescription({ product, relatedProducts }) {
  console.log("product ", product);
  const hasVariants = product?.variants?.length > 0;

  const categorySlug = product.collection?.category?.slug?.current;
  const collectionSlug = product.collection?.slug?.current;

  const isDirectCategory =
    categorySlug && collectionSlug && categorySlug === collectionSlug;

  const backHref =
    isDirectCategory
      ? `/products/${categorySlug}`
      : categorySlug && collectionSlug
        ? `/products/${categorySlug}/${collectionSlug}`
        : categorySlug
          ? `/products/${categorySlug}`
          : "/products";

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href={backHref} className={styles.backLink}>
            <MoveLeft size={18} />
            <span>Back to Collection</span>
          </Link>
          <div className={styles.brandTag}>UNIDECOR</div>
        </nav>

        <div className={styles.layout}>
          <aside className={styles.visualSide}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={styles.imageFrame}
            >
              {product.heroImage && (
                <img
                  src={product.heroImage.url}
                  alt={product.name}
                  className={styles.mainImg}
                />
              )}
            </motion.div>
          </aside>

          <section className={styles.contentSide}>
            <header className={styles.header}>
              {product.collection?.title && (
                <span className={styles.series}>
                  {product.collection.title}
                </span>
              )}

              <h1 className={styles.title}>{product.name}</h1>

              {!hasVariants && product.designCode && (
                <span className={styles.code}>
                  {product.designCode}
                </span>
              )}

              {!hasVariants && product.mrp && (
                <div className={styles.price}>
                  ₹ {product.mrp.toLocaleString()}
                </div>
              )}
            </header>

            {hasVariants && (
              <div className={styles.variantTableWrapper}>
                <h3 className={styles.tableHeading}>Available Variants</h3>
                <div className={styles.tableScroll}>
                  <table className={styles.variantTable}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Product Code</th>
                        <th>MRP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((variant, i) => (
                        <tr key={i}>
                          <td>{variant.size || "-"}</td>
                          <td className={styles.sku}>{variant.productCode || "-"}</td>
                          <td className={styles.tablePrice}>
                            {variant.mrp ? `₹ ${variant.mrp.toLocaleString()}` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {product.description?.length > 0 && (
              <div className={styles.description}>
                {product.description.map((block, i) => (
                  <p key={i}>{block.children?.[0]?.text}</p>
                ))}
              </div>
            )}
            {!hasVariants && (product.size || product.finish) && (
              <div className={styles.keySpecs}>
                {product.size && <Chip icon={<Ruler size={14} />} label="Size" value={product.size} />}
                {product.finish && <Chip icon={<ShieldCheck size={14} />} label="Finish" value={product.finish} />}
              </div>
            )}
            {product.coverage && (
              <div className={styles.coverage}>
                <strong>Coverage:</strong> {product.coverage}
                {product.coverageNote && (
                  <span className={styles.coverageNote}> ({product.coverageNote})</span>
                )}
              </div>
            )}



            {product.highlights?.length > 0 && (
              <Section title="Highlights">
                <List items={product.highlights} />
              </Section>
            )}

            {product.keyFeatures?.length > 0 && (
              <Section title="Key Features">
                <List items={product.keyFeatures} />
              </Section>
            )}

            {product.packing?.length > 0 && (
              <Section title="Packing">
                <div className={styles.packingChips}>
                  {product.packing.map((item, i) => (
                    <span key={i} className={styles.packingChip}>{item}</span>
                  ))}
                </div>
              </Section>
            )}

            {product.specifications?.length > 0 && (
              <Section title="Technical Specifications">
                <div className={styles.specTable}>
                  {product.specifications.map((spec, i) => (
                    <div key={i} className={styles.specRow}>
                      <div className={styles.specLabel}>
                        <span>{spec.label}</span>
                      </div>
                      <div className={styles.specDots}></div>
                      <div className={styles.specValue}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <div className={styles.actions}>
              <Link
                href={`/contact?type=product&slug=${product.slug.current}&title=${product.name}`}
                className={styles.primaryBtn}
              >
                Inquire for Sample <ChevronRight size={16} />
              </Link>
            </div>
          </section>

        </div>
        {relatedProducts?.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <h3 className={styles.relatedHeading}>You May Also Like</h3>
              <div className={styles.headingLine}></div>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  href={`/product/${item.slug.current}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImageWrapper}>
                    {item.heroImage && (
                      <img
                        src={item.heroImage.url}
                        alt={item.name}
                        className={styles.relatedImg}
                      />
                    )}
                    <div className={styles.relatedOverlay}>
                      <span>View Details</span>
                    </div>
                  </div>
                  <div className={styles.relatedInfo}>
                    <h4 className={styles.relatedTitle}>{item.name}</h4>
                    {item.designCode && (
                      <span className={styles.relatedCode}>
                        {item.designCode}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.subHeading}>{title}</h3>
      {children}
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div className={styles.specItem}>
      <span className={styles.specLabel}>{label}</span>
      <strong className={styles.specValue}>{value}</strong>
    </div>
  );
}

function List({ items }) {
  return (
    <ul className={styles.featureList}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Chip({ icon, label, value }) {
  return (
    <div className={styles.specChip}>
      {icon}
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}