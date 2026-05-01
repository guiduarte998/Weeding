import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casamento Guilherme & Kelly",
  description: "Site de casamento com confirmação e presentes"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div style={{ height: 4, background: "#7a4b52" }} />
        <header className="container" style={{ paddingBottom: 0 }}>
          <nav
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <strong>Guilherme & Kelly</strong>
            <div style={{ display: "flex", gap: "1rem", fontSize: "0.95rem" }}>
              <Link href="/">Início</Link>
              <Link href="/rsvp">Confirmação</Link>
              <Link href="/gifts">Presentes</Link>
              <Link href="/admin">Admin</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
