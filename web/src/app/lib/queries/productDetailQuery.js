export const productDetailQuery = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,

  designCode,
  size,
  finish,
  mrp,

  variants[]{
    label,
    productCode,
    size,
    mrp
  },

  description,
  highlights,
  keyFeatures,
  coverage,
  coverageNote,
  packing,
  application,

  "heroImage": images[isHero == true][0].asset->{
    url,
    metadata { lqip }
  },

  specifications[]{
    label,
    value
  },
"collectionRef": collection._ref,
  collection->{
    _id,
    title,
    slug,
    hasProducts,
    category->{
      title,
      slug
    }
  },
  seo{
    title,
    description
  }
}
`;