'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import styles from "@/app/css/Navbar.module.css";

export default function NavbarClient({ data }) {
  const router = useRouter();
  const { products = [], inspiration = [] } = data || {};
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null); // Level 2
  const [activeSubProduct, setActiveSubProduct] = useState(null); // Level 3
  const [openInspiration, setOpenInspiration] = useState(false);
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
        setProductsOpen(false);
        setActiveProduct(null);
        setActiveSubProduct(null);
        setOpenInspiration(false);
        document.body.style.overflow = "";
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

          <ul className={styles.menu}>
            <li>
              <Link
                href="/"
                className={isActive("/") ? styles.activeLink : ""}
              >
                Home
              </Link>
            </li>

            {/* PRODUCTS DESKTOP */}
            <li className={styles.dropdown}>
              <button
                className={`${styles.trigger} ${isActive("/products") ? styles.activeLink : ""
                  }`}
              >
                Products <ChevronDown size={14} />
              </button>

              <div className={styles.dropdownBox}>
                {products.map((lvl1) => (
                  <div key={lvl1._id} className={styles.subDropdown}>
                    <Link href={`/products/${lvl1.slug.current}`} className={styles.subTrigger}>
                      {lvl1.title} {lvl1.children?.length > 0 && <ChevronRight size={12} className={styles.sideArrow} />}
                    </Link>

                    {lvl1.children?.length > 0 && (
                      <div className={styles.subDropdownBox}>
                        {lvl1.children.map((lvl2) => (
                          <div key={lvl2._id} className={styles.subDropdownLevel3}>
                            <Link href={`/products/${lvl1.slug.current}/${lvl2.slug.current}`} className={styles.subTrigger}>
                              {lvl2.title} {lvl2.children?.length > 0 && <ChevronRight size={12} className={styles.sideArrow} />}
                            </Link>

                            {lvl2.children?.length > 0 && (
                              <div className={styles.subDropdownBoxLevel3}>
                                {lvl2.children.map((lvl3) => (
                                  <Link key={lvl3._id} href={`/products/${lvl1.slug.current}/${lvl2.slug.current}/${lvl3.slug.current}`}>
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

            <li className={styles.dropdown}>
              <button
                className={`${styles.trigger} ${isActive("/inspiration") ? styles.activeLink : ""
                  }`}
              >
                Inspiration <ChevronDown size={14} />
              </button>
              <div className={`${styles.dropdownBox} ${styles.inspirationBox}`}>
                {inspiration.map((item) => (
                  <Link key={item._id} href={`/inspiration/${item.slug.current}`}>{item.title}</Link>
                ))}
              </div>
            </li>
            <li>
              <Link
                href="/about-us"
                className={isActive("/about-us") ? styles.activeLink : ""}
              >
                Our Identity
              </Link>
            </li>

            <li>
              <Link
                href="/downloads"
                className={isActive("/downloads") ? styles.activeLink : ""}
              >
                Downloads
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={isActive("/contact") ? styles.activeLink : ""}
              >
                Contact
              </Link>
            </li>
          </ul>

          <button className={styles.mobileBtn} onClick={() => setMobileOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* MOBILE PANEL */}
      {/* MOBILE PANEL */}
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

            {/* PRODUCTS */}
            <button
              className={styles.mobileTrigger}
              onClick={() => setProductsOpen(!productsOpen)}
            >
              Products
              <ChevronDown
                size={18}
                className={productsOpen ? styles.rotate : ""}
              />
            </button>

            {productsOpen && (
              <div className={styles.mobileSub}>
                {products.map((lvl1) => {
                  const hasChildren = lvl1.children?.length > 0;
                  const categoryUrl = `/products/${lvl1.slug.current}`;

                  return (
                    <div key={lvl1._id}>
                      {/* LEVEL 1 */}
                      <div className={styles.mobileRow}>
                        <button
                          className={styles.mobileLinkBtn}
                          onClick={() => navigateMobile(categoryUrl)}
                        >
                          {lvl1.title}
                        </button>

                        {hasChildren && (
                          <button
                            className={styles.chevronBtn}
                            onClick={() =>
                              setActiveProduct(
                                activeProduct === lvl1._id ? null : lvl1._id
                              )
                            }
                          >
                            <ChevronDown
                              size={16}
                              className={
                                activeProduct === lvl1._id ? styles.rotate : ""
                              }
                            />
                          </button>
                        )}
                      </div>

                      {/* LEVEL 2 */}
                      {activeProduct === lvl1._id && hasChildren && (
                        <div className={styles.mobileSubInner}>
                          {lvl1.children.map((lvl2) => {
                            const hasLevel3 = lvl2.children?.length > 0;
                            const lvl2Url = `${categoryUrl}/${lvl2.slug.current}`;

                            return (
                              <div key={lvl2._id}>
                                <div className={styles.mobileRow}>
                                  <button
                                    className={styles.mobileLinkBtn}
                                    style={{ fontSize: "14px" }}
                                    onClick={() => navigateMobile(lvl2Url)}
                                  >
                                    {lvl2.title}
                                  </button>

                                  {hasLevel3 && (
                                    <button
                                      className={styles.chevronBtn}
                                      onClick={() =>
                                        setActiveSubProduct(
                                          activeSubProduct === lvl2._id
                                            ? null
                                            : lvl2._id
                                        )
                                      }
                                    >
                                      <ChevronDown
                                        size={14}
                                        className={
                                          activeSubProduct === lvl2._id
                                            ? styles.rotate
                                            : ""
                                        }
                                      />
                                    </button>
                                  )}
                                </div>

                                {/* LEVEL 3 */}
                                {activeSubProduct === lvl2._id && hasLevel3 && (
                                  <div className={styles.mobileLevel3}>
                                    {lvl2.children.map((lvl3) => (
                                      <button
                                        key={lvl3._id}
                                        className={styles.mobileLinkBtn}
                                        onClick={() =>
                                          navigateMobile(
                                            `${lvl2Url}/${lvl3.slug.current}`
                                          )
                                        }
                                      >
                                        {lvl3.title}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* INSPIRATION */}
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
              onClick={() => navigateMobile("/about-us")}
            >
              Our Identity
            </button>
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