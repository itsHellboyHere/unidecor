import Link from "next/link";
import styles from "@/app/css/Home.CTA.module.css";
import Magnetic from "./Magnetic";

export default function ContactCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <p className={styles.label}>HAVE A PROJECT IN MIND?</p>
        <Magnetic strength={0.5}>
        <Link href="/contact" className={styles.ctaWrapper}>
        
          <div className={styles.circle}>
            <span className={styles.text}>Get in touch</span>
            <div className={styles.filler}></div>
          </div>
        </Link>
        </Magnetic>
        <h2 className={styles.footerTitle}>Let's create something <br/> extraordinary.</h2>
      </div>
    </section>
  );
}