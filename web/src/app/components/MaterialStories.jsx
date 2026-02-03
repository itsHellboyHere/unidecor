"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/css/MaterialStories.module.css";

export default function MaterialStories() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    const playVideo = (video) => {
      if (!video) return;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay blocked silently — expected behavior
        });
      }
    };

    playVideo(videoRef1.current);
    playVideo(videoRef2.current);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.sectionKicker}>Material Stories</span>

        <div className={styles.card}>
          <div className={styles.segment}>

            {/* VIDEO 1 */}
            <div className={styles.videoOne}>
              <div className={styles.videoContainer}>
                <video
                  ref={videoRef1}
                  muted
                  loop
                  playsInline
                  preload="auto"
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

            {/* VIDEO 2 */}
            <div className={styles.videoTwo}>
              <div className={styles.videoContainer}>
                <video
                  ref={videoRef2}
                  muted
                  loop
                  playsInline
                  preload="auto"
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