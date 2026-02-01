export const categoryPageQuery = `
*[_type == "productCategory" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  hasDirectProducts,

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

  "collections": *[
    _type == "productCollection" &&
    references(^._id) &&
    !defined(parent)
  ] | order(title asc){
    _id,
    title,
    slug,
    hasProducts,
    hero{
      image{
        asset->{ url, metadata { lqip } }
      }
    }
  }
}
`;