import ServicesPage from "./ServicesPage";
import NavbarPremium from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Services | 1 Conveyancing",
  description: "Comprehensive property transaction support services.",
};

export default function Page() {
  return (
    <>
      <NavbarPremium />
      <ServicesPage />
      <Footer />
    </>
  );
}