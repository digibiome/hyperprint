import Decorations from "./decorations";
import FooterBar from "./footer-bar";
import Header from "./header";
import Honeycomb from "./honeycomb";
import SearchBar from "./search-bar";
import Svg from "./svg";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-1 flex-col overflow-clip bg-surface-175 text-surface-500 md:bg-surface-200">
      <Decorations />
      <Header />

      <div className="relative z-10 flex flex-1 flex-col items-center px-6 pt-[126px] md:pt-[133px]">
        <Svg name="bolts" width={136.988} height={34.1373} className="h-[39px] w-auto md:h-[34px]" />

        <h1 className="mt-[19px] bg-surface-175 p-px text-center text-[clamp(30px,8.9vw,38.4px)] leading-[1.1] font-bold tracking-[0.05em] uppercase md:mt-[18px] md:text-[42px] md:leading-none md:tracking-[0.07em]">
          Instant <br className="md:hidden" />
          print quote
        </h1>

        <SearchBar variant="inline" className="mt-3.5 hidden md:flex" />

        <p className="mt-2.5 bg-surface-175 px-2.5 text-center text-[clamp(17px,5vw,21.6px)] leading-none tracking-[0.03em] text-surface-450 md:mt-6 md:text-base md:text-surface-500">
          <span className="md:hidden">Choose</span>
          <span className="hidden md:inline">or choose</span> one product to start
        </p>

        <Svg
          name="arrow-down"
          width={24}
          height={24}
          className="mt-[23px] size-[29px] md:mt-2 md:size-6"
        />

        <Honeycomb />
      </div>

      <div className="pointer-events-none sticky bottom-0 z-30 mt-auto">
        {/* Mobile: search docks above the footer, fading the comb out behind it. */}
        <div className="flex justify-center bg-linear-to-b from-surface-175/0 to-surface-175 to-45% px-[19px] pt-12 pb-6 md:hidden">
          <SearchBar variant="dock" className="pointer-events-auto flex" />
        </div>
        <div className="mx-auto hidden h-[60px] max-w-[1170px] bg-linear-to-b from-surface-175/0 to-surface-175 to-52% md:block" />
        <div className="pointer-events-auto">
          <FooterBar />
        </div>
      </div>
    </section>
  );
}
