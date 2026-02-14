"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ShieldCheck,
    FileText,
    ChevronRight,
    MoveLeft,
    Ruler,
} from "lucide-react";

import styles from "@/app/product/css/ProductDescrption.module.css";

export default function ProductDescription({ product }) {
    const categorySlug = product.collection?.category?.slug?.current;
    const collectionSlug = product.collection?.slug?.current;

    const backHref =
        categorySlug && collectionSlug
            ? `/products/${categorySlug}/${collectionSlug}`
            : categorySlug
                ? `/products/${categorySlug}`
                : "/products";

    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>

                {/* TOP BAR */}
                <nav className={styles.nav}>
                    <Link href={backHref} className={styles.backLink}>
                        <MoveLeft size={18} />
                        <span>Back to Collection</span>
                    </Link>
                    <div className={styles.brandTag}>UNIDECOR</div>
                </nav>

                <div className={styles.layout}>

                    {/* IMAGE */}
                    <aside className={styles.visualSide}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={styles.imageFrame}
                        >
                            {/* subtle geometric shape */}
                            <div className={styles.shapeAccent} />

                            {product.heroImage && (
                                <img
                                    src={product.heroImage.url}
                                    alt={product.name}
                                    className={styles.mainImg}
                                />
                            )}

                            <div className={styles.glossOverlay} />

                            <div className={styles.batchNote}>
                                <strong>Note</strong>
                                <span>Actual shade may vary by batch.</span>
                            </div>
                        </motion.div>
                    </aside>

                    {/* CONTENT */}
                    <section className={styles.contentSide}>
                        <header className={styles.header}>
                            {product.collection?.title && (
                                <span className={styles.series}>
                                    {product.collection.title}
                                </span>
                            )}

                            <h1 className={styles.title}>{product.name}</h1>

                            {product.designCode && (
                                <span className={styles.code}>
                                    Design Code — {product.designCode}
                                </span>
                            )}
                        </header>

                        {/* DESCRIPTION */}
                        {product.description?.length > 0 && (
                            <div className={styles.description}>
                                {product.description.map((block, i) => (
                                    <p key={i}>{block.children?.[0]?.text}</p>
                                ))}
                            </div>
                        )}


                        {/* SIZE AND FINISH */}
                        {(product.size || product.finish) && (
                            <div className={styles.keySpecs}>
                                {product.size && (
                                    <div className={styles.specChip}>
                                        <Ruler size={14} />
                                        <span>
                                            <strong>Size</strong>
                                            {product.size}
                                        </span>
                                    </div>
                                )}

                                {product.finish && (
                                    <div className={styles.specChip}>
                                        <ShieldCheck size={14} />
                                        <span>
                                            <strong>Finish</strong>
                                            {product.finish}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SPECS */}
                        {product.specifications?.length > 0 && (
                            <div className={styles.specGrid}>
                                {product.specifications.map((spec, i) => (
                                    <Spec
                                        key={i}
                                        label={spec.label}
                                        value={spec.value}
                                    />
                                ))}
                            </div>
                        )}
                        {product.highlights?.length > 0 && (
                            <div className={styles.highlightSection}>
                                <h3 className={styles.subHeading}>Highlights</h3>
                                <ul className={styles.highlightList}>
                                    {product.highlights.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {product.coverage && (
                            <div className={styles.coverageBlock}>
                                <h3 className={styles.subHeading}>Coverage</h3>
                                <p>{product.coverage}</p>
                                {product.coverageNote && (
                                    <small className={styles.coverageNote}>
                                        {product.coverageNote}
                                    </small>
                                )}
                            </div>
                        )}
                        {product.packing?.length > 0 && (
                            <div className={styles.packingBlock}>
                                <h3 className={styles.subHeading}>Available Packing</h3>
                                <div className={styles.packingChips}>
                                    {product.packing.map((size, i) => (
                                        <span key={i} className={styles.packingChip}>
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* {product.application?.length > 0 && (
  <div className={styles.applicationBlock}>
    <h3 className={styles.subHeading}>Application</h3>
    {product.application.map((block, i) => (
      <p key={i}>{block.children?.[0]?.text}</p>
    ))}
  </div>
)} */}
                        {/* ACTIONS */}
                        <div className={styles.actions}>
                            <Link
                                href={`/contact?type=product&slug=${product.slug.current}&title=${product.name}`}
                                className={styles.primaryBtn}
                            >
                                Request Sample <ChevronRight size={16} />
                            </Link>

                            {/* <button className={styles.secondaryBtn}>
                                <FileText size={16} />
                                Technical Datasheet
                            </button> */}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

function Spec({ label, value }) {
    return (
        <div className={styles.specItem}>
            <div className={styles.specIconWrap}>
                <ShieldCheck size={14} />
            </div>
            <div className={styles.specText}>
                <span className={styles.specLabel}>{label}</span>
                <strong className={styles.specValue}>{value}</strong>
            </div>
        </div>
    );
}