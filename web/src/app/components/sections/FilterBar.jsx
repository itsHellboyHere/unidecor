"use client";

import { memo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = [...searchParams.keys()].length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
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
                      className={`${styles.filterBtn} ${
                        isActive ? styles.active : ""
                      }`}
                      onClick={() => toggleFilter(group, value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          className={styles.clear}
          onClick={clearAll}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export default memo(FilterBar);