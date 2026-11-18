import Image from "next/image";
import Chip from "./chip";

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
      className={`grid cursor-pointer items-center border-y-[0.5px] border-brand-800 bg-accent ${
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
      className={`grid min-w-0 items-center border-y-[0.5px] border-surface-500 ${
        dock
          ? "border-r-[0.5px] border-dashed bg-surface-150 pr-[0.5em] pl-[1em]"
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
      className={`focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${
        dock
          ? "h-[2.25em] w-full max-w-[384px] grid-cols-[auto_minmax(0,1fr)_auto_auto] text-[clamp(15px,4.45vw,19.2px)] drop-shadow-[0_3.6px_1.2px_rgba(22,22,22,0.25)]"
          : "grid-flow-col text-base drop-shadow-[0_1px_1.5px_rgba(22,22,22,0.25)]"
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
