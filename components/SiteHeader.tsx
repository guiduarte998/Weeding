"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const INVITE_HEADER_PATHS = ["/locais", "/confirmacao", "/presentes"];

export default function SiteHeader() {
  const pathname = usePathname();
  const inviteNav = INVITE_HEADER_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <header className={inviteNav ? "site-header site-header--invite" : "site-header"}>
      <Link href="/" className="site-logo">
        G & K
      </Link>
      <nav className="site-nav" aria-label="Principal">
        <Link href="/">Início</Link>
        <Link href="/#detalhes">Detalhes</Link>
        <Link href="/locais">Locais</Link>
        <Link href="/confirmacao">Confirmação</Link>
        <Link href="/presentes">Presentes</Link>
      </nav>
    </header>
  );
}
