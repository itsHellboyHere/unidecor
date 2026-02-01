export default {
  name: "productCollection",
  title: "Product Collection",
  type: "document",

  fields: [
    /* =========================
       BASIC INFO
    ========================= */
    {
      name: "title",
      title: "Collection Title",
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

    /* =========================
       RELATIONSHIPS
    ========================= */
    {
      name: "category",
      title: "Top Level Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: Rule => Rule.required(),
    },

    {
      name: "parent",
      title: "Parent Collection",
      type: "reference",
      to: [{ type: "productCollection" }],
      description: "Used for deep nesting like Decorative → 0.8 MM",
    },

    /* =========================
       HERO
    ========================= */
    {
      name: "hero",
      title: "Collection Hero (Optional)",
      type: "hero",
    },

    /* =========================
       CONTENT
    ========================= */
    {
      name: "description",
      title: "Collection Description",
      type: "array",
      of: [{ type: "block" }],
    },

    {
      name: "keyFeaturesTitle",
      title: "Key Features Title",
      type: "string",
      description: "Optional override for section heading",
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
                "Must match frontend icon key (e.g. scratch, eco, water)",
            },
          ],
        },
      ],
    },

    /* =========================
       TERMINAL LOGIC
    ========================= */
    {
      name: "hasProducts",
      title: "This Collection Contains Products",
      type: "boolean",
      initialValue: false,
      description:
        "If true → show product grid. If false → show child collections.",
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