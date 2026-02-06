// lib/queries/subCollectionPageQuery.js
export const subCollectionPageQuery = `
*[_type == "productCollection" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  hasProducts,

  hero{
    heading,
    subheading,
    image{
      asset->{ url, metadata { lqip } }
    }
  },

  description,

  keyFeaturesTitle,
  keyFeatures[]{
    label,
    icon
  },

  seo{
    title,
    description
  }
}
`;