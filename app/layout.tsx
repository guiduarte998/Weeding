import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
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
        <header className="site-header">
          <Link href="/#inicio" className="site-logo">
            G & K
          </Link>
          <nav className="site-nav" aria-label="Principal">
            <Link href="/#inicio">Início</Link>
            <Link href="/#detalhes">Detalhes</Link>
            <Link href="/#confirmacao">Confirmação</Link>
            <Link href="/#presentes">Presentes</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
