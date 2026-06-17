import AboutPage from "./AboutPage";
import NavbarPremium from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | 1 Conveyancing",
  description: "Learn about our smarter approach to property transactions.",
};

export default function Page() {
  return (
    <>
      <NavbarPremium />
      <AboutPage />
      <Footer />
    </>
  );
}