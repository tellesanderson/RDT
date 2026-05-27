import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Radar da Torcida | Placar & Corneta Oficial",
  description: "Resumos dinâmicos de jogos, onde assistir e central de corneta em tempo real. Sem anúncios, sem clickbaits.",
  keywords: ["futebol", "radar da torcida", "brasileirao", "palpites", "corneta", "notas de futebol"],
  authors: [{ name: "Radar da Torcida" }],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Radar da Torcida | Placar & Corneta Oficial",
    description: "Resumos dinâmicos de jogos, onde assistir e central de corneta em tempo real. Sem anúncios, sem clickbaits.",
    type: "website",
    locale: "pt_BR",
  }
};

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
