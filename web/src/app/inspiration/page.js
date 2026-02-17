import MasonryGallery from "./comp/MasonryGallery";

export default function InspirationPage() {
    // Mock data for the mixed gallery
    const mixedImages = [
        { id: 1, title: "Modern Kitchen Laminates", src: "https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Kitchen" },
        { id: 2, title: "Luxury Bedroom Wall Panels", src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800", category: "Bedroom" },
        { id: 3, title: "Acrylic Bathroom Cabinets", src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800", category: "Washroom" },
        { id: 4, title: "Textured Living Room Walls", src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800", category: "Living" },
        { id: 5, title: "Balcony Decking Solutions", src: "https://images.unsplash.com/photo-1732998696048-b6417fd551b0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Balcony" },
        { id: 6, title: "Premium Paint Finishes", src: "https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=800", category: "Paints" },
        { id: 7, title: "Hardware & Kitchen Fittings", src: "https://i.pinimg.com/736x/80/94/c7/8094c78330a01a94de661870a364d9b7.jpg", category: "Kitchen" },

        { id: 8, title: "Minimalist Wardrobe Design", src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800", category: "Bedroom" },
        { id: 9, title: "Vibrant Wall Panels", src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800", category: "Wall Panels" },
        { id: 10, title: "Sleek Office Acrylics", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", category: "Office" },
        { id: 11, title: "Cozy Nook Laminates", src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800", category: "Living" },
        { id: 12, title: "Entrance Way Textures", src: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=800", category: "Entrance" },
    ];

    return (
        <main>
            <MasonryGallery
                title="An Inspiration"
                subtitle="Explore our curated mix of premium surfaces across your home areas"
                items={mixedImages}
            />
            {/* Cards for specific departments will be added here next */}
        </main>
    );
}