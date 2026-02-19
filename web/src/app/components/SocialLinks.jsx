"use client";

import { FaFacebook ,FaWhatsapp, FaInstagram} from "react-icons/fa";
import styles from "@/app/css/SocialLinks.module.css";

export default function SocialLinks() {
  return (
    <div className={styles.socials}>
      <a href="#" aria-label="Instagram">
        <FaInstagram size={18} />
      </a>
      <a href="#" aria-label="Facebook">
        <FaFacebook size={18} />
      </a>
      <a href="https://wa.me/918527355586" target="_blank"  rel="noopener noreferrer" aria-label="WhatsApp">
        <FaWhatsapp size={18} />
      </a>
    </div>
  );
}