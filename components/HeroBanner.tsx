import Image from "next/image";

type HeroBannerProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
};

export default function HeroBanner({ imageUrl, title, subtitle }: HeroBannerProps) {
  return (
    <section className="section hero-banner">
      <div className="hero-media">
        <Image
          src={imageUrl}
          alt="Wedding couple"
          fill
          className="hero-image"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-content-card">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
