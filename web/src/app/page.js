
import ExploreAttributes from "./components/ExploreAttributes";
import FeaturedProducts from "./components/FeautredProducts";
import Hero from "./components/Hero";
import MaterialPrinciples from "./components/MaterialPrinciples";
import MaterialStories from "./components/MaterialStories";
import StatsStrip from "./components/StatsStrip";
import TrustReviews from "./components/TrustReviews";
import UnidecorPhilosophy from "./components/UnidecorePhilosophy";


export default function HomePage(){
  return(
    <main>
      <Hero/>
      <UnidecorPhilosophy/>
      <StatsStrip/>
      <MaterialPrinciples/>
      <FeaturedProducts/>
      <MaterialStories />
        <TrustReviews/>
     <ExploreAttributes
  title="Explore Materials"
  items={[
    { label: "Laminates", href: "/products/laminates", type: "category" },
    { label: "Plywood", href: "/products/plywood", type: "category" },
    { label: "Decorative Laminates", href: "/products/laminates/decorative-laminates", type: "collection" },
    { label: "Matte Finish", href: "/products/plywood?finish=Matte", type: "filter" },
    { label: "High Gloss", href: "/products/plywood?finish=Glossy", type: "filter" },
  ]}
/>
    </main>
  )
}