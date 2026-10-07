import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Learning Club · First playable",
  description: "A family learning arcade. Local development pilot.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
