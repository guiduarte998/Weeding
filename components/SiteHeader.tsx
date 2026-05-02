"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";

const INVITE_HEADER_PATHS = ["/locais", "/confirmacao", "/presentes"];

const mobileNavMq = "(max-width: 767px)";

function subscribeMobileNav(callback: () => void) {
  const mq = window.matchMedia(mobileNavMq);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMobileNavSnapshot() {
  return window.matchMedia(mobileNavMq).matches;
}

function getMobileNavServerSnapshot() {
  return false;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const inviteNav = INVITE_HEADER_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();
  const mobileNavLayout = useSyncExternalStore(
    subscribeMobileNav,
    getMobileNavSnapshot,
    getMobileNavServerSnapshot
  );
  const headerClass = inviteNav ? "site-header site-header--invite" : "site-header";
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavLayout) setMenuOpen(false);
  }, [mobileNavLayout]);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={headerClass}>
      <div className="site-header__start">
        <Link href="/" className="site-logo" onClick={closeMenu}>
          G & K
        </Link>
        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls={navId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="visually-hidden">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
          <span className="site-nav-toggle__bar" aria-hidden />
          <span className="site-nav-toggle__bar" aria-hidden />
          <span className="site-nav-toggle__bar" aria-hidden />
        </button>
      </div>
      {menuOpen ? (
        <button
          type="button"
          className="site-nav-backdrop"
          aria-label="Fechar menu"
          tabIndex={-1}
          onClick={closeMenu}
        />
      ) : null}
      <nav
        id={navId}
        className={`site-nav${menuOpen ? " site-nav--open" : ""}`}
        aria-label="Principal"
        aria-hidden={mobileNavLayout && !menuOpen ? true : undefined}
      >
        <Link href="/" onClick={closeMenu}>
          Início
        </Link>
        <a href={pathname === "/" ? "#detalhes" : "/#detalhes"} onClick={closeMenu}>
          Detalhes
        </a>
        <Link href="/locais" onClick={closeMenu}>
          Locais
        </Link>
        <Link href="/confirmacao" onClick={closeMenu}>
          Confirmação
        </Link>
        <Link href="/presentes" onClick={closeMenu}>
          Presentes
        </Link>
      </nav>
    </header>
  );
}
