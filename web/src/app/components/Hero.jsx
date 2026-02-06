import styles from "@/app/css/Hero.module.css";
import Link from "next/link";

const slides = [
  {
    title: "Premium Interior Surfaces",
    subtitle: "Laminates, wall panels & decorative finishes",
    image: "/laminates.webp",
    link: "/products/laminates",
  },
  {
    title: "Material Systems & Catalogues",
    subtitle: "Wall panels & engineered surface solutions",
    image: "/materials.webp",
    link: "/products/wall-panel",
  },
  {
    title: "Designed for Indian Homes",
    subtitle: "Kitchen hardware and complete interior products",
    image: "/kitchen.webp",
    link: "/inspiration/kitchen",
  },
];

export default function Hero() {
  return (
    <section className={styles.wrapper}>
      {slides.map((slide, index) => (
        // Added the correct slide.link here
        <Link href={slide.link} key={index}>
          <article
            className={styles.card}
            style={{ top: `${100 + index * 28}px` }}
          >
            <div
              className={styles.bg}
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            <div className={styles.content}>
              <h2 className={styles.heroTitle}>{slide.title}</h2>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              
              {/* Added Explore Button */}
              <div className={styles.exploreBtn}>
                <span>Explore Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}