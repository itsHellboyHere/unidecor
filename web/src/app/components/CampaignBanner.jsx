"use client";

import { useEffect, useState } from "react";
import styles from "@/app/css/CampaignBanner.module.css";
import Link from "next/link";

const DISMISS_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export default function CampaignBanner({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!data?._id) return;

    const storageKey = `campaign-dismissed-${data._id}`;
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      setVisible(true);
      return;
    }

    const expiryTime = parseInt(stored, 10);

    if (Date.now() > expiryTime) {
      localStorage.removeItem(storageKey);
      setVisible(true);
    }
  }, [data]);

  const handleClose = () => {
    const storageKey = `campaign-dismissed-${data._id}`;
    const expiryTime = Date.now() + DISMISS_DURATION;

    localStorage.setItem(storageKey, expiryTime.toString());
    setVisible(false);
  };

  if (!visible || !data) return null;

  return (
    <div
      className={styles.banner}
      style={{ background: data.backgroundColor || "#1c1c1c" }}
    >
      <div className={styles.inner}>
        <span>{data.title}</span>

        <div className={styles.actions}>
          {data.ctaLink && (
            <Link href={data.ctaLink} className={styles.cta}>
              {data.ctaText || "Explore"}
            </Link>
          )}

          <button
            className={styles.close}
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}