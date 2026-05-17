"use client";

import { useState } from "react";
import { getTekkoAsset, tekkoSizeClasses, type TekkoSize, type TekkoState } from "./tekkoStates";

type TekkoMascotProps = {
  state?: TekkoState;
  size?: TekkoSize;
  animated?: boolean;
  showGlow?: boolean;
  className?: string;
  alt?: string;
};

const stateMotion: Record<TekkoState, string> = {
  idle: "motion-safe:animate-tekko-float",
  thinking: "motion-safe:animate-tekko-think",
  working: "motion-safe:animate-tekko-float",
  success: "motion-safe:animate-tekko-success",
  warning: "motion-safe:animate-tekko-think",
  error: "",
  sleeping: "",
  connecting: "motion-safe:animate-tekko-connect",
};

export function TekkoMascot({
  state = "idle",
  size = "md",
  animated = true,
  showGlow = true,
  className = "",
  alt,
}: TekkoMascotProps) {
  const asset = getTekkoAsset(state);
  const [hasImageError, setHasImageError] = useState(false);
  const label = alt ?? asset.alt;

  return (
    <figure
      className={[
        "relative inline-flex items-center justify-center rounded-3xl",
        showGlow ? "before:absolute before:inset-2 before:rounded-full before:bg-brand/20 before:blur-2xl before:content-['']" : "",
        animated ? stateMotion[state] : "",
        className,
      ].join(" ")}
      aria-label={label}
      title={asset.message}
    >
      {hasImageError ? (
        <div
          className={[
            tekkoSizeClasses[size],
            "relative z-10 flex items-center justify-center rounded-3xl border border-brand/25 bg-gradient-to-br from-brand/20 via-cyan-400/10 to-accent/10 text-center text-xs font-bold text-brand-light shadow-lg shadow-brand/10",
          ].join(" ")}
          role="img"
          aria-label={label}
        >
          Tekko
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset.src}
          alt={label}
          draggable={false}
          className={[
            tekkoSizeClasses[size],
            "relative z-10 object-contain drop-shadow-[0_18px_40px_rgba(16,185,129,0.22)]",
          ].join(" ")}
          onError={() => setHasImageError(true)}
        />
      )}
      <figcaption className="sr-only">{asset.message}</figcaption>
    </figure>
  );
}
