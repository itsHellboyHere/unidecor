import { Suspense } from "react";
import ContactForm from "./comp/ContactForm";
import styles from "./css/Contact.module.css";

export const metadata = {
  title: "Contact Unidecor | Get in Touch for Interior Solutions",
  description:
    "Contact Unidecor for premium laminates, wall panels, and interior surface solutions. Reach out for product inquiries, partnerships, or project support across India.",
  keywords: [
    "Contact Unidecor",
    "Unidecor contact",
    "Interior laminates enquiry",
    "Wall panels supplier",
    "Interior surface solutions India",
  ],
  openGraph: {
    title: "Contact Unidecor | Interior Surface Solutions",
    description:
      "Have a question or project in mind? Contact Unidecor for expert guidance on laminates, wall panels, and premium interior materials.",
    url: "https://theunidecor.com/contact",
    siteName: "Unidecor",
    images: [
      {
        url: "/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Contact Unidecor – Interior Surface Solutions",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.unidecor.com/contact",
  },
};

const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4037588669826!2d77.42398847536013!3d28.677566375640133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1de544d1373%3A0xa4a8b5b025f90a9d!2sUNIDECOR!5e0!3m2!1sen!2sin!4v1779255143663!5m2!1sen!2sin";
const MAP_LINK = "https://maps.app.goo.gl/dsj3i9fs4iyH7nPq5";

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: "url('/contact-hero.jpg')" }}
        />
        <div className={styles.heroOverlayBase} />
        <div className={styles.heroOverlayBottom} />
       <div className={styles.heroContent}>
  <span className={styles.heroEyebrow}>
    <span className={styles.heroEyebrowDash} />
    Get in Touch
  </span>
  <h1 className={styles.heroTitle}>Contact Us</h1>
</div>
      </section>

      {/* ── Contact Form — untouched ── */}
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>

      {/* ── Map ── */}
      <section className={styles.mapSection}>
        <div className={styles.mapInner}>
          <div className={styles.mapHeader}>
            <span className={styles.mapEyebrow}>
              <span className={styles.mapEyebrowDash} />
              Find Us
            </span>
            <h2 className={styles.mapTitle}>Our Showroom</h2>
            <p className={styles.mapAddress}>
              236, opposite Bajaj Agency, New Arya Nagar, Patel Nagar, Ghaziabad, UP 201001
            </p>
          </div>

          <div className={styles.mapWrap}>
            {/* Clickable overlay — opens Maps app on mobile */}
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
              className={styles.mapIframe}
            />
          </div>
        </div>
      </section>
    </>
  );
}