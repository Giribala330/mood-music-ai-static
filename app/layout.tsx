
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mood Music AI (Static)",
  description: "Mood-based music playlist recommender with static data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
