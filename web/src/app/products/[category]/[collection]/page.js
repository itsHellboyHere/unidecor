import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";
import { collectionPageQuery } from "@/app/lib/queries/collectionPageQuery";

import PageHero from "@/app/components/hero/PageHero";
import PageIntro from "@/app/components/sections/PageIntro";
import KeyFeatures from "@/app/components/sections/KeyFeatures";
import CollectionGrid from "@/app/components/sections/CollectionGrid";
import ProductGrid from "@/app/components/products/ProductGrid";

export default async function CollectionPage({ params }) {
  const { collection } = await params;

  const data = await sanityClient.fetch(collectionPageQuery, {
    slug: collection,
  });

  if (!data) notFound();

  const hasChildren = data.children?.length > 0;
  const hasProducts = data.hasProducts && data.products?.length > 0;
  // console.log(data)
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
       <div style={{ position: 'relative', zIndex: 2}}>
      {/* INTRO */}
      {data.description && (
        <PageIntro
          kicker={`About ${data.title}` }
          content={data.description}
        />
      )}

      {/* KEY FEATURES */}
      {data.keyFeatures?.length > 0 && (
        <KeyFeatures
          kicker="Key Features"
          title={ data.keyFeaturesTitle ||"Designed for Performance & Style"}
          features={data.keyFeatures}
        />
      )}

      {/* CHILD COLLECTIONS */}
      {hasChildren && (
        <CollectionGrid
          kicker="Explore Range"
          title={`Discover ${data.title}`}
          items={data.children}
          baseSlug=""
        />
      )}

      {/* PRODUCTS */}
      {hasProducts && (
        <ProductGrid
          title={`${data.title} Products`}
          products={data.products}
        />
      )}
      </div>
    </>
  );
}