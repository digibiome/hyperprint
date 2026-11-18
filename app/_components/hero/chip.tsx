import Image from "next/image";

export type Tone = "accent" | "white" | "surface";

const TONE_BG: Record<Tone, string> = {
  accent: "bg-accent",
  white: "bg-white",
  surface: "bg-surface-150",
};

const NOTCH: Record<Tone, string> = {
  accent: "/hero/chip-notch-accent.svg",
  white: "/hero/chip-notch-white.svg",
  surface: "/hero/chip-notch-surface.svg",
};

/** The ticket-stub end cap: a thin strip with a half-round notch in the middle. */
export default function Chip({ tone, flip = false }: { tone: Tone; flip?: boolean }) {
  const bg = TONE_BG[tone];
  const edge = "border-surface-500 border-l-[0.5px]";
  return (
    <span
      aria-hidden
      className={`flex w-[0.22em] shrink-0 flex-col self-stretch ${flip ? "-scale-x-100" : ""}`}
    >
      <span className={`h-[0.125em] rounded-tl-[1px] border-t-[0.5px] ${edge} ${bg}`} />
      <span className={`min-h-px flex-1 ${edge} ${bg}`} />
      <Image
        src={NOTCH[tone]}
        alt=""
        width={3.5}
        height={6}
        unoptimized
        className="block h-[0.375em] w-full"
      />
      <span className={`min-h-px flex-1 ${edge} ${bg}`} />
      <span className={`h-[0.125em] rounded-bl-[1px] border-b-[0.5px] ${edge} ${bg}`} />
    </span>
  );
}
