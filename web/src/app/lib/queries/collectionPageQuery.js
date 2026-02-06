export const collectionPageQuery = `
*[_type == "productCollection" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  hasProducts,

  category->{
    slug
  },

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

  "children": *[
    _type == "productCollection" &&
    parent._ref == ^._id
  ] | order(title asc){
    _id,
    title,
    slug,
    hero{
      image{
        asset->{ url, metadata { lqip } }
      }
    }
  },

  "products": *[
    _type == "product" &&
    collection._ref == ^._id
  ] | order(name asc){
    _id,
    name,
    slug,
    finish,
    size,
    designCode,
    "image": images[isHero == true][0].asset->{
      url,
      metadata { lqip }
    }
  }
}
`;