"use client";

import styles from "@/app/css/MaterialStories.module.css";

export default function MaterialStories() {
  return (
    <section className={styles.container}>
      <div className={styles.inner}>
      <span className={styles.sectionKicker}>Material Stories</span>
      <div className={styles.card}>
        <div className={styles.segment}>

          {/* VIDEO 1 — PROCESS */}
          <div className={styles.videoOne}>
            <div className={styles.videoContainer}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={styles.video}
              >
                <source src="/videos/laminate-process.mp4" type="video/mp4" />
              </video>

              <div className={styles.overlay}>
                <span className={styles.kicker}>Craft</span>
                <h3 className={styles.title}>Material Engineering</h3>
              </div>
            </div>
          </div>

          {/* VIDEO 2 — APPLICATION */}
          <div className={styles.videoTwo}>
            <div className={styles.videoContainer}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={styles.video}
              >
                <source src="/videos/laminate-interior.mp4" type="video/mp4" />
              </video>

              <div className={styles.overlay}>
                <span className={styles.kicker}>Application</span>
                <h3 className={styles.title}>Designed Spaces</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}