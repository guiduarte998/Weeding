"use client";

import { useEffect, useState } from "react";

const WEDDING = new Date("2026-06-13T15:00:00-03:00");

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(now: Date): Remaining {
  const diff = Math.max(0, WEDDING.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

type CountdownBlockProps = {
  variant?: "default" | "invite";
};

export default function CountdownBlock({ variant = "default" }: CountdownBlockProps) {
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining(new Date()));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Dias", value: remaining.days },
    { label: "Horas", value: remaining.hours },
    { label: "Min", value: remaining.minutes },
    { label: "Seg", value: remaining.seconds }
  ];

  const countdownClass = variant === "invite" ? "countdown countdown--invite" : "countdown";

  return (
    <div className={countdownClass}>
      {cells.map((cell) => (
        <div key={cell.label} className="countdown-cell">
          <span className="countdown-value">{String(cell.value).padStart(2, "0")}</span>
          <span className="countdown-label">{cell.label}</span>
        </div>
      ))}
    </div>
  );
}
