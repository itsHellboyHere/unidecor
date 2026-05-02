// app/downloads/page.js
import { sanityClient } from "@/app/lib/sanity.client";
import { catalogueQuery } from "@/app/lib/queries/catalogueQuery";
import DownloadsGrid from "./DownloadsGrid";
import styles from "@/app/downloads/Downloads.module.css";

export const metadata = {
  title: "Downloads | Unidecor",
  description: "Download product catalogues and brochures from Unidecor, HexaLam and more.",
};

export default async function DownloadsPage() {
  const catalogues = await sanityClient.fetch(catalogueQuery);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <p className={styles.kicker}>Resources</p>
        <h1 className={styles.heading}>Product Catalogues</h1>
        <p className={styles.sub}>
          Download our latest brochures and product guides.
        </p>
      </div>

      <div className={styles.inner}>
        <DownloadsGrid catalogues={catalogues} />
      </div>
    </main>
  );
}