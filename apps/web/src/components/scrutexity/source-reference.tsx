const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function SourceReference({
  surface,
  tone = "muted",
  className = "",
}: {
  surface: string;
  tone?: "muted" | "light";
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] leading-5 ${tone === "light" ? "text-cream/60" : "text-muted"} ${className}`}
      style={{ fontFamily: MONO }}
    >
      <span className="font-semibold">Source:</span> {surface} · reviewed{" "}
      <time dateTime="2026-08-04">Aug. 4, 2026</time>
    </p>
  );
}
