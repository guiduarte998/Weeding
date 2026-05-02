type EventCardsProps = {
  variant?: "default" | "invite";
};

const events = [
  {
    title: "Civil (Cartório)",
    date: "13 de junho de 2026",
    time: "10h00",
    place: "Cartório Cambuci, São Paulo",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cart%C3%B3rio%20Cambuci%2C%20S%C3%A3o%20Paulo",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Cart%C3%B3rio%20Cambuci%2C%20S%C3%A3o%20Paulo&output=embed"
  },
  {
    title: "Cerimônia",
    date: "13 de junho de 2026",
    time: "13h00",
    place: "Rua Albina Barbosa 210, São Paulo",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua%20Albina%20Barbosa%20210%2C%20S%C3%A3o%20Paulo",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Rua%20Albina%20Barbosa%20210%2C%20S%C3%A3o%20Paulo&output=embed"
  }
];

export default function EventCards({ variant = "default" }: EventCardsProps) {
  const stackClass =
    variant === "invite" ? "details-bleed-stack details-bleed-stack--invite" : "details-bleed-stack";

  return (
    <div className={stackClass}>
      {events.map((event) => (
        <article key={event.title} className="detail-bleed">
          <div className="detail-bleed-mapwrap">
            <iframe
              className="detail-bleed-iframe"
              title={`Mapa — ${event.title}`}
              src={event.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="detail-bleed-gradient" aria-hidden />
            <div className="detail-bleed-inner">
              <p className="detail-kind">{event.title}</p>
              <h3 className="detail-bleed-heading">{event.date}</h3>
              <p className="detail-bleed-time">{event.time}</p>
              <p className="detail-bleed-place">{event.place}</p>
              <a className="btn btn--outline btn--inline" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
