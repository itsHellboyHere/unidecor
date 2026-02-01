export default {
  name: "product",
  title: "Product (Single Item)",
  type: "document",

  fields: [
    /* =========================
       BASIC INFO
    ========================= */
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

    /* =========================
       RELATIONSHIP
    ========================= */
    {
      name: "collection",
      title: "Product Collection",
      type: "reference",
      to: [{ type: "productCollection" }],
      validation: Rule => Rule.required(),
      description:
        "Attach ONLY to terminal collection (hasProducts = true)",
    },

    /* =========================
       MEDIA (PRODUCT HERO)
    ========================= */
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
              title: "Use as Hero Image",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
      validation: Rule => Rule.min(1),
    },

    /* =========================
       PRODUCT DATA
    ========================= */
    {
      name: "designCode",
      title: "Design Code",
      type: "string",
    },

    {
      name: "size",
      title: "Size",
      type: "string",
    },

    {
      name: "finish",
      title: "Finish",
      type: "string",
    },

    {
      name: "description",
      title: "Product Description",
      type: "array",
      of: [{ type: "block" }],
    },

    {
      name: "specifications",
      title: "Specifications",
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

    /* =========================
       SEO
    ========================= */
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
      ],
    },
  ],
};