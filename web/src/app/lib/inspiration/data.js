export async function getInspirationDepartment(department) {
  await new Promise((res) => setTimeout(res, 600)); 
  return inspirationData[department] || null;
}

export const inspirationData = {
  kitchen: {
    subtitle: "Kitchen Inspirations",
    title: "The Kitchen Studio",
    items: [ 
      { id: 1, src: "https://images.unsplash.com/photo-1556912177-c54030639a6d?auto=format&fit=crop&w=800", title: "Raw Birch Plywood Edge" },
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
  },

  bedroom: {
    subtitle: "Inspiration",
    title: "Bedroom Interiors",
    items: [
      { id: 1, src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800", title: "Warm Walnut Panels" },
      { id: 2, src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800", title: "Soft Matte Wardrobes" },
      { id: 3, src: "https://images.unsplash.com/photo-1617325252245-058880622312?auto=format&fit=crop&w=800", title: "Textured Fabric Headboard" },
      { id: 4, src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800", title: "Minimalist Floating Sideboard" },
      { id: 5, src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800", title: "Scandinavian Oak Bedframe" },
      { id: 6, src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800", title: "Deep Charcoal Accents" },
      { id: 7, src: "https://images.unsplash.com/photo-1505693413171-293669746a57?auto=format&fit=crop&w=800", title: "Ambient Built-in Lighting" },
      { id: 8, src: "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&w=800", title: "Velvet Texture Wall" },
      { id: 9, src: "https://images.unsplash.com/photo-1616593876635-42173167b574?auto=format&fit=crop&w=800", title: "Sleek Veneer Closet" }
    ],
  },

  washroom: {
    subtitle: "Washroom Design",
    title: "Washroom Spaces",
    items: [
      { id: 1, src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800", title: "Minimal Workstations" },
      { id: 2, src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800", title: "Stone Finish Countertop" },
      { id: 3, src: "https://images.unsplash.com/photo-1620626011761-9963d7b5947a?auto=format&fit=crop&w=800", title: "Acrylic Teal Shelving" },
      { id: 4, src: "https://images.unsplash.com/photo-1512918766674-ed62b9039c35?auto=format&fit=crop&w=800", title: "Gold Hardware Accents" },
      { id: 5, src: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800", title: "Moisture-Resistant Panels" },
      { id: 6, src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800", title: "Marble Texture Vanity" },
      { id: 7, src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800", title: "Seamless Glass Integration" },
      { id: 8, src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800", title: "Modern Slate Tiling" }
    ],
  },

  "living-room": {
    subtitle: "Modern Living",
    title: "Living Room Hub",
    items: [
      { id: 1, src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800", title: "Textured Accent Wall" },
      { id: 2, src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800", title: "Laminate Entertainment Unit" },
      { id: 3, src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800", title: "Hidden Storage Solutions" },
      { id: 4, src: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&w=800", title: "Walnut Coffee Table" },
      { id: 5, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800", title: "Modular Wall Shelving" },
      { id: 6, src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800", title: "Decorative Fluted Panels" },
      { id: 7, src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800", title: "Bold Color Blocking" },
      { id: 8, src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800", title: "Open Plan Harmony" },
      { id: 9, src: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800", title: "Polished Surface Finishes" },
      { id: 10, src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800", title: "Sunlit Material Textures" }
    ],
  },
};