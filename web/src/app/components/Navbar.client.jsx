"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import styles from "@/app/css/Navbar.module.css";

export default function NavbarClient({ data }) {
  const router = useRouter();
  const { products = [], inspiration = [] } = data || {};

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [openInspiration, setOpenInspiration] = useState(false);

  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= LOCK BODY ================= */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  /* ================= CLOSE MOBILE ON DESKTOP ================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
        setProductsOpen(false);
        setActiveProduct(null);
        setOpenInspiration(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= MOBILE NAV HANDLER ================= */
  const navigateMobile = (url) => {
    setMobileOpen(false);
    setProductsOpen(false);
    setActiveProduct(null);
    setOpenInspiration(false);
    router.push(url);
  };

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="Unidecor" />
          </Link>

          <ul className={styles.menu}>
            <li><Link href="/">Home</Link></li>

            {/* ================= PRODUCTS (DESKTOP) ================= */}
            <li className={styles.dropdown}>
              <button className={styles.trigger}>
                Products <ChevronDown size={14} />
              </button>

              <div className={styles.dropdownBox}>
                {products.map((item) => (
                  <div key={item._id} className={styles.subDropdown}>
                    <span className={styles.subTrigger}>{item.title}</span>

                    {item.children?.length > 0 && (
                      <div className={styles.subDropdownBox}>
                        {item.children.map((child) => (
                          <Link
                            key={child._id}
                            href={`/products/${item.slug.current}/${child.slug.current}`}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </li>

            {/* ================= INSPIRATION (DESKTOP) ================= */}
            <li className={styles.dropdown}>
              <button className={styles.trigger}>
                Inspiration <ChevronDown size={14} />
              </button>

              <div className={styles.dropdownBox}>
                {inspiration.map((item) => (
                  <Link
                    key={item._id}
                    href={`/inspiration/${item.slug.current}`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </li>

            <li><Link href="/downloads">Downloads</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            className={styles.mobileBtn}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE PANEL ================= */}
      {mobileOpen && (
        <div className={styles.mobilePanel}>
          <div className={styles.mobileHeader}>
            <img src="/logo.png" alt="Unidecor" className={styles.mobileLogo} />
            <button onClick={() => setMobileOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className={styles.mobileMenu}>
            <button
              className={styles.mobileLinkBtn}
              onClick={() => navigateMobile("/")}
            >
              Home
            </button>

            {/* ================= PRODUCTS (MOBILE) ================= */}
            <button
              className={styles.mobileTrigger}
              onClick={() => {
                setProductsOpen(!productsOpen);
                setActiveProduct(null);
              }}
            >
              Products
              <ChevronDown
                size={18}
                className={productsOpen ? styles.rotate : ""}
              />
            </button>

            {productsOpen && (
              <div className={styles.mobileSub}>
                {products.map((item) => (
                  <div key={item._id}>
                    <button
                      className={styles.mobileTrigger}
                      onClick={() =>
                        setActiveProduct(
                          activeProduct === item._id ? null : item._id
                        )
                      }
                    >
                      {item.title}
                      {item.children?.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={
                            activeProduct === item._id ? styles.rotate : ""
                          }
                        />
                      )}
                    </button>

                    {activeProduct === item._id &&
                      item.children?.length > 0 && (
                        <div className={styles.mobileSubInner}>
                          {item.children.map((child) => (
                            <button
                              key={child._id}
                              className={styles.mobileLinkBtn}
                              onClick={() =>
                                navigateMobile(
                                  `/products/${item.slug.current}/${child.slug.current}`
                                )
                              }
                            >
                              {child.title}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}

            {/* ================= INSPIRATION (MOBILE) ================= */}
            <button
              className={styles.mobileTrigger}
              onClick={() => setOpenInspiration(!openInspiration)}
            >
              Inspiration
              <ChevronDown
                size={18}
                className={openInspiration ? styles.rotate : ""}
              />
            </button>

            {openInspiration && (
              <div className={styles.mobileSub}>
                {inspiration.map((item) => (
                  <button
                    key={item._id}
                    className={styles.mobileLinkBtn}
                    onClick={() =>
                      navigateMobile(`/inspiration/${item.slug.current}`)
                    }
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}

            <button
              className={styles.mobileLinkBtn}
              onClick={() => navigateMobile("/downloads")}
            >
              Downloads
            </button>

            <button
              className={styles.mobileLinkBtn}
              onClick={() => navigateMobile("/contact")}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}