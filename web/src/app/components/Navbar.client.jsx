'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Plus, ArrowUpRight } from "lucide-react";
import styles from "@/app/css/Navbar.module.css";

export default function NavbarClient({ data }) {
  const router = useRouter();
  const { products = [], inspiration = [] } = data || {};
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeSubProduct, setActiveSubProduct] = useState(null);
  const [openInspiration, setOpenInspiration] = useState(false);
  const [hovered, setHovered] = useState(null);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
        setProductsOpen(false);
        setActiveProduct(null);
        setActiveSubProduct(null);
        setOpenInspiration(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateMobile = (url) => {
    setMobileOpen(false);
    setProductsOpen(false);
    setActiveProduct(null);
    setActiveSubProduct(null);
    setOpenInspiration(false);
    router.push(url);
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="Unidecor" />
          </Link>

          {/* ── DESKTOP MENU ── */}
          <ul className={styles.menu}>
            <li>
              <Link href="/" className={`${styles.navLink} ${isActive("/") ? styles.activeLink : ""}`}>
                Home
              </Link>
            </li>

            {/* PRODUCTS */}
            <li
              className={styles.dropItem}
              onMouseEnter={() => setHovered("products")}
              onMouseLeave={() => setHovered(null)}
            >
              <button className={`${styles.navLink} ${styles.trigger} ${isActive("/products") ? styles.activeLink : ""}`}>
                Products
                <ChevronDown size={13} className={`${styles.chev} ${hovered === "products" ? styles.chevUp : ""}`} />
              </button>

              <div className={`${styles.dropPanel} ${hovered === "products" ? styles.dropShow : ""}`}>
                {products.map((lvl1, i) => (
                  <div key={lvl1._id} className={styles.lvl1Wrap} style={{ "--i": i }}>
                    <Link
                      href={`/products/${lvl1.slug.current}`}
                      className={styles.lvl1Link}
                      onClick={() => setHovered(null)}
                    >
                      <span>{lvl1.title}</span>
                      {lvl1.children?.length > 0 && <ChevronRight size={11} className={styles.rowArrow} />}
                    </Link>

                    {lvl1.children?.length > 0 && (
                      <div className={styles.lvl2Panel}>
                        {lvl1.children.map((lvl2) => (
                          <div key={lvl2._id} className={styles.lvl2Wrap}>
                            <Link
                              href={`/products/${lvl1.slug.current}/${lvl2.slug.current}`}
                              className={styles.lvl2Link}
                              onClick={() => setHovered(null)}
                            >
                              <span>{lvl2.title}</span>
                              {lvl2.children?.length > 0 && <ChevronRight size={11} className={styles.rowArrow} />}
                            </Link>

                            {lvl2.children?.length > 0 && (
                              <div className={styles.lvl3Panel}>
                                {lvl2.children.map((lvl3) => (
                                  <Link
                                    key={lvl3._id}
                                    href={`/products/${lvl1.slug.current}/${lvl2.slug.current}/${lvl3.slug.current}`}
                                    className={styles.lvl3Link}
                                    onClick={() => setHovered(null)}
                                  >
                                    {lvl3.title}
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
            </li>

            {/* INSPIRATION */}
            <li
              className={styles.dropItem}
              onMouseEnter={() => setHovered("inspiration")}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href="/inspiration"
                className={`${styles.navLink} ${styles.trigger} ${isActive("/inspiration") ? styles.activeLink : ""}`}
              >
                Inspiration
                <ChevronDown size={13} className={`${styles.chev} ${hovered === "inspiration" ? styles.chevUp : ""}`} />
              </Link>

              <div className={`${styles.dropPanel} ${styles.inspPanel} ${hovered === "inspiration" ? styles.dropShow : ""}`}>
                {inspiration.map((item, i) => (
                  <Link
                    key={item._id}
                    href={`/inspiration/${item.slug.current}`}
                    className={styles.inspLink}
                    style={{ "--i": i }}
                    onClick={() => setHovered(null)}
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight size={13} className={styles.inspArrow} />
                  </Link>
                ))}
              </div>
            </li>

            <li>
              <Link href="/about-us" className={`${styles.navLink} ${isActive("/about-us") ? styles.activeLink : ""}`}>
                Our Identity
              </Link>
            </li>

            <li>
              <Link href="/downloads" className={`${styles.navLink} ${isActive("/downloads") ? styles.activeLink : ""}`}>
                Downloads
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={`${styles.navLink} ${styles.contactLink} ${isActive("/contact") ? styles.contactActive : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* HAMBURGER */}
          <button className={styles.burgerBtn} onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={`${styles.burgerLine} ${styles.burgerShort}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULL-SCREEN PANEL ── */}
      <div className={`${styles.mobilePanel} ${mobileOpen ? styles.mobileOpen : ""}`}>

        {/* Header — logo is now a clickable Link */}
        <div className={styles.mobileTop}>
          <Link href="/" className={styles.mobileLogoLink} onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Unidecor" className={styles.mobileLogo} />
          </Link>
          <button className={styles.mobileCloseBtn} onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <Plus size={22} style={{ transform: "rotate(45deg)" }} />
          </button>
        </div>

        <nav className={styles.mobileNav}>

          {/* HOME */}
          <div className={styles.mobileRow}>
            <button className={styles.mobileItem} onClick={() => navigateMobile("/")}>
              Home
            </button>
            <ArrowUpRight size={17} className={styles.mobileStaticArrow} />
          </div>

          {/* PRODUCTS */}
          <div className={styles.mobileGroup}>
            <button
              className={`${styles.mobileItem} ${styles.mobileItemToggle}`}
              onClick={() => setProductsOpen(!productsOpen)}
            >
              <span>Products</span>
              <ChevronDown size={18} className={`${styles.mobileChev} ${productsOpen ? styles.mobileChevOpen : ""}`} />
            </button>

            <div className={`${styles.mobileCollapse} ${productsOpen ? styles.collapseOpen : ""}`}>
              {products.map((lvl1) => (
                <div key={lvl1._id} className={styles.mobileLvl1Wrap}>
                  <div className={styles.mobileSubRow}>
                    <button
                      className={styles.mobileLvl1Btn}
                      onClick={() => navigateMobile(`/products/${lvl1.slug.current}`)}
                    >
                      {lvl1.title}
                    </button>
                    {lvl1.children?.length > 0 && (
                      <button
                        className={styles.mobileExpandBtn}
                        onClick={() => setActiveProduct(activeProduct === lvl1._id ? null : lvl1._id)}
                      >
                        <ChevronRight
                          size={15}
                          className={`${styles.expandChev} ${activeProduct === lvl1._id ? styles.expandOpen : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {activeProduct === lvl1._id && (
                    <div className={styles.mobileLvl2Wrap}>
                      {lvl1.children.map((lvl2) => (
                        <div key={lvl2._id}>
                          <div className={styles.mobileSubRow}>
                            <button
                              className={styles.mobileLvl2Btn}
                              onClick={() => navigateMobile(`/products/${lvl1.slug.current}/${lvl2.slug.current}`)}
                            >
                              {lvl2.title}
                            </button>
                            {lvl2.children?.length > 0 && (
                              <button
                                className={styles.mobileExpandBtn}
                                onClick={() => setActiveSubProduct(activeSubProduct === lvl2._id ? null : lvl2._id)}
                              >
                                <ChevronRight
                                  size={14}
                                  className={`${styles.expandChev} ${activeSubProduct === lvl2._id ? styles.expandOpen : ""}`}
                                />
                              </button>
                            )}
                          </div>

                          {activeSubProduct === lvl2._id && (
                            <div className={styles.mobileLvl3Wrap}>
                              {lvl2.children.map((lvl3) => (
                                <button
                                  key={lvl3._id}
                                  className={styles.mobileLvl3Btn}
                                  onClick={() => navigateMobile(`/products/${lvl1.slug.current}/${lvl2.slug.current}/${lvl3.slug.current}`)}
                                >
                                  {lvl3.title}
                                </button>
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

          {/* INSPIRATION */}
          <div className={styles.mobileGroup}>
            <div className={styles.mobileItemSplit}>
              <button
                className={`${styles.mobileItem} ${styles.mobileItemFlex}`}
                onClick={() => navigateMobile("/inspiration")}
              >
                Inspiration
              </button>
              <button
                className={styles.mobileExpandBtn}
                onClick={() => setOpenInspiration(!openInspiration)}
              >
                <ChevronDown size={18} className={`${styles.mobileChev} ${openInspiration ? styles.mobileChevOpen : ""}`} />
              </button>
            </div>

            <div className={`${styles.mobileCollapse} ${openInspiration ? styles.collapseOpen : ""}`}>
              {inspiration.map((item) => (
                <div key={item._id} className={styles.mobileSubRow}>
                  <button
                    className={styles.mobileLvl1Btn}
                    onClick={() => navigateMobile(`/inspiration/${item.slug.current}`)}
                  >
                    {item.title}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mobileRow}>
            <button className={styles.mobileItem} onClick={() => navigateMobile("/about-us")}>Our Identity</button>
            <ArrowUpRight size={17} className={styles.mobileStaticArrow} />
          </div>

          <div className={styles.mobileRow}>
            <button className={styles.mobileItem} onClick={() => navigateMobile("/downloads")}>Downloads</button>
            <ArrowUpRight size={17} className={styles.mobileStaticArrow} />
          </div>

          <div className={styles.mobileRow}>
            <button className={styles.mobileItem} onClick={() => navigateMobile("/contact")}>Contact</button>
            <ArrowUpRight size={17} className={styles.mobileStaticArrow} />
          </div>
        </nav>

        <div className={styles.mobileFoot}>
          <span>Premium Interior Surfaces</span>
          <span className={styles.mobileFootDot} />
          <span>Unidecor</span>
        </div>
      </div>
    </>
  );
}