"use client";

import { useState } from "react";
import Link from "next/link";
import SocialLinks from "@/app/components/SocialLinks";
import styles from "@/app/css/Footer.module.css";

const COMPANY = [
  { label: "Home", href: "/" },
  { label: "Our Identity", href: "/about-us" },
  { label: "Downloads", href: "/downloads" },
  { label: "Quality Standards", href: "/quality-standards" },
  { label: "Contact", href: "/contact" },
  {label:"Inspiration", href:"/inspiration"},
];

export default function FooterClient({ data }) {
  const { products = [] } = data || {};
  const [openCat, setOpenCat] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  const toggleCat = (id) => setOpenCat((p) => (p === id ? null : id));
  const toggleSection = (s) => setOpenSection((p) => (p === s ? null : s));

  return (
    <footer className={styles.footer}>

      {/* ── TOP STRIP ── */}
      <div className={styles.topStrip}>
        <span className={styles.tagline}>Premium Interior Surfaces — Crafted for India</span>
        <Link href="/contact" className={styles.ctaBtn}>Get in Touch</Link>
      </div>

      {/* ── MAIN GRID ── */}
      <div className={styles.main}>
        <div className={styles.inner}>

          {/* BRAND COL */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoWrap}>
              <img src="/logo-footer.png" alt="Unidecor" className={styles.logo} />
            </Link>
            <p className={styles.brandText}>
              Premium decorative surfaces crafted for modern interiors —
              combining durability, design, and lasting performance.
            </p>
            <SocialLinks />
          </div>

          {/* COMPANY — DESKTOP */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Company</h4>
            <ul className={styles.linkList}>
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.navA}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLLECTIONS — DESKTOP */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Collections</h4>
            <ul className={styles.linkList}>
              {products.map((cat) => (
                <li key={cat._id} className={styles.catItem}>
                  <Link href={`/products/${cat.slug.current}`} className={styles.navA}>
                    {cat.title}
                  </Link>
                  {cat.children?.length > 0 && (
                    <ul className={styles.subList}>
                      {cat.children.map((sub) => (
                        <li key={sub._id}>
                          <Link href={`/products/${cat.slug.current}/${sub.slug.current}`} className={styles.subA}>
                            {sub.title}
                          </Link>
                          {sub.children?.length > 0 && (
                            <ul className={styles.lvl3List}>
                              {sub.children.map((leaf) => (
                                <li key={leaf._id}>
                                  <Link href={`/products/${cat.slug.current}/${sub.slug.current}/${leaf.slug.current}`} className={styles.leafA}>
                                    {leaf.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT COL */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Get in Touch</h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactLabel}>Gaurav Jain</span>
                <a href="tel:+918527555909" className={styles.contactVal}>+91 85275 55909</a>
              </li>
              <li>
                <span className={styles.contactLabel}>Sunayana Jain</span>
                <a href="tel:+918527355586" className={styles.contactVal}>+91 85273 55586</a>
              </li>
              <li>
                <span className={styles.contactLabel}>Email</span>
                <a href="mailto:info@theunidecor.com" className={styles.contactVal}>info@theunidecor.com</a>
              </li>
              <li>
                <span className={styles.contactLabel}>Address</span>
                <span className={styles.contactVal}>236, New Arya Nagar,<br />Ghaziabad, UP</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── MOBILE ACCORDION ── */}
      <div className={styles.mobileAccordion}>

        {/* Brand */}
        <div className={styles.mobileBrand}>
          <Link href="/" className={styles.logoWrap}>
            <img src="/logo-footer.png" alt="Unidecor" className={styles.logo} />
          </Link>
          <p className={styles.brandText}>
            Premium decorative surfaces crafted for modern interiors.
          </p>
          <SocialLinks />
        </div>

        {/* Company */}
        <div className={styles.accordionBlock}>
          <button
            className={styles.accordionTrigger}
            onClick={() => toggleSection("company")}
          >
            <span>Company</span>
            <span className={`${styles.accChev} ${openSection === "company" ? styles.accChevOpen : ""}`} />
          </button>
          <div className={`${styles.accordionBody} ${openSection === "company" ? styles.accordionBodyOpen : ""}`}>
            {COMPANY.map((l) => (
              <Link key={l.href} href={l.href} className={styles.accLink}>{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className={styles.accordionBlock}>
          <button
            className={styles.accordionTrigger}
            onClick={() => toggleSection("collections")}
          >
            <span>Collections</span>
            <span className={`${styles.accChev} ${openSection === "collections" ? styles.accChevOpen : ""}`} />
          </button>
          <div className={`${styles.accordionBody} ${openSection === "collections" ? styles.accordionBodyOpen : ""}`}>
            {products.map((cat) => (
              <div key={cat._id} className={styles.mobileCatWrap}>
                <div className={styles.mobileCatRow}>
                  <Link href={`/products/${cat.slug.current}`} className={styles.accLink}>
                    {cat.title}
                  </Link>
                  {cat.children?.length > 0 && (
                    <button
                      className={styles.catExpandBtn}
                      onClick={() => toggleCat(cat._id)}
                    >
                      <span className={`${styles.accChevSm} ${openCat === cat._id ? styles.accChevOpen : ""}`} />
                    </button>
                  )}
                </div>
                {openCat === cat._id && cat.children?.length > 0 && (
                  <div className={styles.mobileSub}>
                    {cat.children.map((sub) => (
                      <div key={sub._id}>
                        <Link href={`/products/${cat.slug.current}/${sub.slug.current}`} className={styles.mobileSubLink}>
                          {sub.title}
                        </Link>
                        {sub.children?.length > 0 && (
                          <div className={styles.mobileLvl3}>
                            {sub.children.map((leaf) => (
                              <Link key={leaf._id} href={`/products/${cat.slug.current}/${sub.slug.current}/${leaf.slug.current}`} className={styles.mobileLeafLink}>
                                {leaf.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className={styles.accordionBlock}>
          <button
            className={styles.accordionTrigger}
            onClick={() => toggleSection("contact")}
          >
            <span>Get in Touch</span>
            <span className={`${styles.accChev} ${openSection === "contact" ? styles.accChevOpen : ""}`} />
          </button>
          <div className={`${styles.accordionBody} ${openSection === "contact" ? styles.accordionBodyOpen : ""}`}>
            <ul className={styles.mobileContactList}>
              <li><span>Gaurav Jain</span><a href="tel:+918527555909">+91 85275 55909</a></li>
              <li><span>Sunayana Jain</span><a href="tel:+918527355586">+91 85273 55586</a></li>
              <li><span>Email</span><a href="mailto:info@theunidecor.com">info@theunidecor.com</a></li>
              <li><span>Address</span><span>236, New Arya Nagar, Ghaziabad, UP</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Unidecor. All rights reserved.</span>
        <span className={styles.dot} />
        <span className={styles.credit}>
          Developed by{" "}
          <a href="https://creatormonk.in" target="_blank" rel="noopener noreferrer">
            creatormonk.in
          </a>
        </span>
      </div>

    </footer>
  );
}