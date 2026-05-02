import type { ReactNode } from "react";

type ContentLayout = "narrow" | "wide" | "bleed";

type InviteSubpageShellProps = {
  title: string;
  eyebrow?: string;
  lede?: string;
  /** Largura do bloco de conteúdo abaixo do título (mapas em tela cheia, grid largo, etc.). */
  contentLayout?: ContentLayout;
  children: ReactNode;
};

const contentClassMap: Record<ContentLayout, string> = {
  narrow: "page-invite-sub__content",
  wide: "page-invite-sub__content page-invite-sub__content--wide",
  bleed: "page-invite-sub__content page-invite-sub__content--bleed"
};

export default function InviteSubpageShell({
  title,
  eyebrow,
  lede,
  contentLayout = "narrow",
  children
}: InviteSubpageShellProps) {
  const contentClass = contentClassMap[contentLayout];

  return (
    <main className="site-main page-invite-sub">
      <div className="page-invite-sub__intro page-invite-sub__inner--narrow">
        <header className="page-invite-sub__header">
          {eyebrow ? <p className="page-invite-sub__eyebrow">{eyebrow}</p> : null}
          <h1 className="page-invite-sub__title">{title}</h1>
          {lede ? <p className="page-invite-sub__lede">{lede}</p> : null}
        </header>
      </div>
      <div className={contentClass}>{children}</div>
    </main>
  );
}
