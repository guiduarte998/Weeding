import EventCards from "@/components/EventCards";
import GalleryStrip from "@/components/GalleryStrip";
import HeroBanner from "@/components/HeroBanner";
import RSVPForm from "@/components/RSVPForm";
import GiftList from "@/components/GiftList";

export default function HomePage() {
  return (
    <main className="container">
      <HeroBanner
        imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
        title="Guilherme & Kelly"
        subtitle="Vamos nos casar em 13 de Junho de 2026"
      />

      <section className="section">
        <h2>Bem-vindos</h2>
        <p className="muted">
          Estamos muito felizes em celebrar esse dia com você. Aqui você encontra os detalhes do evento, confirmação e
          presentes.
        </p>
      </section>

      <EventCards />
      <GalleryStrip />
      <RSVPForm />
      <GiftList />
    </main>
  );
}
