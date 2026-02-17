import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";

import { subCollectionPageQuery } from "@/app/lib/queries/subCollectionPageQuery";
import { productFiltersByCollectionQuery } from "@/app/lib/queries/productFiltersQuery";
import { productsByCollectionQuery } from "@/app/lib/queries/productsQuery";

import PageHero from "@/app/components/hero/PageHero";
import PageIntro from "@/app/components/sections/PageIntro";
import KeyFeatures from "@/app/components/sections/KeyFeatures";
import ProductsSection from "@/app/components/products/ProductsSection";

export async function generateMetadata({ params }) {
  const { subCollection } = await params;

  
  if (!subCollection) return {};

  const data = await sanityClient.fetch(subCollectionPageQuery, {
    slug: subCollection,
  });

  if (!data) return {};

  return {
    title: data.seo?.title  || `${data.title} | Unidecor`,
    description:
      data.seo?.description ||
      `Explore ${data.title} by Unidecor. Premium architectural surface solutions.`,
  };
}
export default async function SubCollectionPage({ params, searchParams }) {
  const { subCollection } = await params;
  if (!subCollection) notFound();
  const sp = await searchParams;

  const finish = sp?.finish ?? null;
  const size = sp?.size ?? null;
  const designCode = sp?.designCode ?? null;

  // STRUCTURE
  const data = await sanityClient.fetch(subCollectionPageQuery, {
    slug: subCollection,
  });

  if (!data) notFound();

  // FILTER OPTIONS
  const filters = await sanityClient.fetch(
    productFiltersByCollectionQuery,
    {
      collectionId: data._id,
    }
  );

  // PRODUCTS (URL-DRIVEN)
  const products = await sanityClient.fetch(productsByCollectionQuery, {
    collectionId: data._id,
    finish,
    size,
    designCode,
  });

  return (
    <>
      {/* HERO */}
      {data.hero && (
        <PageHero
          image={data.hero.image}
          heading={data.hero.heading || data.title}
          subheading={data.hero.subheading}
          size="medium"
        />
      )}
        {/* PRODUCTS (ALWAYS TERMINAL) */}
        <ProductsSection
          title={`${data.title} Products`}
          products={products}
          filters={{
            Finish: filters?.finishes || [],
            Size: filters?.sizes || [],
            "Design Code": filters?.designCodes || [],
          }}
        />
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* INTRO */}
        {data.description && (
          <PageIntro
            kicker={`About ${data.title}`}
            content={data.description}
          />
        )}

        {/* KEY FEATURES */}
        {data.keyFeatures?.length > 0 && (
          <KeyFeatures
            kicker="Key Features"
            title={
              data.keyFeaturesTitle ||
              "Designed for Performance & Durability"
            }
            features={data.keyFeatures}
          />
        )}


      </div>
    </>
  );
}