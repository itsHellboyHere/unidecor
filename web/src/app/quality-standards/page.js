import styles from "./Quality.module.css";
import {
  ShieldCheck,
  CheckCircle,
  PackageCheck,
  Boxes,
  BadgeCheck,
  Headset,
} from "lucide-react";

export const metadata = {
  title: "Quality Assurance & Process",
  description:
    "Discover Unidecor’s quality assurance process—from supplier vetting and inspections to after-sales support. Premium decorative surfaces backed by 20+ years of experience.",
};

export default function QualityStandardsPage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        {/* HERO */}
        <header className={styles.hero}>
          <span className={styles.kicker}>QUALITY ASSURANCE</span>
          <h1 className={styles.title}>
            Built on Experience.<br />Backed by Process.
          </h1>
          <p className={styles.subtitle}>
            Every product in the Unidecor collection goes through a defined
            quality assurance process shaped by over 20 years of industry
            experience.
          </p>
        </header>

        {/* QUALITY PROMISE */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Quality Promise</h2>
          <p className={styles.text}>
            Every product in the Unidecor collection goes through rigorous
            quality checks backed by our team’s 20 years of industry experience.
            We don’t just sell laminates — we guarantee consistency, reliability,
            and long-term performance.
          </p>
        </section>

        {/* PROCESS */}
        <section className={styles.sectionAlt}>
          <h2 className={styles.sectionTitle}>Quality Control Process</h2>

          <div className={styles.processGrid}>
            <ProcessItem
              icon={<BadgeCheck />}
              title="Supplier Vetting"
              text="Only partnering with established and certified manufacturers."
            />
            <ProcessItem
              icon={<CheckCircle />}
              title="Incoming Inspection"
              text="Every batch inspected for thickness, finish, and color consistency."
            />
            <ProcessItem
              icon={<ShieldCheck />}
              title="Sample Testing"
              text="Regular testing for moisture resistance, adhesion, and durability."
            />
            <ProcessItem
              icon={<Boxes />}
              title="Storage Standards"
              text="Climate-controlled warehousing to prevent damage or deformation."
            />
            <ProcessItem
              icon={<PackageCheck />}
              title="Packaging Quality"
              text="Protective packaging to ensure damage-free delivery."
            />
            <ProcessItem
              icon={<Headset />}
              title="Customer Feedback Loop"
              text="Continuous improvement driven by real client experiences."
            />
          </div>
        </section>

        {/* WHAT WE CHECK */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What We Check</h2>

          <ul className={styles.checkList}>
            <li>Surface finish quality (no bubbles, scratches, or defects)</li>
            <li>Dimensional accuracy for seamless installation</li>
            <li>Color consistency across production batches</li>
            <li>Adhesion strength and backing quality</li>
            <li>Edge quality and overall material integrity</li>
          </ul>
        </section>

        {/* AFTER SALES */}
        <section className={styles.sectionAlt}>
          <h2 className={styles.sectionTitle}>After-Sales Support</h2>

          <ul className={styles.supportList}>
            <li>Replacement guarantee for manufacturing defects</li>
            <li>Installation guidance and technical assistance</li>
            <li>Sample availability before bulk orders</li>
            <li>Responsive and knowledgeable customer support team</li>
          </ul>
        </section>

      </div>
    </main>
  );
}

/* ---------- COMPONENT ---------- */

function ProcessItem({ icon, title, text }) {
  return (
    <div className={styles.processItem}>
      <div className={styles.processIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}