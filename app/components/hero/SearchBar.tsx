import Image from "next/image";

type Tone = "accent" | "white" | "surface";

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
function Chip({ tone, flip = false }: { tone: Tone; flip?: boolean }) {
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

/**
 * `inline` is the compact desktop bar that sits under the headline (icon first).
 * `dock` is the larger mobile bar pinned above the footer (icon last).
 */
export default function SearchBar({
  variant,
  className = "",
}: {
  variant: "inline" | "dock";
  className?: string;
}) {
  const dock = variant === "dock";
  const id = `hero-search-${variant}`;

  const submit = (
    <button
      type="submit"
      aria-label="Search"
      className={`flex shrink-0 cursor-pointer items-center self-stretch border-y-[0.5px] border-brand-800 bg-accent ${
        dock ? "pr-[0.44em] pl-[0.625em]" : "pr-[9px] pl-[7px]"
      }`}
    >
      <Image
        src="/hero/icon-search.svg"
        alt=""
        width={20}
        height={20}
        unoptimized
        className={dock ? "size-[1.25em]" : "size-5"}
      />
    </button>
  );

  const field = (
    <span
      className={`flex min-w-0 items-center self-stretch border-y-[0.5px] border-surface-500 ${
        dock
          ? "flex-1 border-r-[0.5px] border-dashed bg-surface-150 pr-[0.5em] pl-[1em]"
          : "border-l-[0.5px] border-dashed bg-white py-2 pr-6 pl-5"
      }`}
      style={{ borderTopStyle: "solid", borderBottomStyle: "solid" }}
    >
      <label htmlFor={id} className="sr-only">
        What are you printing today?
      </label>
      <input
        id={id}
        type="search"
        name="q"
        placeholder="What are you printing today?"
        autoComplete="off"
        className={`min-w-0 bg-transparent font-light leading-[1.3] tracking-[0.07em] text-surface-600 outline-none placeholder:text-surface-600 focus:placeholder:text-surface-400 [&::-webkit-search-cancel-button]:hidden ${
          dock ? "w-full" : "w-[236px] text-base"
        }`}
      />
    </span>
  );

  return (
    <form
      role="search"
      action="/search"
      className={`items-stretch focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${
        dock
          ? "h-[2.25em] w-full max-w-[384px] text-[clamp(15px,4.45vw,19.2px)] drop-shadow-[0_3.6px_1.2px_rgba(22,22,22,0.25)]"
          : "text-base drop-shadow-[0_1px_1.5px_rgba(22,22,22,0.25)]"
      } ${className}`}
    >
      {dock ? (
        <>
          <Chip tone="surface" />
          {field}
          {submit}
          <Chip tone="accent" flip />
        </>
      ) : (
        <>
          <Chip tone="accent" />
          {submit}
          {field}
          <Chip tone="white" flip />
        </>
      )}
    </form>
  );
}
