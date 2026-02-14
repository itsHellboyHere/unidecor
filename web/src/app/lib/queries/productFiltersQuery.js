export const productFiltersQuery = `
{
  "finishes": array::unique(
    *[_type == "product" && collection->category._ref == $categoryId && defined(finish)].finish
  ),
  "sizes": array::unique(
    *[_type == "product" && collection->category._ref == $categoryId && defined(size)].size
  ),
  "designCodes": array::unique(
    *[_type == "product" && collection->category._ref == $categoryId && defined(designCode)].designCode
  )
}
`;

export const productFiltersByCollectionQuery = `
{
  "finishes": array::unique(
    *[_type == "product" && collection._ref == $collectionId && defined(finish)].finish
  ),
  "sizes": array::unique(
    *[_type == "product" && collection._ref == $collectionId && defined(size)].size
  ),
  "designCodes": array::unique(
    *[_type == "product" && collection._ref == $collectionId && defined(designCode)].designCode
  )
}
`;
