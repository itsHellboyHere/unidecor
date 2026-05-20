"use client";

import styles from "@/app/css/Hero.module.css";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import PageLoader from "./PageLoader";

function VideoBackground({ src, poster, loop, onReady }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.bgVideo}
      src={src}
      poster={poster}
      muted
      loop={loop}
      playsInline
      preload="metadata"
      onCanPlay={onReady}   // ← fires when video is ready to play
    />
  );
}

export default function HeroCards({ slides }) {
  const [ready, setReady] = useState(false);

  const handleReady = () => setReady(true);

  // Fallback — dismiss loader after 4s max regardless
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(timeout);
  }, []);

  // If no videos at all — dismiss immediately
  useEffect(() => {
    const hasVideo = slides.some((s) => s.videoUrl);
    if (!hasVideo) setReady(true);
  }, [slides]);

  return (
    <>
      {/* Real loader — hides when first video canplay fires or 4s timeout */}
      <PageLoader hide={ready} />

      <section className={styles.wrapper}>
        {slides.map((slide, index) => (
          <Link href={slide.link} key={index}>
            <article
              className={styles.card}
              style={{ top: `${100 + index * 28}px` }}
            >
              {/* Background Layer */}
              <div className={styles.bg}>
                {slide.videoUrl ? (
                  <VideoBackground
                    src={slide.videoUrl}
                    poster={slide.posterUrl}
                    loop={slide.loop}
                    onReady={index === 0 ? handleReady : undefined} // only first video triggers loader dismiss
                  />
                ) : (
                  <div
                    className={styles.bgImage}
                    style={{ backgroundImage: `url(${slide.posterUrl})` }}
                  />
                )}
                <div className={styles.bgOverlay} />
              </div>

              {/* Content */}
              <div className={styles.content}>
                <span className={styles.eyebrow}>
                  0{index + 1} &nbsp;/&nbsp; 0{slides.length}
                </span>
                <h2 className={styles.heroTitle}>{slide.title}</h2>
                <div className={styles.titleDivider} />
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <div className={styles.exploreBtn}>
                  <span>Explore Now</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Badge bottom right */}
              <div className={styles.badge}>
                {slide.title.split(" ").slice(0, 2).join(" ")}
              </div>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
}