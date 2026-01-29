export default {
  name: 'category',
  title: 'Category',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },

    {
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          { title: 'Products', value: 'products' },
          { title: 'Inspiration', value: 'inspiration' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },

    {
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty for top-level menu items'
    },

    {
      name: 'order',
      title: 'Menu Order',
      type: 'number'
    },

    {
      name: 'showInMenu',
      title: 'Show in Navbar',
      type: 'boolean',
      initialValue: true
    }
  ]
};