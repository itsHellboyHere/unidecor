// app/inspiration/kitchen/loading.jsx
import styles from "@/app/css/DepartMentGallery.module.css";

export default function Loading() {
  return (
    <section className={styles.section}>
      {/* HEADER SKELETON */}
      <div className={styles.header}>
        <span className={styles.subtitleSkeleton} />
        <div className={styles.titleSkeleton} />
      </div>

      {/* GRID SKELETON */}
      <div className={styles.grid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`${styles.galleryItem} ${styles[`item${index + 1}`]} ${styles.skeleton}`}
          >
            <div className={styles.shimmer} />
          </div>
        ))}
      </div>
    </section>
  );
}