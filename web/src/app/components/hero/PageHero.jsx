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
const heroImageUrl = image ? urlFor(image).width(1920).height(1080).url() : null;

  return (
    <section className={`${styles.hero} ${styles[size]}`}>
      {heroImageUrl && (
        <Image
          src={heroImageUrl}
          alt={heading}
          fill
          priority
          className={styles.image}
        />
      )}

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1>{heading}</h1>
        {subheading && <p>{subheading}</p>}
      </div>
    </section>
  );
}