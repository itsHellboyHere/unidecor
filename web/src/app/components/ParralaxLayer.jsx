"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Global Parallax Component
 * @param {number} zIndex - Stack order (higher pulls over lower)
 * @param {string} trackHeight - Total scrollable distance (e.g., "120vh")
 * @param {number} speed - 0 to 1. How quickly the fade/scale finishes
 * @param {string} bgColor - Background color of the layer
 */
const ParallaxLayer = ({ 
  children, 
  zIndex = 1, 
  trackHeight = "100vh", 
  speed = 0.8,
  bgColor = "transparent"
}) => {
  const containerRef = useRef(null);

  // Offset "start start" means the animation begins exactly when 
  // the top of the container hits the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, speed], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, speed], [1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, speed], ["blur(0px)", "blur(10px)"]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: trackHeight, 
        position: "relative",
        zIndex: zIndex,
        backgroundColor: "transparent" 
      }}
    >
      <motion.div
        style={{
          opacity,
          scale,
        //   filter: blur,
          backgroundColor: bgColor,
          position: "sticky",
          top:"72px" ,
          height: "80vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxLayer;