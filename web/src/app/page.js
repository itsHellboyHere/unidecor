
import CampaignBanner from "./components/CampaignBanner";
import ExploreAttributes from "./components/ExploreAttributes";
import FeaturedProducts from "./components/FeautredProducts";
import Hero from "./components/Hero";
import Magnetic from "./components/Magnetic";
import MaterialPrinciples from "./components/MaterialPrinciples";
import MaterialStories from "./components/MaterialStories";
import StatsStrip from "./components/StatsStrip";
import TrustReviews from "./components/TrustReviews";
import UnidecorPhilosophy from "./components/UnidecorePhilosophy";
import HomeCTA from "@/app/components/HomeCTA";
import campaignQuery from "./lib/queries/campaignBanner";
import { sanityClient } from "./lib/sanity.client";
export default async function HomePage() {
  const campaign = await sanityClient.fetch(campaignQuery);

  return (
    <main>
      {/* {campaign && <CampaignBanner data={campaign}/>} */}
      <Hero />
      <UnidecorPhilosophy />
      {/* <StatsStrip/> */}
      <MaterialPrinciples />
      <FeaturedProducts />
      <MaterialStories />
      {/* <TrustReviews/> */}
      <ExploreAttributes
        title="Explore Materials"
        items={[
          { label: "Laminates", href: "/products/laminates", type: "category" },
          { label: "Wall Panel", href: "/products/wall-panel", type: "category" },
          { label: "Decorative Laminates", href: "/products/laminates/decorative-laminates", type: "collection" },
          { label: "Matte Finish", href: "/products/plywood?finish=Matte", type: "filter" },
          { label: "Louver", href: "/products/wall-panel/louver-panel", type: "filter" },
        ]}
      />

      <HomeCTA />

    </main>
  )
}