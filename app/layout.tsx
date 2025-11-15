import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opportunités Business Réunion",
  description:
    "Sélection d'idées d'entreprises et de services rentables adaptés au marché de La Réunion, intégrant tourisme, culture créole, digital et durabilité."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
