import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";

import { collectionPageQuery } from "@/app/lib/queries/collectionPageQuery";
import { productFiltersByCollectionQuery } from "@/app/lib/queries/productFiltersQuery";
import {
  productsByCollectionQuery,
  productsByCollectionCountQuery,
} from "@/app/lib/queries/productsQuery";

import PageHero from "@/app/components/hero/PageHero";
import PageIntro from "@/app/components/sections/PageIntro";
import KeyFeatures from "@/app/components/sections/KeyFeatures";
import CollectionGrid from "@/app/components/sections/CollectionGrid";
import ProductsSection from "@/app/components/products/ProductsSection";

const PER_PAGE = 16;

export async function generateMetadata({ params }) {
  const { collection } = await params;

  const data = await sanityClient.fetch(collectionPageQuery, {
    slug: collection,
  });

  if (!data) return {};

  const title =
    data.seo?.title ||
    `${data.title} | ${data.category?.title || "Products"}`;

  const description =
    data.seo?.description ||
    data.description?.[0]?.children?.[0]?.text ||
    `Explore ${data.title} by Unidecor. Premium surfaces designed for modern interiors.`;

  const url = `https://theunidecor.com/products/${data.category?.slug?.current}/${data.slug.current}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Unidecor",
      images: data.hero?.image
        ? [{ url: data.hero.image.asset.url, width: 1200, height: 630, alt: data.title }]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: data.hero?.image?.asset?.url ? [data.hero.image.asset.url] : [],
    },
  };
}

export default async function CollectionPage({ params, searchParams }) {
  const { collection } = await params;
  const sp = await searchParams;

  const finish = sp?.finish ?? null;
  const size = sp?.size ?? null;
  const designCode = sp?.designCode ?? null;
  const page = Math.max(1, parseInt(sp?.page ?? "1", 10));
  const offset = (page - 1) * PER_PAGE;

  // STRUCTURE
  const data = await sanityClient.fetch(collectionPageQuery, { slug: collection });
  if (!data) notFound();

  const hasChildren = data.children?.length > 0;
  const isTerminalCollection = data.hasProducts === true;

  const queryParams = {
    collectionId: data._id,
    finish,
    size,
    designCode,
    offset,
    limit: offset + PER_PAGE,
  };

  const [filters, products, total] = isTerminalCollection
    ? await Promise.all([
        sanityClient.fetch(productFiltersByCollectionQuery, { collectionId: data._id }),
        sanityClient.fetch(productsByCollectionQuery, queryParams),
        sanityClient.fetch(productsByCollectionCountQuery, { collectionId: data._id, finish, size, designCode }),
      ])
    : [null, [], 0];

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

      {isTerminalCollection && (
        <ProductsSection
          title={data.title}
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

      {!isTerminalCollection && hasChildren && (
        <CollectionGrid
          kicker="Explore Range"
          title={`Discover ${data.title}`}
          items={data.children}
          baseSlug={`/products/${data.category.slug.current}/${data.slug.current}`}
        />
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        {data.description && (
          <PageIntro kicker={`About ${data.title}`} content={data.description} />
        )}
        {data.keyFeatures?.length > 0 && (
          <KeyFeatures
            kicker="Key Features"
            title={data.keyFeaturesTitle || "Designed for Performance & Style"}
            features={data.keyFeatures}
          />
        )}
      </div>
    </>
  );
}