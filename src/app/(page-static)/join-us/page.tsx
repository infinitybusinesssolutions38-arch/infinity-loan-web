import type { Metadata } from "next";

import JoinUsClient from "./JoinUsClient";

export const metadata: Metadata = {
  title: "Join Us - Infinity Loans & Business Solutions",
};

export default function JoinUsPage() {
  return <JoinUsClient />;
}