"use client";

import FilterBar from "@/app/components/sections/FilterBar";
import ProductGrid from "@/app/components/products/ProductGrid";
import styles from "@/app/css/ProductSection.module.css";

export default function ProductsSection({
  products = [],
  title,
  filters = {},
}) {
  const shouldShowFilters = Object.values(filters).some(
    values => values?.length > 1
  );
  console.log(filters)
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* FILTER BAR */}
        {shouldShowFilters && (
          <FilterBar filters={filters} />
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