export const productFiltersQuery = `
{
  "finishes": array::unique(
    *[_type == "product" && collection->category._ref == $categoryId].finish
  ),
  "sizes": array::unique(
    *[_type == "product" && collection->category._ref == $categoryId].size
  ),
  "designCodes": array::unique(
    *[_type == "product" && collection->category._ref == $categoryId].designCode
  )
}
`;

export const productFiltersByCollectionQuery = `
{
  "finishes": array::unique(
    *[_type == "product" && collection._ref == $collectionId].finish
  ),
  "sizes": array::unique(
    *[_type == "product" && collection._ref == $collectionId].size
  ),
  "designCodes": array::unique(
    *[_type == "product" && collection._ref == $collectionId].designCode
  )
}
`;

