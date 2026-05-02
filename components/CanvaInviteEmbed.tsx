const INVITE_FILES = {
  png: "nós vamos nos casar!.png",
  svg: "nós vamos nos casar!.svg"
} as const;

function publicUrl(file: string) {
  return `/${encodeURIComponent(file)}`;
}

export default function CanvaInviteEmbed() {
  const png = publicUrl(INVITE_FILES.png);
  const svg = publicUrl(INVITE_FILES.svg);

  return (
    <section id="convite" className="invite-visual-section" aria-labelledby="invite-visual-heading">
      <h2 id="invite-visual-heading" className="visually-hidden">
        Convite — Kelly e Guilherme
      </h2>
      <div className="invite-visual-frame">
        <div id="detalhes" className="invite-inpage-anchor invite-inpage-anchor--detalhes" aria-hidden />
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
      </div>
    </section>
  );
}
