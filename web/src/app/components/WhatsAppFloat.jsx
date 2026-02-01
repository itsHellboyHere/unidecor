
"use client";

import { MessageCircle } from "lucide-react";
import styles from "@/app/css/WhatsAppFLoat.module.css";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919999999999?text=Hello%20Unidecor%2C%20I%20need%20more%20information"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}