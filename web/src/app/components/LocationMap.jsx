"use client";

import styles from "@/app/css/LocationMap.module.css";
import { motion } from "framer-motion";

export default function LocationMap() {
const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3500.3725606000426!2d77.42162507550252!3d28.67849997563961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQwJzQyLjYiTiA3N8KwMjUnMjcuMSJF!5e0!3m2!1sen!2sin!4v1771649327639!5m2!1sen!2sin";

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        animate={{opacity:1,y:0}}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.container}
        >
          <div className={styles.infoSide}>
            <div className={styles.header}>
              <span className={styles.tag}>Experience Centre</span>
              <h2 className={styles.title}>Our Showroom</h2>
              <p className={styles.description}>
                Step into our Ghaziabad showroom to explore our premium collection of laminates and interior surfaces in person.
              </p>
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <label>Address</label>
                <address>
                  236, New Arya Nagar,<br />
                  Ghaziabad, Uttar Pradesh 201001
                </address>
              </div>

              <div className={styles.detailItem}>
                <label>Visiting Hours</label>
                <p>Mon — Sat: 10:30 AM - 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>

              <div className={styles.detailItem}>
                <label>Get in Touch</label>
                {/* Callable Phone Link */}
                <p>
                  <a href="tel:+918527355586" className={styles.contactLink}>
                    +91 85273 55586
                  </a>
                </p>
                {/* Mailable Email Link */}
                <p>
                  <a href="mailto:info@theunidecor.com" className={styles.contactLink}>
                    info@theunidecor.com
                  </a>
                </p>
              </div>
            </div>
            
            <a 
              href="https://maps.app.goo.gl/8RQpKugjCiPsBtp2A"
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.directionsBtn}
            >
              Get Directions
            </a>
          </div>

          <div className={styles.mapSide}>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.iframe}
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}