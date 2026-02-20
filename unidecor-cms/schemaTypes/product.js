export default {
  name: "product",
  title: "Product (Single Item)",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "slug",
      title: "Product Slug",
      type: "slug",
      options: { source: "name" },
      validation: Rule => Rule.required(),
    },
    {
      name: "collection",
      title: "Product Collection",
      type: "reference",
      to: [{ type: "productCollection" }],
      validation: Rule => Rule.required(),
    },
    {
  name: "mrp",
  title: "MRP",
  type: "number",
},
    {
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "isHero",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
      validation: Rule => Rule.min(1),
    },

    {
      name: "designCode",
      type: "string",
    },
    {
      name: "size",
      type: "string",
    },
    {
      name: "finish",
      type: "string",
    },

    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },

    {
      name: "specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
    },

    /* Paint-specific (optional, safe) */
    { name: "highlights", type: "array", of: [{ type: "string" }] },
    { name: "keyFeatures", type: "array", of: [{ type: "string" }] },
    { name: "coverage", type: "string" },
    { name: "coverageNote", type: "text" },
    { name: "packing", type: "array", of: [{ type: "string" }] },
    { name: "application", type: "array", of: [{ type: "block" }] },
    // hardware specific

{
      name: "variants",
      title: "Product Variants (Hardware Only)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Variant Label (Example: 10 inch / 12 inch)",
              type: "string",
            },
            {
              name: "productCode",
              title: "Product Code (SKU)",
              type: "string",
            },
            {
              name: "size",
              title: "Size",
              type: "string",
            },
            {
              name: "mrp",
              title: "MRP",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "seo",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
      ],
    },
  ],
};