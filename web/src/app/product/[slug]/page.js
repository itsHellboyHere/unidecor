import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";
import { productDetailQuery } from "@/app/lib/queries/productDetailQuery";
import ProductDescription from "@/app/product/components/ProductDescrption";
import { relatedProductsQuery } from "@/app/lib/queries/realtedProductsQuery";



/* =========================
   METADATA
========================= */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = await sanityClient.fetch(productDetailQuery, {
    slug,
  });

  if (!product) return {};

  const title =
    product.seo?.title ||
    `${product.name} | UNIDECOR`;

  const description =
    product.seo?.description ||
    product.description?.[0]?.children?.[0]?.text ||
    "Premium interior product by UNIDECOR.";

  const image = product.heroImage?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({ params }) {
    const {slug} = await params;
  const product = await sanityClient.fetch(productDetailQuery, {
    slug: slug,
  });

  if (!product) notFound();
  const relatedProducts = await sanityClient.fetch(
    relatedProductsQuery,
    {
      collectionId: product.collectionRef,
      slug,
    }
  );

  return <ProductDescription product={product} 
  relatedProducts={relatedProducts}
  />;
}