import FeaturedProducts from "./components/FeautredProducts";
import Hero from "./components/Hero";
import MaterialPrinciples from "./components/MaterialPrinciples";
import StatsStrip from "./components/StatsStrip";
import UnidecorPhilosophy from "./components/UnidecorePhilosophy";


export default function HomePage(){
  return(
    <main>
      <Hero/>
      <UnidecorPhilosophy/>
      <StatsStrip/>
      <MaterialPrinciples/>
      <FeaturedProducts/>
    </main>
  )
}