// app/lib/inspiration/kitchen.ts
export async function getKitchenGallery() {
  await new Promise(res => setTimeout(res, 600));

  return {
    subtitle: "Our Collections",
    title: "The Kitchen Studio",
    items: [ 
  { id: 1, src: "https://www.pexels.com/photo/empty-two-black-chair-2089696/", title: "Raw Birch Plywood Edge" },
  { id: 2, src: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&w=800", title: "Matte Slate Laminate" },
  { id: 3, src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800", title: "Natural Oak Veneer Detail" },
  { id: 4, src: "https://images.unsplash.com/photo-1565182999561-18d7dc63c391?auto=format&fit=crop&w=800", title: "Exposed Ply Floating Shelf" },
  { id: 5, src: "https://images.unsplash.com/photo-1539139539753-e4088b136bb8?auto=format&fit=crop&w=800", title: "Minimalist White HPL" },
  { id: 6, src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800", title: "Scandi-Style Light Grain" },
  { id: 7, src: "https://images.unsplash.com/photo-1604709815942-c16427402d4a?auto=format&fit=crop&w=800", title: "Warm Walnut Wood Finish" },
  { id: 8, src: "https://images.unsplash.com/photo-1595814433015-e6f5cd821c46?auto=format&fit=crop&w=800", title: "Modern Industrial Edge" },
  { id: 9, src: "https://images.unsplash.com/photo-1620626011761-9963d7b5947a?auto=format&fit=crop&w=800", title: "Textured Forest Green" },
  { id: 10, src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800", title: "Premium Birch Core Detail" }
   ],
}
}