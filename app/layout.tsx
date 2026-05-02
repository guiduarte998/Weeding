import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Casamento Guilherme & Kelly",
  description: "O casamento de Guilherme & Kelly — 13 de junho de 2026, São Paulo."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fontSerif.variable} ${fontSans.variable}`}>
      <body className="site-body">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
