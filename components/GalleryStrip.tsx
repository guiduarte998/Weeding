import Image from "next/image";

const photos = [
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
];

export default function GalleryStrip() {
  return (
    <section className="site-section site-section--gallery-bleed" aria-labelledby="gallery-heading">
      <div className="site-inner site-inner--center site-inner--padded-bottom">
        <p className="eyebrow">Memórias</p>
        <h2 id="gallery-heading" className="section-title section-title--center">
          Galeria
        </h2>
        <p className="lede lede--center">
          Em breve trocamos por fotos de vocês. Por enquanto, referências em tela cheia.
        </p>
      </div>
      <div className="gallery-mosaic">
        {photos.map((src, i) => (
          <div key={src} className="gallery-mosaic-cell">
            <Image
              src={src}
              alt={`Momento ${i + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="gallery-mosaic-img"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
