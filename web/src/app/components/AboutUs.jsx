"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Rocket,
  ShieldCheck,
  Zap,
  Heart,
  Sparkles,
  Box,
} from "lucide-react";
import styles from "@/app/css/About.module.css";
import Magnetic from "./Magnetic";
import Link from "next/link";

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
   PARALLAX WRAPPER
========================= */
const ParallaxSection = ({
  children,
  zIndex,
  bgColor = "transparent",
  extraScroll = 0.6,
  active = true,
  mobileActive = false,
}) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [trackHeight, setTrackHeight] = React.useState("auto");
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const shouldAnimate = active && (!isMobile || mobileActive);

  React.useEffect(() => {
    if (!wrapperRef.current || !shouldAnimate) {
      setTrackHeight("auto");
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const contentHeight = entry.contentRect.height;
      const viewport = window.innerHeight;
      const total = Math.max(
        contentHeight + viewport * extraScroll,
        contentHeight
      );
      setTrackHeight(`${total}px`);
    });

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [extraScroll, shouldAnimate, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [
    1,
    shouldAnimate ? 0.7 : 1,
  ]);
  const opacity = useTransform(scrollYProgress, [0, 1], [
    1,
    shouldAnimate ? 0 : 1,
  ]);

  return (
    <div
      ref={containerRef}
      className={styles.parallaxContainer}
      style={{
        minHeight: shouldAnimate ? trackHeight : "auto",
        position: "relative",
      }}
    >
      <motion.div
        ref={wrapperRef}
        className={styles.parallaxWrapper}
        style={{
          scale: shouldAnimate ? scale : 1,
          opacity: shouldAnimate ? opacity : 1,
          zIndex,
          backgroundColor: bgColor,
          position: shouldAnimate ? "sticky" : "relative",
          top: 0,
          height: shouldAnimate ? "100vh" : "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: shouldAnimate ? "center" : "flex-start",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* =========================
   ABOUT PAGE
========================= */
const AboutPage = () => {
  return (
    <main className={styles.container}>
      {/* 1. HERO */}
      <ParallaxSection zIndex={1} extraScroll={0.3} mobileActive>
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <span className={styles.kicker}>ESTABLISHED 2026</span> */}
            <h1 className={styles.title}>
              Built on Experience. Designed for Tomorrow.
            </h1>
            <p className={styles.subtitle}>
              UNIDECOR is an one stop solution for your all home based needs, delivering 
              decorative materials for modern interiors—backed by 10+ years
              of deep industry expertise.
            </p>
          </motion.div>
        </section>
      </ParallaxSection>

      {/* 2. STATS + STORY */}
      <ParallaxSection zIndex={2} bgColor="#fdfbf7">
        <div className={styles.section}>
          <div className={styles.statsBar}>
            {[
              { label: "Industry Experience", val: "10+ Years", icon: <Sparkles /> },
              // { label: "Product Portfolio", val: "500+ SKUs", icon: <ShieldCheck /> },
              { label: "Service Coverage", val: "Pan-India", icon: <Zap /> },
              { label: "Delivery Promise", val: "24–72 Hrs", icon: <Heart /> },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className={styles.statCard}>
                <div className={styles.statIcon}>{item.icon}</div>
                <span className={styles.statNumber}>{item.val}</span>
                <span className={styles.statLabel}>{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className={styles.grid} style={{ marginTop: "100px" }}>
            <TiltCard>
              <div className={styles.iconWrapper}><Rocket size={30} /></div>
              <h3 className={styles.cardTitle}>Our Story</h3>
              <p className={styles.cardText}>
                While Unidecor is a new brand, our foundation is built on over two
                decades of hands-on experience in sourcing, trading, and supplying
                architectural materials across India.
              </p>
            </TiltCard>

            <TiltCard>
              <div className={styles.iconWrapper}><Box size={30} /></div>
              <h3 className={styles.cardTitle}>What We Do</h3>
              <p className={styles.cardText}>
                From HD Acrylic Laminates and Charcoal Louvers to hardware and
                surface solutions, every product is curated, quality-checked,
                and sourced through trusted manufacturing partners.
              </p>
            </TiltCard>
          </div>
        </div>
      </ParallaxSection>

      {/* 3. VALUES (MOBILE SAFE OFFSET) */}
      <ParallaxSection zIndex={3} bgColor="#ffffff" mobileActive>
        <div className={styles.mobileSectionOffset}>
          <section className={styles.section} style={{ textAlign: "center" }}>
            <h2 className={styles.cardTitle} style={{ fontSize: "2.4rem" }}>
              Our Values
            </h2>
            <p className={styles.subtitle} style={{ marginBottom: "4rem" }}>
              Materials should elevate spaces—responsibly, reliably, and beautifully.
            </p>

            <div className={styles.grid}>
              <div className={styles.statCard}>
                <h4>Quality</h4>
                <p>Every product is personally vetted.</p>
              </div>
              <div className={styles.statCard}>
                <h4>Innovation</h4>
                <p>Constant evolution of design and technology.</p>
              </div>
              <div className={styles.statCard}>
                <h4>Customer First</h4>
                <p>Quick samples, flexible solutions.</p>
              </div>
              <div className={styles.statCard}>
                <h4>Integrity & Sustainability</h4>
                <p>Ethical practices and responsible sourcing.</p>
              </div>
            </div>
          </section>
        </div>
      </ParallaxSection>


      {/* 4. QUALITY CTA */}
      <ParallaxSection zIndex={4} bgColor="#ffffff" mobileActive>
        <section className={styles.section} style={{ textAlign: "center" }}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={styles.card3d}
            style={{
              background: "#fdfbf7",
              border: "1px solid rgba(197,160,89,0.25)",
              padding: "80px 40px",
            }}
          >
            <ShieldCheck size={40} color="#c5a059" />

            <h2 style={{ marginTop: "24px" }}>
              Quality Isn’t a Claim.<br />It’s a Process.
            </h2>

            <p
              style={{
                opacity: 0.85,
                marginTop: "1rem",
                maxWidth: "520px",
                marginInline: "auto",
              }}
            >
              Discover how every Unidecor product is vetted, tested, stored, and
              supported—backed by over two decades of industry experience.
            </p>

            <Magnetic strength={0.4}>
              <Link href="/quality-standards">
                <button className={styles.button} style={{ marginTop: "32px" }}>
                  View Our Quality Standards
                </button>
              </Link>
            </Magnetic>
          </motion.div>
        </section>
      </ParallaxSection>
    </main>
  );
};

export default AboutPage;