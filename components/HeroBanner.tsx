import Image from "next/image";

type HeroBannerProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
};

export default function HeroBanner({ imageUrl, title, subtitle }: HeroBannerProps) {
  return (
    <section className="hero-banner">
      <div className="hero-media">
        <Image
          src={imageUrl}
          alt="Guilherme e Kelly — save the date"
          fill
          className="hero-image"
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-content-card">
            <p className="hero-kicker">O casamento de</p>
            <h1>{title}</h1>
            <p className="hero-subline">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
