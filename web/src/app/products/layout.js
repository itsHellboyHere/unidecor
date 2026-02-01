import Navbar from "@/app/components/Navbar.server";

export default function ProductsLayout({ children }) {
  return (
    <>
      <Navbar variant="hero" />
      {children}
    </>
  );
}