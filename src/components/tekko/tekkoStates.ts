export type TekkoState =
  | "idle"
  | "thinking"
  | "working"
  | "success"
  | "warning"
  | "error"
  | "sleeping";

export type TekkoSize = "sm" | "md" | "lg" | "xl";

export type TekkoAsset = {
  src: string;
  alt: string;
  label: string;
  message: string;
};

export const tekkoAssets: Record<TekkoState, TekkoAsset> = {
  idle: {
    src: "/tekko/tekko-idle.svg",
    alt: "Tekko, Tekup's AI mascot, waiting and ready to help",
    label: "Idle",
    message: "Ready when you are.",
  },
  thinking: {
    src: "/tekko/tekko-thinking.svg",
    alt: "Tekko thinking while gathering context",
    label: "Thinking",
    message: "I’m gathering the right context...",
  },
  working: {
    src: "/tekko/tekko-working.svg",
    alt: "Tekko working on an automation task",
    label: "Working",
    message: "Building your automation...",
  },
  success: {
    src: "/tekko/tekko-success.svg",
    alt: "Tekko celebrating a completed automation",
    label: "Success",
    message: "Completed successfully.",
  },
  warning: {
    src: "/tekko/tekko-warning.svg",
    alt: "Tekko warning that something needs review",
    label: "Warning",
    message: "Something needs your attention.",
  },
  error: {
    src: "/tekko/tekko-error.svg",
    alt: "Tekko showing that something went wrong",
    label: "Error",
    message: "Something went wrong. Let’s fix it.",
  },
  sleeping: {
    src: "/tekko/tekko-sleeping.svg",
    alt: "Tekko sleeping while offline or inactive",
    label: "Sleeping",
    message: "Offline or inactive.",
  },
};

export const tekkoSizeClasses: Record<TekkoSize, string> = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-36 w-36",
};

export const tekkoStateStyles: Record<TekkoState, string> = {
  idle: "border-brand/20 bg-brand/5 text-brand-light",
  thinking: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  working: "border-blue-400/25 bg-blue-400/10 text-blue-200",
  success: "border-brand/25 bg-brand/10 text-brand-light",
  warning: "border-accent/30 bg-accent/10 text-accent",
  error: "border-red-400/30 bg-red-500/10 text-red-200",
  sleeping: "border-white/10 bg-white/5 text-muted-light",
};

export function getTekkoAsset(state: TekkoState = "idle") {
  return tekkoAssets[state] ?? tekkoAssets.idle;
}
