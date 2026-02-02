"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  ShieldCheck,
  Zap,
  Heart,
  Sparkles,
  Box,
} from "lucide-react";
import styles from "@/app/css/About.module.css";

/* =========================
   3D TILT CARD
========================= */
const TiltCard = ({ children }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    ref.current.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.card3d}
    >
      {children}
    </div>
  );
};

/* =========================
   ABOUT PAGE
========================= */
const AboutPage = () => {
  return (
    <main className={styles.container}>
      {/* =========================
         HERO
      ========================= */}
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span
            style={{
              color: "#c5a059",
              fontWeight: 600,
              letterSpacing: "0.2em",
              fontSize: "12px",
            }}
          >
            ESTABLISHED 2026
          </span>

          <h1 className={styles.title}>Built for Modern Interiors.</h1>

          <p className={styles.subtitle}>
            Unidecor is a surface solutions brand focused on precision-engineered
            laminates and plywood for contemporary residential and commercial
            interiors — designed to perform, built to last.
          </p>
        </motion.div>
      </section>

      {/* =========================
         STATS STRIP
      ========================= */}
      <div className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.statsBar}>
          {[
            {
              label: "Design Options",
              val: "100+",
              icon: <Sparkles />,
            },
            {
              label: "Layered Construction",
              val: "15-Layer",
              icon: <ShieldCheck />,
            },
            {
              label: "Manufacturing Standard",
              val: "Industry 4.0",
              icon: <Zap />,
            },
            {
              label: "Sustainable Focus",
              val: "Responsible",
              icon: <Heart />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className={styles.statCard}
            >
              <div
                style={{
                  color: "#c5a059",
                  marginBottom: "12px",
                }}
              >
                {item.icon}
              </div>
              <span className={styles.statNumber}>{item.val}</span>
              <span
                style={{
                  color: "#777",
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================
         IDENTITY & PROCESS
      ========================= */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <TiltCard>
            <div className={styles.iconWrapper}>
              <Rocket size={30} />
            </div>
            <h3 className={styles.cardTitle}>Our Identity</h3>
            <p className={styles.cardText}>
              Unidecor was created to serve architects, designers, and builders
              who value consistency, material integrity, and long-term
              performance. Every surface is engineered with purpose.
            </p>
          </TiltCard>

          <TiltCard>
            <div className={styles.iconWrapper}>
              <Box size={30} />
            </div>
            <h3 className={styles.cardTitle}>How We Build</h3>
            <p className={styles.cardText}>
              Through calibrated plywood cores, controlled pressing, and
              advanced surface finishes, our materials are built to maintain
              stability, finish clarity, and daily-use durability.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* =========================
         BELIEFS
      ========================= */}
      <section
        className={styles.section}
        style={{ textAlign: "center", background: "#fff" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2
            className={styles.cardTitle}
            style={{ fontSize: "2.4rem" }}
          >
            What We Believe
          </h2>

          <p
            className={styles.subtitle}
            style={{ margin: "0 auto 4rem auto" }}
          >
            Materials shape spaces. We believe they should be safe, precise, and
            quietly beautiful — without unnecessary complexity.
          </p>

          <div className={styles.grid}>
            <div className={styles.statCard}>
              <h4>Material Integrity</h4>
              <p
                style={{
                  color: "#777",
                  fontSize: "0.9rem",
                  marginTop: "10px",
                }}
              >
                Fully composed cores and controlled bonding — no shortcuts.
              </p>
            </div>

            <div className={styles.statCard}>
              <h4>Design Clarity</h4>
              <p
                style={{
                  color: "#777",
                  fontSize: "0.9rem",
                  marginTop: "10px",
                }}
              >
                Clean textures and finishes designed to age gracefully.
              </p>
            </div>

            <div className={styles.statCard}>
              <h4>Responsible Manufacturing</h4>
              <p
                style={{
                  color: "#777",
                  fontSize: "0.9rem",
                  marginTop: "10px",
                }}
              >
                Conscious sourcing and reduced material waste.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================
         FINAL CTA
      ========================= */}
      <section className={styles.section} style={{ textAlign: "center" }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={styles.card3d}
          style={{
            background: "#333230",
            color: "white",
          }}
        >
          <h2 style={{ fontSize: "2rem" }}>
            Explore the Unidecor Collection
          </h2>
          <p style={{ opacity: 0.8, marginTop: "1rem" }}>
            Download our latest surface catalogue and technical overview.
          </p>
          <button className={styles.button}>
            View Catalogue
          </button>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;