"use client";

// app/downloads/DownloadsGrid.jsx
import Image from "next/image";
import styles from "@/app/downloads/Downloads.module.css";

export default function DownloadsGrid({ catalogues = [] }) {
  if (!catalogues.length) {
    return (
      <p className={styles.empty}>No catalogues available right now. Check back soon.</p>
    );
  }

  return (
    <div className={styles.grid}>
      {catalogues.map((cat) => (
        <div key={cat._id} className={styles.card}>
          {/* Cover Image */}
          <div className={styles.cover}>
            {cat.coverImage?.url ? (
              <Image
                src={cat.coverImage.url}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.coverImg}
                placeholder={cat.coverImage.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={cat.coverImage.metadata?.lqip}
              />
            ) : (
              <div className={styles.coverFallback}>
                <span>PDF</span>
              </div>
            )}
            <div className={styles.coverOverlay} />
          </div>

          {/* Info */}
          <div className={styles.info}>
            {cat.brand && (
              <span className={styles.brand}>{cat.brand}</span>
            )}
            <h2 className={styles.title}>{cat.title}</h2>
            {cat.subtitle && (
              <p className={styles.subtitle}>{cat.subtitle}</p>
            )}
          </div>

          {/* Download Button */}
          <a
            href={`${cat.fileUrl}?dl=${cat.title.replace(/\s+/g, "_")}.pdf`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
        </div>
      ))}
    </div>
  );
}