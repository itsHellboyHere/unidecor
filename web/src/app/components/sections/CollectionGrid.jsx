import Link from "next/link";
import styles from "@/app/css/CollectionGrid.module.css";
import { urlFor } from "@/app/lib/sanity.image";

export default function CollectionGrid({ kicker, title, items, baseSlug }) {
  if (!items || items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* HEADER */}
        <div className={styles.header}>
          {kicker && <span className={styles.kicker}>{kicker}</span>}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {items.map((item) => {
            const imageUrl = item.hero?.image
              ? urlFor(item.hero.image).width(900).height(600).url()
              : null;

            return (
              <Link
                key={item._id}
                href={`${baseSlug}/${item.slug.current}`}
                className={styles.card}
              >
                {/* IMAGE */}
                {imageUrl && (
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                )}

                {/* GRADIENT */}
                <div className={styles.overlay} />

                {/* TEXT */}
                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>
                    {item.title}
                    <span className={styles.arrow}> →</span>
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}