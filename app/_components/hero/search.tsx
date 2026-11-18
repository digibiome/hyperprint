import Image from "next/image";
import Chip from "./chip";

/** The hero search under the headline. The field narrows to fit small screens. */
export default function Search({ className = "" }: { className?: string }) {
  return (
    <form
      role="search"
      action="/search"
      className={`grid w-full max-w-81 grid-cols-[auto_auto_minmax(0,1fr)_auto] text-base drop-shadow-[0_1px_1.5px_rgba(22,22,22,0.25)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${className}`}
    >
      <Chip tone="accent" />
      <button
        type="submit"
        aria-label="Search"
        className="grid cursor-pointer items-center border-y-[0.5px] border-brand-800 bg-accent pr-[9px] pl-[7px]"
      >
        <Image src="/hero/icon-search.svg" alt="" width={20} height={20} unoptimized className="size-5" />
      </button>
      <span
        className="grid min-w-0 items-center border-y-[0.5px] border-l-[0.5px] border-dashed border-surface-500 bg-white py-2 pr-6 pl-5"
        style={{ borderTopStyle: "solid", borderBottomStyle: "solid" }}
      >
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
      <Chip tone="white" flip />
    </form>
  );
}
