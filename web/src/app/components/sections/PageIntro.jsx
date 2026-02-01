import { PortableText } from "@portabletext/react";
import styles from "@/app/css/PageIntro.module.css";

export default function PageIntro({ kicker, content }) {
  if (!content) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {kicker && <span className={styles.kicker}>{kicker}</span>}

        <PortableText value={content} />
      </div>
    </section>
  );
}