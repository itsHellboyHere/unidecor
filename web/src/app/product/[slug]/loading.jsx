import styles from "@/app/product/css/ProductSkeleton.module.css";

export default function LoadingProduct() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        {/* NAV */}
        <div className={styles.nav}>
          <div className={`${styles.skeleton} ${styles.back}`} />
          <div className={`${styles.skeleton} ${styles.brand}`} />
        </div>

        <div className={styles.layout}>

          {/* IMAGE */}
          <aside className={styles.visualSide}>
            <div className={`${styles.skeleton} ${styles.image}`} />
          </aside>

          {/* CONTENT */}
          <section className={styles.contentSide}>
            <div className={`${styles.skeleton} ${styles.series}`} />
            <div className={`${styles.skeleton} ${styles.title}`} />
            <div className={`${styles.skeleton} ${styles.code}`} />

            <div className={styles.description}>
              <div className={`${styles.skeleton} ${styles.line}`} />
              <div className={`${styles.skeleton} ${styles.line}`} />
              <div className={`${styles.skeleton} ${styles.lineShort}`} />
            </div>

            <div className={styles.metaRow}>
              <div className={`${styles.skeleton} ${styles.meta}`} />
              <div className={`${styles.skeleton} ${styles.meta}`} />
            </div>

            <div className={styles.specGrid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.specItem}>
                  <div className={`${styles.skeleton} ${styles.icon}`} />
                  <div className={styles.specText}>
                    <div className={`${styles.skeleton} ${styles.label}`} />
                    <div className={`${styles.skeleton} ${styles.value}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <div className={`${styles.skeleton} ${styles.buttonPrimary}`} />
              <div className={`${styles.skeleton} ${styles.buttonSecondary}`} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}