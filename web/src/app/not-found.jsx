"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft, Grid, Layers, Box } from "lucide-react";
import styles from "@/app/css/NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* Floating 3D Element */}
        <div className={styles.visualArea}>
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={styles.floatingPanel}
          >
            404
          </motion.div>
        </div>

        <div className={styles.content}>
          <span className={styles.kicker}>Design Disruption</span>
          <h1 className={styles.title}>This surface is <br/><span>yet to be defined.</span></h1>
          <p className={styles.desc}>
            The page you are looking for has been misplaced or moved. 
            Perhaps it's hidden behind a premium louver or a charcoal panel.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryBtn}>
              <MoveLeft size={18} /> Back to Studio
            </Link>
          </div>

          {/* Quick Navigation into Verse */}
          <div className={styles.verseLinks}>
            <p>Explore our collections:</p>
            <div className={styles.linkGrid}>
              <Link href="/products/laminates/acrylic-laminates">
                <Layers size={16} /> <span>Acrylics</span>
              </Link>
              <Link href="/products/wall-panel/louver-panel">
                <Grid size={16} /> <span>Louvers</span>
              </Link>
              <Link href="/products/laminates/pvc-laminates">
                <Box size={16} /> <span>PVC</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}