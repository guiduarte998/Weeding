import EventCards from "@/components/EventCards";
import GalleryStrip from "@/components/GalleryStrip";
import HeroBanner from "@/components/HeroBanner";
import RSVPForm from "@/components/RSVPForm";
import GiftList from "@/components/GiftList";
import CountdownBlock from "@/components/CountdownBlock";
import FooterWedding from "@/components/FooterWedding";

export default function HomePage() {
  return (
    <main className="site-main">
      <div id="inicio" className="site-anchor" />
      <HeroBanner
        imageUrl="/hero-save-the-date.png"
        title="Guilherme & Kelly"
        subtitle="13 de junho de 2026 · São Paulo"
      />

      <section className="site-section site-section--narrow" aria-labelledby="intro-heading">
        <div className="site-inner">
          <p className="eyebrow">Bem-vindos</p>
          <h2 id="intro-heading" className="display-serif">
            Guilherme <span className="ampersand">&</span> Kelly
          </h2>
          <div className="prose-dark">
            <p>
              A contagem regressiva já começou, e seria uma honra enorme celebrar esse momento especial ao seu lado.
            </p>
            <p>
              Neste site você encontra tudo o que precisa para nos acompanhar: detalhes do grande dia, confirmação de
              presença, como chegar aos locais e uma forma de nos presentear, se desejar.
            </p>
            <p>
              Sua presença significa o mundo para nós. Esperamos viver lembranças inesquecíveis com pessoas que amamos.
            </p>
            <p className="sign-off">Com carinho,</p>
            <p className="sign-names">Guilherme & Kelly</p>
          </div>
        </div>
      </section>

      <section className="site-section site-section--accent site-section--flush" aria-labelledby="calendar-heading">
        <div className="site-inner site-inner--center">
          <p id="calendar-heading" className="eyebrow eyebrow--light">
            Marque na agenda
          </p>
          <h2 className="display-serif display-serif--light">13 de junho de 2026</h2>
          <p className="lede lede--light">São Paulo, Brasil</p>
          <CountdownBlock />
        </div>
      </section>

      <section className="site-section site-section--details-bleed" id="detalhes" aria-labelledby="invited-heading">
        <div className="site-inner site-inner--center site-inner--padded-bottom">
          <p className="eyebrow">Você está convidado</p>
          <h2 id="invited-heading" className="section-title section-title--center">
            Detalhes
          </h2>
          <p className="lede lede--center">
            Locais do civil e da cerimônia. Toque no mapa para explorar; use o botão para abrir no aplicativo.
          </p>
        </div>
        <EventCards />
      </section>

      <RSVPForm />

      <GiftList />

      <GalleryStrip />

      <FooterWedding />
    </main>
  );
}
