import Image from "next/image";

/** The hero search under the headline: a two-segment ticket. The field narrows to fit small screens. */
export default function Search({ className = "" }: { className?: string }) {
  return (
    <form
      role="search"
      action="/search"
      className={`grid w-full max-w-81 grid-cols-[auto_minmax(0,1fr)] text-base drop-shadow-[0_1px_1.5px_rgba(22,22,22,0.25)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${className}`}
    >
      <button
        type="submit"
        aria-label="Search"
        className="ticket ticket-join-r ticket-open-r grid cursor-pointer items-center pr-[9px] pl-[calc(7px+0.22em)] [--ticket-fill:var(--color-accent)] [--ticket-line:var(--color-brand-800)]"
      >
        <Image src="/hero/icon-search.svg" alt="" width={20} height={20} unoptimized className="size-5" />
      </button>
      <span className="ticket ticket-join-l ticket-dashed-l grid min-w-0 items-center py-[calc(0.5rem+0.5px)] pr-[calc(1.5rem+0.22em)] pl-5">
        <label htmlFor="hero-search" className="sr-only">
          What are you printing today?
        </label>
        <input
          id="hero-search"
          type="search"
          name="q"
          placeholder="What are you printing today?"
          autoComplete="off"
          className="w-full min-w-0 bg-transparent font-light leading-[1.3] tracking-[0.07em] text-surface-600 outline-none placeholder:text-surface-600 focus:placeholder:text-surface-400 [&::-webkit-search-cancel-button]:hidden"
        />
      </span>
    </form>
  );
}
