"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import styles from "@/app/css/Navbar.module.css";

const PRODUCT_MENU = [
  {
    title: "Laminates",
    children: [
      "Decorative Laminates",
      "PVC Laminates",
      "Acrylic Laminates",
    ],
  },
  {
    title: "Wall Panels",
    children: [
      "Louvers Panel",
      "Canvas Panel",
      "Exterior Louvers",
      "Charcoal Panel",
      "Soffit Panel",
    ],
  },
  { title: "Edge Band Tape", children: [] },
  { title: "Plywood", children: [] },
  { title: "WPC Board", children: [] },
  { title: "Kitchen Hardware", children: [] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Unidecor" />
        </Link>

        {/* MENU */}
        <ul className={styles.menu}>
          <li><Link href="/">Home</Link></li>

          {/* PRODUCTS */}
          <li className={styles.dropdown}>
  <button className={styles.trigger}>
    Products <ChevronDown size={14} />
  </button>

  <div className={styles.dropdownBox}>
    {PRODUCT_MENU.map((item) => (
      <div key={item.title} className={styles.subDropdown}>
        <span className={styles.subTrigger}>
          {item.title}
        </span>

        {item.children.length > 0 && (
          <div className={styles.subDropdownBox}>
            {item.children.map((child) => (
              <Link key={child} href="#">
                {child}
              </Link>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</li>

          {/* INSPIRATION */}
          <li className={styles.dropdown}>
            <button className={styles.trigger}>
              Inspiration <ChevronDown size={14} />
            </button>

            <div className={styles.dropdownBox}>
              <Link href="#">Living Room</Link>
              <Link href="#">Bedroom</Link>
              <Link href="#">Kitchen</Link>
              <Link href="#">Washroom</Link>
            </div>
          </li>

          <li><Link href="/downloads">Downloads</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}