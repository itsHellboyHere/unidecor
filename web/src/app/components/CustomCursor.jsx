"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorSize = isHovered ? 80 : 15; // Grows from 15px to 80px

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouse.x, smoothOptions);
  const smoothY = useSpring(mouse.y, smoothOptions);

  useEffect(() => {
    const manageMouseMove = (e) => {
      const { clientX, clientY } = e;
      // We check if the mouse is over anything "magnetic"
      const target = e.target;
      setIsHovered(target.closest('.magnetic-target'));

      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    };

    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, [cursorSize]);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
      style={{
        left: smoothX,
        top: smoothY,
        position: "fixed",
        backgroundColor: "#c5a059",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    />
  );
}