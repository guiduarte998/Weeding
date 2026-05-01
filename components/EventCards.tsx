const events = [
  {
    title: "Civil (Cartório)",
    date: "13 de Junho de 2026 - 10:30",
    place: "Cartório Cambuci, São Paulo",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cart%C3%B3rio%20Cambuci%2C%20S%C3%A3o%20Paulo",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Cart%C3%B3rio%20Cambuci%2C%20S%C3%A3o%20Paulo&output=embed"
  },
  {
    title: "Cerimônia",
    date: "13 de Junho de 2026 - 13:00",
    place: "Rua Albina Barbosa 210, São Paulo",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua%20Albina%20Barbosa%20210%2C%20S%C3%A3o%20Paulo",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Rua%20Albina%20Barbosa%20210%2C%20S%C3%A3o%20Paulo&output=embed"
  }
];

export default function EventCards() {
  return (
    <section className="section">
      <h2>Event Details</h2>
      <div className="grid grid-2">
        {events.map((event) => (
          <article key={event.title} style={{ border: "1px solid #eee", borderRadius: 12, padding: "1rem" }}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p className="muted">{event.place}</p>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #eee", margin: "0.75rem 0" }}>
              <iframe
                title={`${event.title} map`}
                src={event.mapsEmbedUrl}
                style={{ width: "100%", height: 240, border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a className="btn" href={event.mapsUrl} target="_blank">
              Open Map
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
