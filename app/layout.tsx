import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soukaye Kane | Portfolio",
  description: "Développeuse Génie Informatique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}