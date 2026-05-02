import EventCards from "@/components/EventCards";
import InviteSubpageShell from "@/components/InviteSubpageShell";

export default function LocaisPage() {
  return (
    <InviteSubpageShell
      title="Locais"
      eyebrow="Como chegar"
      lede="Mapas do civil e da celebração. Toque no mapa para explorar; use o botão para abrir no aplicativo."
      contentLayout="bleed"
    >
      <section id="locais" className="page-invite-sub__section" aria-label="Mapas dos eventos">
        <EventCards variant="invite" />
      </section>
    </InviteSubpageShell>
  );
}
