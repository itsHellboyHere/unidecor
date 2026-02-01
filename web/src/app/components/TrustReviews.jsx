"use client";

import { useEffect, useState } from "react";
import styles from "@/app/css/TrustReviews.module.css";

const REVIEWS = [
  {
    name: "Rohit Mehra",
    role: "Interior Designer · Delhi",
    text:
      "The laminate quality is exceptional. Finish consistency and durability are top-notch, especially for premium residential projects.",
    avatar: "/reviews/user-1.jpg",
  },
  {
    name: "Ananya Kapoor",
    role: "Architect · Mumbai",
    text:
      "Unidecor materials elevate spaces without feeling over-designed. The surfaces feel refined and timeless.",
    avatar: "/reviews/user-2.jpg",
  },
  {
    name: "Vikram Shah",
    role: "Residential Contractor",
    text:
      "Reliable sheets, accurate specs, and minimal wastage onsite. That matters a lot at execution stage.",
    avatar: "/reviews/user-3.jpg",
  },
];

export default function TrustReviews() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex(i => (i + 1) % REVIEWS.length);
        setVisible(true);
      }, 350);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const review = REVIEWS[index];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.kicker}>Professional Trust</span>
        <h2 className={styles.title}>Trusted by Design Experts</h2>

        <div
          className={`${styles.card} ${
            visible ? styles.enter : styles.exit
          }`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <p className={styles.text}>{review.text}</p>

          <div className={styles.user}>
            <img src={review.avatar} alt={review.name} />
            <div>
              <strong>{review.name}</strong>
              <span>{review.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}