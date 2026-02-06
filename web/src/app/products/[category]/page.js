import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";
// products[category]/page.js
import { categoryPageQuery } from "@/app/lib/queries/categoryPageQuery";
import { productFiltersQuery } from "@/app/lib/queries/productFiltersQuery";
import { productsQuery } from "@/app/lib/queries/productsQuery";

import PageHero from "@/app/components/hero/PageHero";
import PageIntro from "@/app/components/sections/PageIntro";
import KeyFeatures from "@/app/components/sections/KeyFeatures";
import CollectionGrid from "@/app/components/sections/CollectionGrid";
import ProductsSection from "@/app/components/products/ProductsSection";

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const sp = await searchParams;

  
  const finish = sp?.finish ?? null;
  const size = sp?.size ?? null;
  const designCode = sp?.designCode ?? null;
  // 1️ STRUCTURE
  const categoryData = await sanityClient.fetch(categoryPageQuery, {
    slug: category,
  });

  if (!categoryData) notFound();

  // 2 FILTER OPTIONS
  const filters = await sanityClient.fetch(productFiltersQuery, {
    categoryId: categoryData._id,
  });

  // PRODUCTS (URL-DRIVEN)
  const products = await sanityClient.fetch(productsQuery, {
    categoryId: categoryData._id,
    finish,
    size,
    designCode,
  });
// console.log(designCode);
  const collections = categoryData.collections || [];
  const hasCollections = collections.length > 0;
  // const hasProducts = products.length > 0;
  const isTerminalCategory = categoryData.hasDirectProducts === true;

  return (
    <>
      <PageHero
        image={categoryData.hero?.image}
        heading={categoryData.hero?.heading || categoryData.title}
        subheading={categoryData.hero?.subheading}
        size="large"
      />
      <div style={{ position: 'relative', zIndex: 2}}>
      <PageIntro
        kicker={`About ${categoryData.title}`}
        content={categoryData.description}
      />

      {categoryData.keyFeatures?.length > 0 && (
        <KeyFeatures
          kicker="Key Features"
          title={categoryData.keyFeaturesTitle || "Designed for Performance & Longevity"}
          features={categoryData.keyFeatures}
        />
      )}

{/* COLLECTIONS → ONLY for non-terminal categories */}
{!isTerminalCategory && collections.length > 0 && (
  <CollectionGrid
    kicker="Explore Collections"
    title={`Discover ${categoryData.title}`}
    items={collections}
    baseSlug={`/products/${categoryData.slug.current}`}
  />
)}

{/* PRODUCTS → ONLY for terminal categories */}
{isTerminalCategory && (
  <ProductsSection
    title={`${categoryData.title} Products`}
    products={products}
    filters={{
      Finish: filters.finishes,
      Size: filters.sizes,
      "Design Code": filters.designCodes,
    }}
  />
)}
</div>
    </>
  );
}