// Hero.jsx — Server Component (fetches Sanity data)
import { sanityClient } from "../lib/sanity.client"
import HeroCards from "./hero/HeroCards"

const heroSlidesQuery = `
  *[_type == "heroSlide"] | order(order asc) {
    title,
    subtitle,
    link,
    loop,
    order,
    "videoUrl": video.asset->url,
    "posterUrl": poster.asset->url,
  }
`

export default async function Hero() {
  const slides = await sanityClient.fetch(heroSlidesQuery, {}, {
    next: { revalidate: 60 },
  })

  return <HeroCards slides={slides} />
}