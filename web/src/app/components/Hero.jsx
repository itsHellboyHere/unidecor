import styles from "@/app/css/Hero.module.css";

const slides = [
  {
    title: "Premium Interior Surfaces",
    subtitle: "Laminates, wall panels & decorative finishes",
    image: "/laminates.webp",
  },
  {
    title: "Material Systems & Catalogues",
    subtitle: "Edge bands, boards & engineered solutions",
    image: "/materials.webp",
  },
  {
    title: "Designed for Indian Homes",
    subtitle: "Kitchen hardware and complete interior products",
    image: "/kitchen.webp",
  },
];

export default function Hero() {
  return (
    <section className={styles.wrapper}>
      {slides.map((slide, index) => (
        <article
          key={index}
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
          </div>
        </article>
      ))}
    </section>
  );
}