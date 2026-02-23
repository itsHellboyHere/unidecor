"use client";

import { memo, useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
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
  
  // Track open state for dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);
  const containerRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setActiveDropdown(null); // Close dropdown after selection
  };

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.glassWrapper}>
        <div className={styles.filterGroups}>
          {Object.entries(filters).map(([group, values]) => {
            const key = FILTER_KEYS[group];
            const activeValue = key ? searchParams.get(key) : null;

            return (
              <div key={group} className={styles.group}>
                <span className={styles.label}>{group}</span>
                
                <div className={styles.dropdownContainer}>
                  <button 
                    type="button"
                    className={`${styles.dropdownTrigger} ${activeValue ? styles.activeTrigger : ""}`}
                    onClick={() => setActiveDropdown(activeDropdown === group ? null : group)}
                  >
                    <span className={styles.triggerText}>
                      {activeValue || `Select ${group}`}
                    </span>
                    <ChevronDown 
                      size={14} 
                      className={activeDropdown === group ? styles.rotate : ""} 
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === group && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={styles.dropdownMenu}
                      >
                        {values.map(value => (
                          <button
                            key={value}
                            className={`${styles.dropdownItem} ${activeValue === value ? styles.activeItem : ""}`}
                            onClick={() => toggleFilter(group, value)}
                          >
                            {value}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
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