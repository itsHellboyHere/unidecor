// lib/queries/productDetailQuery.js

export const productDetailQuery = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  designCode,
  size,
  finish,

  description,

  "heroImage": images[isHero == true][0].asset->{
    url,
    metadata { lqip }
  },

  specifications[]{
    label,
    value
  },

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