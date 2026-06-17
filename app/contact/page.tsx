import ContactPage from "./ContactPage";
import NavbarPremium from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | 1 Conveyancing",
  description: "Get in touch with our team today.",
};

export default function Page() {
  return (
    <>
      <NavbarPremium />
      <ContactPage />
      <Footer />
    </>
  );
}