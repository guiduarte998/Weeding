import Image from "next/image";

const photos = [
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1537907510278-a4b5d8e8f6cc?auto=format&fit=crop&w=1400&q=80"
];

export default function GalleryStrip() {
  return (
    <section className="section">
      <h2>Photos</h2>
      <p className="muted">Replace these placeholders with your own gallery photos.</p>
      <div className="grid grid-2">
        {photos.map((src) => (
          <div key={src} style={{ position: "relative", minHeight: 220, borderRadius: 12, overflow: "hidden" }}>
            <Image src={src} alt="Wedding memory" fill style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
