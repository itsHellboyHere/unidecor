import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";

import { collectionPageQuery } from "@/app/lib/queries/collectionPageQuery";
import { productFiltersByCollectionQuery } from "@/app/lib/queries/productFiltersQuery";
import { productsByCollectionQuery } from "@/app/lib/queries/productsQuery";

import PageHero from "@/app/components/hero/PageHero";
import PageIntro from "@/app/components/sections/PageIntro";
import KeyFeatures from "@/app/components/sections/KeyFeatures";
import CollectionGrid from "@/app/components/sections/CollectionGrid";
import ProductsSection from "@/app/components/products/ProductsSection";




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

  const url = `https://www.theunidecor.com/products/${data.category?.slug?.current}/${data.slug.current}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Unidecor",
      images: data.hero?.image
        ? [
            {
              url: data.hero.image.asset.url,
              width: 1200,
              height: 630,
              alt: data.title,
            },
          ]
        : [],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: data.hero?.image?.asset?.url
        ? [data.hero.image.asset.url]
        : [],
    },
  };
}


export default async function CollectionPage({ params, searchParams }) {
  const { collection } = await params;
  const sp = await searchParams;

  const finish = sp?.finish ?? null;
  const size = sp?.size ?? null;
  const designCode = sp?.designCode ?? null;

  // STRUCTURE
  const data = await sanityClient.fetch(collectionPageQuery, {
    slug: collection,
  });

  if (!data) notFound();

  const hasChildren = data.children?.length > 0;
  const isTerminalCollection = data.hasProducts === true;

  // 2️ FILTER OPTIONS (ONLY IF TERMINAL)
  const filters = isTerminalCollection
    ? await sanityClient.fetch(productFiltersByCollectionQuery, {
      collectionId: data._id,
    })
    : null;
  // console.log("filter ",filters);
  //  PRODUCTS (URL-DRIVEN)
  const products = isTerminalCollection
    ? await sanityClient.fetch(productsByCollectionQuery, {
      collectionId: data._id,
      finish,
      size,
      designCode,
    })
    : [];

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

      <div style={{ position: "relative", zIndex: 2 }}>
        {data.description && (
          <PageIntro
            kicker={`About ${data.title}`}
            content={data.description}
          />
        )}

        {data.keyFeatures?.length > 0 && (
          <KeyFeatures
            kicker="Key Features"
            title={data.keyFeaturesTitle || "Designed for Performance & Style"}
            features={data.keyFeatures}
          />
        )}

        {/* CHILD COLLECTIONS */}
        {!isTerminalCollection && hasChildren && (
          <CollectionGrid
            kicker="Explore Range"
            title={`Discover ${data.title}`}
            items={data.children}
            baseSlug={`/products/${data.category.slug.current}/${data.slug.current}`}
          />
        )}

        {/* PRODUCTS + FILTERS */}
        {isTerminalCollection && (
          <ProductsSection
            title={`${data.title} Products`}
            products={products}
            filters={{
              Finish: filters?.finishes,
              Size: filters?.sizes,
              "Design Code": filters?.designCodes,
            }}
          />
        )}
      </div>
    </>
  );
}