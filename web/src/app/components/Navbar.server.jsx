import { getNavbarData } from "@/app/lib/sanity/navbar";
import NavbarClient from "./Navbar.client";


export default async function Navbar() {
  const data = await getNavbarData();

  return <NavbarClient  data={data}/>
}