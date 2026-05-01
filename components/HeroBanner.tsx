import Image from "next/image";

type HeroBannerProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
};

export default function HeroBanner({ imageUrl, title, subtitle }: HeroBannerProps) {
  return (
    <section className="section" style={{ overflow: "hidden", padding: 0 }}>
      <div style={{ position: "relative", minHeight: 360 }}>
        <Image
          src={imageUrl}
          alt="Wedding couple"
          fill
          style={{ objectFit: "cover", filter: "brightness(0.8)" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            color: "white",
            padding: "1rem"
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>{title}</h1>
            <p style={{ margin: 0 }}>{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
