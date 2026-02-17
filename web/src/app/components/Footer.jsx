"use client";

import { useState } from "react";
import Link from "next/link";
import SocialLinks from "@/app/components/SocialLinks";
import styles from "@/app/css/Footer.module.css";

export default function FooterClient({ data }) {
  const { products = [] } = data || {};
  const [openCat, setOpenCat] = useState(null);

  const toggle = (id) => {
    setOpenCat(prev => (prev === id ? null : id));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* BRAND */}
        <div className={styles.col}>
          <img src="/logo-footer.png" alt="Unidecor" className={styles.logo} />
          <p className={styles.brandText}>
            Premium decorative surfaces crafted for modern interiors,
            combining durability, design, and performance.
          </p>
          <SocialLinks />
        </div>

        {/* QUICK LINKS */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Company</h4>
          <ul className={styles.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about-us">Our Identity</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/quality-standards">Quality Standard</Link></li>
            <li><Link href="/downloads">Downloads</Link></li>
          </ul>
        </div>

        {/* PRODUCTS */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Collections</h4>

          <ul className={styles.productTree}>
            {products.map(cat => {
              const hasChildren = cat.children?.length > 0;
              const isOpen = openCat === cat._id;

              return (
                <li key={cat._id} className={styles.level1}>

                  {/* DESKTOP LINK */}
                  <Link
                    href={`/products/${cat.slug.current}`}
                    className={styles.desktopLink}
                  >
                    {cat.title}
                  </Link>

                  {/* MOBILE */}
                  {hasChildren ? (
                    <button
                      type="button"
                      className={styles.mobileToggle}
                      onClick={() => toggle(cat._id)}
                    >
                      <span>{cat.title}</span>
                      <span
                        className={`${styles.chevron} ${isOpen ? styles.open : ""
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={`/products/${cat.slug.current}`}
                      className={styles.mobileLeaf}
                    >
                      {cat.title}
                    </Link>
                  )}

                  {/* CHILDREN — ALWAYS RENDER */}
                  {hasChildren && (
                    <ul
                      className={`${styles.subTree} ${isOpen ? styles.subTreeOpen : ""
                        }`}
                    >
                      {cat.children.map(sub => (
                        <li key={sub._id}>
                          <Link
                            href={`/products/${cat.slug.current}/${sub.slug.current}`}
                          >
                            {sub.title}
                          </Link>

                          {sub.children?.length > 0 && (
                            <ul className={styles.level3}>
                              {sub.children.map(leaf => (
                                <li key={leaf._id}>
                                  <Link
                                    href={`/products/${cat.slug.current}/${sub.slug.current}/${leaf.slug.current}`}
                                  >
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
              );
            })}
          </ul>
        </div>

        {/* CONTACT */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Get in Touch</h4>
          <ul className={styles.contact}>
            <li><strong>Gaurav Jain:</strong> +91 8527555909</li>
                <li><strong>Sunayana Jain:</strong> +91 8527355586 </li>
            <li><strong>Email:</strong> info@theunidecor.com</li>
            <li>
              <strong>Address:</strong><br />
              Head Office: 236, <br />
              New Arya Nagar, Ghaziabad, UP
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <span>© {new Date().getFullYear()} Unidecor. All rights reserved.</span>
          <span className={styles.separator}>|</span>
          <span className={styles.developer}>
            Developed by <a href="https://creatormonk.in" target="_blank" rel="noopener noreferrer">creatormonk.in</a>
          </span>
        </div>
      </div>
    </footer>
  );
}