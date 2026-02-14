"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import styles from "../css/MasonryGallery.module.css";

export default function MasonryGallery({ title, subtitle, items = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoom, setZoom] = useState(1);

  const resetZoom = () => setZoom(1);

  const showNext = useCallback(() => {
    resetZoom();
    setSelectedIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const showPrev = useCallback(() => {
    resetZoom();
    setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.min(prev + 0.5, 3)); 
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.max(prev - 0.5, 1)); 
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "+") setZoom(z => Math.min(z + 0.5, 3));
      if (e.key === "-") setZoom(z => Math.max(z - 0.5, 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        <h1 className={styles.title}>{title}</h1>
      </header>

      <div className={styles.masonryContainer}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={styles.masonryItem}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
            onClick={() => {
              resetZoom();
              setSelectedIndex(index);
            }}
          >
            <div className={styles.imageWrapper}>
              <img src={item.src} alt={item.title} className={styles.image} loading="lazy" />
              <div className={styles.overlay}>
                <div className={styles.category}>{item.category}</div>
                <h3 className={styles.captionTitle}>{item.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.topControls}>
              <button className={styles.controlBtn} onClick={handleZoomIn} title="Zoom In">
                <Plus size={24} />
              </button>
              <button className={styles.controlBtn} onClick={handleZoomOut} title="Zoom Out">
                <Minus size={24} />
              </button>
              <button className={styles.controlBtn} onClick={() => setSelectedIndex(null)} title="Close">
                <X size={24} />
              </button>
            </div>

            <button className={styles.navBtnPrev} onClick={(e) => { e.stopPropagation(); showPrev(); }}>
              <ChevronLeft size={40} />
            </button>

        
            <motion.div 
              key={selectedIndex}
              className={styles.lightboxContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, scale: zoom }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                scale: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={items[selectedIndex].src} 
                  alt={items[selectedIndex].title} 
                  className={styles.lightboxImage}
                />
              </div>
              <div className={styles.lightboxInfo}>
                <span className={styles.lightboxCategory}>{items[selectedIndex].category}</span>
                <h3 className={styles.lightboxTitle}>{items[selectedIndex].title}</h3>
              </div>
            </motion.div>

            <button className={styles.navBtnNext} onClick={(e) => { e.stopPropagation(); showNext(); }}>
              <ChevronRight size={40} />
            </button>

            <div className={styles.backdrop} onClick={() => setSelectedIndex(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}