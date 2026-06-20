import type { Metadata } from "next";
import LoginPage from "./LoginPage";

const baseUrl = "https://www.1conveyancing.com";
const title = "Sign In | 1 Conveyancing";
const description = "Access your 1 Conveyancing account. Secure login for clients and partners.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  alternates: { canonical: "/login" },
};

export default function Login() {
  return <LoginPage />;
}