import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";

import { categoryPageQuery } from "@/app/lib/queries/categoryPageQuery";
import { productFiltersQuery } from "@/app/lib/queries/productFiltersQuery";
import {
  productsQuery,
  productsCountQuery,
} from "@/app/lib/queries/productsQuery";

import PageHero from "@/app/components/hero/PageHero";
import PageIntro from "@/app/components/sections/PageIntro";
import KeyFeatures from "@/app/components/sections/KeyFeatures";
import CollectionGrid from "@/app/components/sections/CollectionGrid";
import ProductsSection from "@/app/components/products/ProductsSection";
import { ScrollToHash } from "@/app/components/ScrollToHash";

const PER_PAGE = 16;

export async function generateMetadata({ params }) {
  const { category } = await params;

  const data = await sanityClient.fetch(categoryPageQuery, { slug: category });
  if (!data) return { title: "Category Not Found | Unidecor" };

  const title = data.seo?.title || `${data.title} | Premium Interior Surfaces`;
  const description =
    data.seo?.description ||
    `Explore ${data.title} by Unidecor. Premium laminates and interior surface solutions backed by 20+ years of expertise.`;
  const image = data.hero?.image?.asset?.url;

  return {
    title,
    description,
    alternates: { canonical: `/products/${data.slug.current}` },
    openGraph: {
      title,
      description,
      url: `/products/${data.slug.current}`,
      images: image ? [{ url: image, width: 1200, height: 630, alt: data.title }] : undefined,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const sp = await searchParams;

  const finish = sp?.finish ?? null;
  const size = sp?.size ?? null;
  const designCode = sp?.designCode ?? null;
  const page = Math.max(1, parseInt(sp?.page ?? "1", 10));
  const offset = (page - 1) * PER_PAGE;

  const categoryData = await sanityClient.fetch(categoryPageQuery, { slug: category });
  if (!categoryData) notFound();

  const isTerminalCategory = categoryData.hasDirectProducts === true;
  const collections = categoryData.collections || [];

  const queryParams = {
    categoryId: categoryData._id,
    finish,
    size,
    designCode,
    offset,
    limit: offset + PER_PAGE,
  };

  const [filters, products, total] = isTerminalCategory
    ? await Promise.all([
        sanityClient.fetch(productFiltersQuery, { categoryId: categoryData._id }),
        sanityClient.fetch(productsQuery, queryParams),
        sanityClient.fetch(productsCountQuery, { categoryId: categoryData._id, finish, size, designCode }),
      ])
    : [null, [], 0];

  return (
    <>
      <ScrollToHash />
      <PageHero
        image={categoryData.hero?.image}
        heading={categoryData.hero?.heading || categoryData.title}
        subheading={categoryData.hero?.subheading}
        size="large"
      />

      {isTerminalCategory && (
        <ProductsSection
          title={`${categoryData.title} Products`}
          products={products}
          filters={{
            Finish: filters?.finishes,
            Size: filters?.sizes,
            "Design Code": filters?.designCodes,
          }}
          total={total}
          page={page}
          perPage={PER_PAGE}
        />
      )}

      {!isTerminalCategory && collections.length > 0 && (
        <CollectionGrid
          kicker="Explore Collections"
          title={`Discover ${categoryData.title}`}
          items={collections}
          baseSlug={`/products/${categoryData.slug.current}`}
        />
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
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
      </div>
    </>
  );
}