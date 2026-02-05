"use client";

import { memo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "@/app/css/FilterBar.module.css";

const FILTER_KEYS = {
  "Finish": "finish",
  "Size": "size",
  "Design Code": "designCode",
};

function FilterBar({ filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleFilter = (group, value) => {
    const params = new URLSearchParams(searchParams.toString());
    const key = FILTER_KEYS[group];
    if (!key) return;

    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.glassWrapper}>
        <div className={styles.filterGroups}>
          {Object.entries(filters).map(([group, values]) => {
            const key = FILTER_KEYS[group];
            const activeValue = key ? searchParams.get(key) : null;

            return (
              <div key={group} className={styles.group}>
                <span className={styles.label}>{group}</span>
                <div className={styles.options}>
                  {values.map(value => {
                    const isActive = activeValue === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        className={`${styles.pill} ${isActive ? styles.active : ""}`}
                        onClick={() => toggleFilter(group, value)}
                      >
                        {/* Ensure text is wrapped and z-indexed */}
                        <span className={styles.pillText}>{value}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeGlow"
                            className={styles.glow}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={styles.clearBtn}
              onClick={() => {
                router.replace(pathname, { scroll: false });
                router.refresh();
              }}
            >
              <X size={14} /> <span>Clear All</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(FilterBar);