import type { Metadata } from "next";

import ContactPage from "../(page-static)/about/contact/page";

export const metadata: Metadata = {
  title: "Contact Us - Infinity Loans & Business Solutions",
};

export default function Contact() {
  return <ContactPage />;
}
