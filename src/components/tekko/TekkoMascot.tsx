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
  preferProductionAsset?: boolean;
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
  preferProductionAsset = true,
}: TekkoMascotProps) {
  const asset = getTekkoAsset(state);
  const [sourceIndex, setSourceIndex] = useState(0);
  const label = alt ?? asset.alt;
  const sources = preferProductionAsset
    ? [asset.sources.webp, asset.sources.png, asset.sources.svg]
    : [asset.sources.svg];
  const src = sources[sourceIndex];
  const hasImageError = sourceIndex >= sources.length;

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
          key={`${state}-${src}`}
          src={src}
          alt={label}
          draggable={false}
          className={[
            tekkoSizeClasses[size],
            "relative z-10 object-contain drop-shadow-[0_18px_40px_rgba(16,185,129,0.22)]",
          ].join(" ")}
          onError={() => setSourceIndex((current) => current + 1)}
        />
      )}
      <figcaption className="sr-only">{asset.message}</figcaption>
    </figure>
  );
}
