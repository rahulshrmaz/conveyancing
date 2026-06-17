import ProcessPage from "./ProcessPage";
import NavbarPremium from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Process | 1 Conveyancing",
  description: "A clear, proven process designed to get you from offer to completion.",
};

export default function Page() {
  return (
    <>
      <NavbarPremium />
      <ProcessPage />
      <Footer />
    </>
  );
}