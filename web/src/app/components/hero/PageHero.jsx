'use client';

import Image from "next/image";
import styles from "@/app/css/PageHero.module.css";
import { urlFor } from "@/app/lib/sanity.image";

export default function PageHero({
  image,
  heading,
  subheading,
  size = "large",
}) {
  const heroImageUrl = image
    ? urlFor(image).width(1920).height(1080).url()
    : null;

  // Eyebrow — first word of heading, rest is title
  const words = heading ? heading.split(" ") : [];
  const eyebrow = words[0] || "";
  const title = words.slice(1).join(" ") || heading;

  return (
    <section className={`${styles.hero} ${styles[size]}`}>

      {/* Background Image */}
      {heroImageUrl && (
        <Image
          src={heroImageUrl}
          alt={heading}
          fill
          priority
          className={styles.image}
        />
      )}

      {/* Layered overlays for depth */}
      <div className={styles.overlayBase} />
      <div className={styles.overlayVignette} />
      <div className={styles.overlayBottom} />

      {/* Content */}
      <div className={styles.content}>

        {/* Left vertical accent line */}
        <div className={styles.accentLine} />

        <div className={styles.textBlock}>

          {/* Eyebrow */}
          {eyebrow && (
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDash} />
              {eyebrow}
            </span>
          )}

          {/* Title */}
          <h1 className={styles.title}>
            {title}
          </h1>

          {/* Gold divider line */}
          <div className={styles.divider} />

          {/* Subtitle */}
          {subheading && (
            <p className={styles.subtitle}>{subheading}</p>
          )}

        </div>
      </div>

      {/* Grain texture overlay */}
      <div className={styles.grain} />

    </section>
  );
}