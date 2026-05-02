import Link from "next/link";

/**
 * Convite: estático (PNG/SVG em `public`) ou embed ao vivo do Canva.
 * Troque USE_CANVA_EMBED para true se quiser só o iframe (atualiza com o Canva).
 */
const USE_CANVA_EMBED = false;

/** Para o texto “Link” na arte — ajuste se quiser outro destino (ex.: WhatsApp). */
const INVITE_LINK_HOTSPOT_HREF = "/locais";

const INVITE_FILES = {
  png: "nós vamos nos casar! (2).png",
  svg: "nós vamos nos casar! (2).svg"
} as const;

const CANVA_EMBED_SRC =
  "https://www.canva.com/design/DAHIiG1kg9A/0xhdBHTxPwnPGoRt4lfjOg/view?embed";

function publicUrl(file: string) {
  return `/${encodeURIComponent(file)}`;
}

function InviteHotspots() {
  return (
    <div className="invite-hotspots">
      <Link href="/presentes" className="invite-hotspot invite-hotspot--presentes" prefetch={false}>
        <span className="visually-hidden">Nossa lista de presentes</span>
      </Link>
      <Link href="/confirmacao" className="invite-hotspot invite-hotspot--confirmacao" prefetch={false}>
        <span className="visually-hidden">Confirme sua presença</span>
      </Link>
      <Link href={INVITE_LINK_HOTSPOT_HREF} className="invite-hotspot invite-hotspot--link" prefetch={false}>
        <span className="visually-hidden">Link</span>
      </Link>
    </div>
  );
}

export default function CanvaInviteEmbed() {
  const png = publicUrl(INVITE_FILES.png);
  const svg = publicUrl(INVITE_FILES.svg);

  return (
    <section id="convite" className="invite-visual-section" aria-labelledby="invite-visual-heading">
      <h2 id="invite-visual-heading" className="visually-hidden">
        Convite — Kelly e Guilherme
      </h2>
      <div className={`invite-visual-frame ${USE_CANVA_EMBED ? "invite-visual-frame--embed" : ""}`}>
        <div id="detalhes" className="invite-inpage-anchor invite-inpage-anchor--detalhes" aria-hidden />
        {USE_CANVA_EMBED ? (
          <div className="invite-canva-embed">
            <iframe
              title="Convite do casamento Kelly e Guilherme (Canva)"
              src={CANVA_EMBED_SRC}
              loading="lazy"
              allowFullScreen
              allow="fullscreen"
            />
          </div>
        ) : (
          <picture>
            <source srcSet={svg} type="image/svg+xml" />
            <img
              src={png}
              alt="Convite do casamento Kelly e Guilherme — nós vamos nos casar"
              className="invite-visual-img"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        )}
        <InviteHotspots />
      </div>
    </section>
  );
}
