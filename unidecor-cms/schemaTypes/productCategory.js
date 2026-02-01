export default {
  name: "productCategory",
  title: "Product Category",
  type: "document",

  fields: [
    /* =========================
       BASIC INFO
    ========================= */
    {
      name: "title",
      title: "Category Title",
      type: "string",
      validation: Rule => Rule.required(),
    },

    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: Rule => Rule.required(),
    },

    {
      name: "hasDirectProducts",
      title: "Has Direct Products",
      type: "boolean",
      initialValue: false,
      description:
        "Enable for categories like Plywood that list products directly",
    },

    /* =========================
       HERO
    ========================= */
    {
      name: "hero",
      title: "Category Hero (Optional)",
      type: "hero",
    },

    /* =========================
       CONTENT
    ========================= */
    {
      name: "description",
      title: "Category Description",
      type: "array",
      of: [{ type: "block" }],
    },

    /* =========================
       KEY FEATURES
    ========================= */
    {
      name: "keyFeaturesTitle",
      title: "Key Features Title",
      type: "string",
      description: "Overrides default section heading",
    },

    {
      name: "keyFeatures",
      title: "Key Features (Optional)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Feature Text",
              type: "string",
              validation: Rule => Rule.required(),
            },
            {
              name: "icon",
              title: "Icon Key",
              type: "string",
              description:
                "Must match frontend icon map key (e.g. scratch, water, eco)",
            },
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