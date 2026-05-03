"use client";

import { motion } from "framer-motion";
import styles from "@/app/css/HeroBackground.module.css";

// ─── Animation definitions from Figmotion export ─────────────────────────────

const animations = {
  blob_left: {
    opacity: [0.3, 1, 0.3],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.5, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  blob_right: {
    opacity: [0.2, 1, 0.2],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.5, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  center_pour: {
    opacity: [0.1, 0.9, 0.1],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.5, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  navy_blue: {
    opacity: [0.15, 1, 1, 0.15],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.375, 0.75, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  golden: {
    opacity: [0.2, 1, 0.2],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.625, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  dusty_pink: {
    opacity: [0.1, 0.9, 0.1],
    scale: [0.5, 1.3, 0.5],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.4375, 1],
        duration: 8,
        repeat: Infinity,
      },
      scale: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.4375, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  sage_green: {
    opacity: [0.15, 0.9, 0.15],
    scale: [0.6, 1.4, 0.6],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.25, 1],
        duration: 8,
        repeat: Infinity,
      },
      scale: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.25, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  cherry_red: {
    opacity: [0.1, 0.95, 0.1],
    scale: [0.4, 1.5, 0.4],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.75, 1],
        duration: 8,
        repeat: Infinity,
      },
      scale: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.75, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  marble_white: {
    opacity: [0.1, 0.8, 0.1],
    scale: [0.7, 1.6, 0.7],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.625, 1],
        duration: 8,
        repeat: Infinity,
      },
      scale: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.625, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  vein_1: {
    opacity: [0, 0.6, 0],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.5, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  vein_2: {
    opacity: [0, 0.5, 0],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.375, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
  vein_3: {
    opacity: [0, 0.7, 0],
    transition: {
      opacity: {
        type: "keyframes",
        ease: [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]],
        times: [0, 0.625, 1],
        duration: 8,
        repeat: Infinity,
      },
    },
  },
};

export default function HeroBackground() {
  return (
    <div className={styles.root}>
      {/* Base wash */}
      <div className={styles.baseWash} />

      {/* Blob left — warm amber */}
      <motion.div
        className={styles.blobLeft}
        animate={animations.blob_left}
      />

      {/* Blob right — sea green */}
      <motion.div
        className={styles.blobRight}
        animate={animations.blob_right}
      />

      {/* Center pour */}
      <motion.div
        className={styles.centerPour}
        animate={animations.center_pour}
      />

      {/* Splash — navy blue */}
      <motion.div
        className={styles.navyBlue}
        animate={animations.navy_blue}
      />

      {/* Splash — golden */}
      <motion.div
        className={styles.golden}
        animate={animations.golden}
      />

      {/* Splash — dusty pink */}
      <motion.div
        className={styles.dustyPink}
        animate={animations.dusty_pink}
      />

      {/* Splash — sage green */}
      <motion.div
        className={styles.sageGreen}
        animate={animations.sage_green}
      />

      {/* Splash — cherry red */}
      <motion.div
        className={styles.cherryRed}
        animate={animations.cherry_red}
      />

      {/* Splash — marble white */}
      <motion.div
        className={styles.marbleWhite}
        animate={animations.marble_white}
      />

      {/* Marble veins */}
      <motion.div className={styles.vein1} animate={animations.vein_1} />
      <motion.div className={styles.vein2} animate={animations.vein_2} />
      <motion.div className={styles.vein3} animate={animations.vein_3} />

      {/* Top light source */}
      <div className={styles.lightTop} />

      {/* Dark overlay so text stays readable */}
      <div className={styles.overlay} />
    </div>
  );
}