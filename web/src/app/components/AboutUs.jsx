"use client";
import React, { useRef} from "react";
import { motion ,useScroll, useTransform} from "framer-motion";
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
      // If content is taller than viewport, we need to ensure the 
      // track is at least long enough to scroll through the whole thing
      const total = Math.max(contentHeight + (viewport * extraScroll), contentHeight);
      setTrackHeight(`${total}px`);
    });

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [extraScroll, shouldAnimate, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, shouldAnimate ? 0.7 : 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, shouldAnimate ? 0 : 1]);

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
          justifyContent: shouldAnimate ? "center" : "flex-start"
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
      
      {/* 1. HERO SECTION */}
      <ParallaxSection zIndex={1} extraScroll={0.3} mobileActive={true}>
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: "#c5a059", fontWeight: 600, letterSpacing: "0.2em", fontSize: "12px" }}>
              ESTABLISHED 2026
            </span>
            <h1 className={styles.title}>Built for Modern Interiors.</h1>
            <p className={styles.subtitle}>
              Unidecor is a surface solutions brand focused on precision-engineered
              laminates and plywood for contemporary interiors.
            </p>
          </motion.div>
        </section>
      </ParallaxSection>

      {/* 2. STATS & IDENTITY (Pulls over Hero) */}
      <ParallaxSection zIndex={2} bgColor="#fdfbf7" >
        <div className={styles.section}>
          <div className={styles.statsBar}>
            {[
              { label: "Design Options", val: "100+", icon: <Sparkles /> },
              { label: "Layered Construction", val: "15-Layer", icon: <ShieldCheck /> },
              { label: "Manufacturing Standard", val: "Industry 4.0", icon: <Zap /> },
              { label: "Sustainable Focus", val: "Responsible", icon: <Heart /> },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className={styles.statCard}>
                <div style={{ color: "#c5a059", marginBottom: "12px" }}>{item.icon}</div>
                <span className={styles.statNumber}>{item.val}</span>
                <span style={{ color: "#777", fontSize: "0.85rem" }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
            
          <div className={styles.grid} style={{ marginTop: "100px"}}>
            <TiltCard>
              <div className={styles.iconWrapper}><Rocket size={30} /></div>
              <h3 className={styles.cardTitle}>Our Identity</h3>
              <p className={styles.cardText}>Engineered for architects who value material integrity and long-term performance.</p>
            </TiltCard>
            <TiltCard>
              <div className={styles.iconWrapper}><Box size={30} /></div>
              <h3 className={styles.cardTitle}>How We Build</h3>
              <p className={styles.cardText}>Through calibrated plywood cores and advanced surface finishes for daily-use durability.</p>
            </TiltCard>
          </div>
        </div>
      </ParallaxSection>

      {/* 3. BELIEFS */}
      <ParallaxSection zIndex={3} bgColor="#ffffff" mobileActive={true}>
        <section className={styles.section} style={{ textAlign: "center" }}>
          <h2 className={styles.cardTitle} style={{ fontSize: "2.4rem" }}>What We Believe</h2>
          <p className={styles.subtitle} style={{ marginBottom: "4rem" }}>
            Materials shape spaces. We believe they should be safe, precise, and beautiful.
          </p>
          <div className={styles.grid}>
            <div className={styles.statCard}>
              <h4>Material Integrity</h4>
              <p style={{ color: "#777", fontSize: "0.9rem", marginTop: "10px" }}>Fully composed cores — no shortcuts.</p>
            </div>
            <div className={styles.statCard}>
              <h4>Design Clarity</h4>
              <p style={{ color: "#777", fontSize: "0.9rem", marginTop: "10px" }}>Clean textures designed to age gracefully.</p>
            </div>
            <div className={styles.statCard}>
              <h4>Responsibility</h4>
              <p style={{ color: "#777", fontSize: "0.9rem", marginTop: "10px" }}>Conscious sourcing and reduced waste.</p>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* 4. FINAL CTA (End of scroll) */}
<ParallaxSection zIndex={4} bgColor="#ffffff" mobileActive={true}>
        <section className={styles.section} style={{ textAlign: "center" }}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={styles.card3d}
            style={{ 
              background: "#333230", 
              color: "white", 
              padding: "80px 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center" 
            }}
          >
            <h2 style={{ fontSize: "2.5rem" }}>Explore the Unidecor Collection</h2>
            <p style={{ opacity: 0.8, marginTop: "1rem", maxWidth: "500px", margin: "1rem auto" }}>
              Download our latest surface catalogue and technical overview.
            </p>

        
            <Magnetic strength={0.4}>
              <Link href={"/catalogue"}>
              <button className={styles.button}
             
              >
                View Catalogue
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