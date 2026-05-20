"use client";

import styles from "@/app/css/LocationMap.module.css";
import { motion } from "framer-motion";

const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4037588669826!2d77.42398847536013!3d28.677566375640133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1de544d1373%3A0xa4a8b5b025f90a9d!2sUNIDECOR!5e0!3m2!1sen!2sin!4v1779255143663!5m2!1sen!2sin";
const MAP_LINK = "https://maps.app.goo.gl/dsj3i9fs4iyH7nPq5";

export default function LocationMap() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className={styles.container}
        >
          {/* ── Info Side ── */}
          <div className={styles.infoSide}>

            <div className={styles.header}>
              <span className={styles.tag}>
                <span className={styles.tagDash} />
                Experience Centre
              </span>
              <h2 className={styles.title}>Our Showroom</h2>
              <div className={styles.divider} />
              <p className={styles.description}>
                Step into our Ghaziabad showroom to explore our premium
                collection of laminates and interior surfaces in person.
              </p>
            </div>

            <div className={styles.details}>

              <div className={styles.detailItem}>
                <label className={styles.label}>Address</label>
                <address className={styles.address}>
                  236, opposite Bajaj Agency,<br />
                  New Arya Nagar, Patel Nagar,<br />
                  Ghaziabad, Uttar Pradesh 201001
                </address>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <label className={styles.label}>Visiting Hours</label>
                  <p>Mon – Sat: 10:30 AM – 7:00 PM</p>
                  <p className={styles.closed}>Sunday: Closed</p>
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.label}>Get in Touch</label>
                  <p>
                     <a href="tel:+918527355586" className={styles.contactLink}>
                    +91 85273 55586
                  </a>
                  </p>
                  <p>
                    <a href="mailto:info@theunidecor.com" className={styles.contactLink}>
                      info@theunidecor.com
                    </a>
                  </p>
                </div>
              </div>

            </div>

            {/* Opens Google Maps app on mobile, browser on desktop */}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Get Directions
            </a>

          </div>

          {/* ── Map Side ── */}
          <div className={styles.mapSide}>
            {/* Clickable overlay — opens maps app/browser on click */}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapOverlay}
              aria-label="Open in Google Maps"
            />
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.iframe}
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}