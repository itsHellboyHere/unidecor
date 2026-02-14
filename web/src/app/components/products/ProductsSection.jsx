"use client";

import FilterBar from "@/app/components/sections/FilterBar";
import ProductGrid from "@/app/components/products/ProductGrid";
import styles from "@/app/css/ProductSection.module.css";

export default function ProductsSection({
  products = [],
  title,
  filters = {},
}) {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters)
      .map(([group, values]) => [
        group,
        (values || []).filter(v => v !== null && v !== "")
      ])
      .filter(([, values]) => values.length > 0)
  );

  const shouldShowFilters = Object.keys(cleanedFilters).length > 0;
  // console.log(filters)
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* FILTER BAR */}
        {shouldShowFilters && (
          <FilterBar filters={cleanedFilters} />
        )}

        {/* PRODUCT GRID */}
        <ProductGrid
          title={title}
          products={products}
        />

      </div>
    </section>
  );
}