import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Radar da Torcida | Copa do Mundo 2026 - Hub de Elite",
  description: "Acompanhe a contagem regressiva, classificação dos grupos e os maiores confrontos da Copa do Mundo FIFA 2026 em uma interface premium imersiva inspirada em painéis de jogos.",
  keywords: ["copa do mundo 2026", "copa 2026", "tabela copa do mundo", "brasil x argentina copa 2026", "futebol", "bento grid futebol"],
  authors: [{ name: "Radar da Torcida" }],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Radar da Torcida | Copa do Mundo 2026 - Hub de Elite",
    description: "Acompanhe a contagem regressiva, classificação dos grupos e os maiores confrontos da Copa do Mundo FIFA 2026 em uma interface premium imersiva.",
    type: "website",
    locale: "pt_BR",
  }
};

export const viewport: Viewport = {
  themeColor: "#02040a",
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
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-neon-green/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
