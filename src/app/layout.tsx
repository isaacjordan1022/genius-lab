import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Genius Lab",
  description: "A place for curious minds to learn, think and play.",
  icons: {
    icon: "/brand/genius-lab-icon.svg",
    apple: "/brand/genius-lab-icon.svg",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
