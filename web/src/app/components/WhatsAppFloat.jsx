"use client";

import { MessageCircle } from "lucide-react";
import styles from "@/app/css/WhatsAppFLoat.module.css";

export default function WhatsAppFloat() {
  const phoneNumber = "919810166841";
  const message = encodeURIComponent("Hello Unidecor, I need more information");

  return (
    <div className={styles.container}>
      {/* The Tooltip */}
      <span className={styles.tooltip}>Chat with us!</span>

      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.float}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} strokeWidth={2.5} />
      </a>
    </div>
  );
}