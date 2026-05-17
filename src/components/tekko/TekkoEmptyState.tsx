import { TekkoMascot } from "./TekkoMascot";
import type { TekkoState } from "./tekkoStates";

type TekkoEmptyStateProps = {
  title: string;
  message: string;
  state?: TekkoState;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export function TekkoEmptyState({
  title,
  message,
  state = "thinking",
  actionLabel,
  actionHref,
  className = "",
}: TekkoEmptyStateProps) {
  return (
    <section
      className={[
        "flex flex-col items-center justify-center rounded-3xl border border-border bg-card/50 px-6 py-12 text-center backdrop-blur",
        className,
      ].join(" ")}
    >
      <TekkoMascot state={state} size="lg" />
      <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-light">{message}</p>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="mt-6 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-brand"
        >
          {actionLabel}
        </a>
      )}
    </section>
  );
}
