import Image from "next/image";

type GalleryStripProps = {
  variant?: "default" | "invite";
};

const photos = [
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
];

export default function GalleryStrip({ variant = "default" }: GalleryStripProps) {
  const isInvite = variant === "invite";
  const sectionClass = isInvite
    ? "site-section home-invite-flow__segment site-section--gallery-invite site-section--flush"
    : "site-section site-section--gallery-bleed";

  return (
    <section className={sectionClass} aria-labelledby="gallery-heading">
      <div
        className={
          isInvite
            ? "site-inner site-inner--center site-inner--padded-bottom home-invite-flow__gallery-intro"
            : "site-inner site-inner--center site-inner--padded-bottom"
        }
      >
        <p className={isInvite ? "page-invite-sub__eyebrow" : "eyebrow"}>Memórias</p>
        <h2 id="gallery-heading" className={isInvite ? "page-invite-sub__title" : "section-title section-title--center"}>
          Galeria
        </h2>
        <p className={isInvite ? "page-invite-sub__lede" : "lede lede--center"}>
          Em breve trocamos por fotos de vocês. Por enquanto, referências em tela cheia.
        </p>
      </div>
      <div className={isInvite ? "gallery-mosaic gallery-mosaic--invite" : "gallery-mosaic"}>
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
