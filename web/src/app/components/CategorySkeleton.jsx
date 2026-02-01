import styles from "@/app/css/CategorySkeleton.module.css";

export default function CategorySkeleton() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero} />

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.line} />
        <div className={styles.lineShort} />
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.feature} />
        ))}
      </section>

      {/* GRID */}
      <section className={styles.grid}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.card} />
        ))}
      </section>
    </>
  );
}