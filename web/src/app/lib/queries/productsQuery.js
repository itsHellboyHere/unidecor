export const productsQuery = `
*[
  _type == "product" &&
  collection->category._ref == $categoryId &&
  ($finish == null || finish == $finish) &&
  ($size == null || size == $size) &&
  ($designCode == null || designCode == $designCode)
]{
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
`;

export const productsByCollectionQuery = `
*[
  _type == "product" &&
  collection._ref == $collectionId &&
  ($finish == null || finish == $finish) &&
  ($size == null || size == $size) &&
  ($designCode == null || designCode == $designCode)
]{
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
`;