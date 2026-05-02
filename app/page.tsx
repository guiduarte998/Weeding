import CanvaInviteEmbed from "@/components/CanvaInviteEmbed";
import GalleryStrip from "@/components/GalleryStrip";
import CountdownBlock from "@/components/CountdownBlock";
import FooterWedding from "@/components/FooterWedding";

export default function HomePage() {
  return (
    <main className="site-main">
      <div id="inicio" className="site-anchor" />
      <CanvaInviteEmbed />

      <div className="home-invite-flow">
        <section className="site-section home-invite-flow__segment site-section--flush" aria-labelledby="calendar-heading">
          <div className="site-inner site-inner--center">
            <p id="calendar-heading" className="page-invite-sub__eyebrow">
              Marque na agenda
            </p>
            <h2 className="page-invite-sub__title">13 de junho de 2026</h2>
            <p className="page-invite-sub__lede">São Paulo, Brasil</p>
            <CountdownBlock variant="invite" />
          </div>
        </section>

        <GalleryStrip variant="invite" />
      </div>

      <FooterWedding />
    </main>
  );
}
