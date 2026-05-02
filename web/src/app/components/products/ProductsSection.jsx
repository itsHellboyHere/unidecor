"use client";

import FilterBar from "@/app/components/sections/FilterBar";
import ProductGrid from "@/app/components/products/ProductGrid";
import Pagination from "@/app/components/products/Pagination2";
import styles from "@/app/css/ProductSection.module.css";

export default function ProductsSection({
  products = [],
  title,
  filters = {},
  total = 0,
  page = 1,
  perPage = 16,
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
  const totalPages = Math.ceil(total / perPage);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {shouldShowFilters && (
          <FilterBar filters={cleanedFilters} />
        )}

        <ProductGrid
          title={title}
          products={products}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            total={total}
            perPage={perPage}
          />
        )}

      </div>
    </section>
  );
}