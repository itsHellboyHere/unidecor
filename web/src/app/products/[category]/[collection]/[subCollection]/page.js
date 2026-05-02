// products/[category]/[collection]/[subcollection]/page.js
import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";

import { subCollectionPageQuery } from "@/app/lib/queries/subCollectionPageQuery";
import { productFiltersByCollectionQuery } from "@/app/lib/queries/productFiltersQuery";
import {
  productsByCollectionQuery,
  productsByCollectionCountQuery,
} from "@/app/lib/queries/productsQuery";

import PageHero from "@/app/components/hero/PageHero";
import PageIntro from "@/app/components/sections/PageIntro";
import KeyFeatures from "@/app/components/sections/KeyFeatures";
import ProductsSection from "@/app/components/products/ProductsSection";

const PER_PAGE = 16;

export async function generateMetadata({ params }) {
  const { subCollection } = await params;
  if (!subCollection) return {};

  const data = await sanityClient.fetch(subCollectionPageQuery, { slug: subCollection });
  if (!data) return {};

  return {
    title: data.seo?.title || `${data.title} | Unidecor`,
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
  const page = Math.max(1, parseInt(sp?.page ?? "1", 10));
  const offset = (page - 1) * PER_PAGE;

  const data = await sanityClient.fetch(subCollectionPageQuery, { slug: subCollection });
  if (!data) notFound();

  const queryParams = {
    collectionId: data._id,
    finish,
    size,
    designCode,
    offset,
    limit: offset + PER_PAGE,
  };

  const [filters, products, total] = await Promise.all([
    sanityClient.fetch(productFiltersByCollectionQuery, { collectionId: data._id }),
    sanityClient.fetch(productsByCollectionQuery, queryParams),
    sanityClient.fetch(productsByCollectionCountQuery, { collectionId: data._id, finish, size, designCode }),
  ]);

  return (
    <>
      {data.hero && (
        <PageHero
          image={data.hero.image}
          heading={data.hero.heading || data.title}
          subheading={data.hero.subheading}
          size="medium"
        />
      )}

      <ProductsSection
        title={`${data.title} Products`}
        products={products}
        filters={{
          Finish: filters?.finishes || [],
          Size: filters?.sizes || [],
          "Design Code": filters?.designCodes || [],
        }}
        total={total}
        page={page}
        perPage={PER_PAGE}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {data.description && (
          <PageIntro kicker={`About ${data.title}`} content={data.description} />
        )}
        {data.keyFeatures?.length > 0 && (
          <KeyFeatures
            kicker="Key Features"
            title={data.keyFeaturesTitle || "Designed for Performance & Durability"}
            features={data.keyFeatures}
          />
        )}
      </div>
    </>
  );
}