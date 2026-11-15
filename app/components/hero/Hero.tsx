import Image from "next/image";
import Link from "next/link";
import Honeycomb from "./Honeycomb";
import SearchBar from "./SearchBar";

/** Decorative SVG from /public/hero. */
function Svg({
  name,
  width,
  height,
  className,
  style,
}: {
  name: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src={`/hero/${name}.svg`}
      alt=""
      width={width}
      height={height}
      unoptimized
      className={className}
      style={style}
    />
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 bg-linear-to-b from-surface-175 to-surface-175/0">
      <div className="relative mx-auto flex max-w-[1179px] items-end justify-between px-4 pt-[19px] pb-[22px] md:px-6 md:pt-[31px] md:pb-[35px] xl:px-0">
        <Link href="/login" prefetch={false} aria-label="Login" className="block">
          <Svg name="login-mobile" width={134} height={149} className="h-[60px] w-auto md:hidden" />
          <Svg name="login" width={121} height={50} className="hidden md:block" />
        </Link>
        <Link
          href="/"
          aria-label="Hyperprint home"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Svg name="logo" width={150} height={30} className="h-[34px] w-auto md:h-[30px]" />
        </Link>
        <Link href="/bag" prefetch={false} aria-label="Bag" className="block">
          <Svg name="bag-mobile" width={134} height={149} className="h-[60px] w-auto md:hidden" />
          <Svg name="bag" width={103} height={50} className="hidden md:block" />
        </Link>
      </div>
    </header>
  );
}

/** Aura rings and flying paper. Desktop only; never intercepts pointer events. */
function Decorations() {
  return (
    <div aria-hidden className="pointer-events-none hidden md:block">
      <Svg
        name="aura"
        width={1627}
        height={1626}
        className="absolute top-[-302px] left-1/2 -z-10 w-[1627px] max-w-none -translate-x-1/2"
      />
      <Svg
        name="papers"
        width={1325.85}
        height={745.356}
        className="absolute top-[-64px] left-1/2 z-20 w-[1326px] max-w-none -translate-x-[664px]"
      />
      <div className="absolute top-[29px] left-[calc(50%+107px)] z-20 grid h-[135px] w-[146px] place-items-center">
        <Svg
          name="paper-single"
          width={119.524}
          height={99.9586}
          className="max-w-none"
          style={{ transform: "rotate(-20.52deg) scaleX(-1)" }}
        />
      </div>
    </div>
  );
}

const footerLink =
  "flex items-center gap-3 bg-surface-100 px-6 py-3 text-[clamp(15px,4.45vw,19.2px)] leading-none font-light tracking-[0.1em] uppercase whitespace-nowrap text-surface-500 hover:bg-white md:gap-2.5 md:px-5 md:py-4 md:text-base md:text-surface-600";

function FooterBar() {
  return (
    <div className="border-t-[0.5px] border-surface-400 bg-surface-100">
      <div className="mx-auto flex max-w-[1170px] items-stretch">
        <Link href="/blog" prefetch={false} className={`${footerLink} flex-1 justify-center md:flex-none`}>
          <Svg name="icon-blog" width={20} height={20} className="size-6 md:size-5" />
          Blog
        </Link>
        <span aria-hidden className="border-l-[0.5px] border-dashed border-surface-400" />
        <p className="hidden min-w-0 flex-1 items-center gap-2.5 pr-5 pl-5 leading-none font-light tracking-[0.1em] text-surface-600 md:flex">
          <Svg name="icon-info" width={20} height={20} className="size-5 shrink-0" />
          <span className="truncate">You can now order banner and bunting online too!</span>
          <Link
            href="/blog"
            prefetch={false}
            className="flex shrink-0 items-start gap-1 font-normal tracking-[0.12em] text-surface-450 underline underline-offset-2 hover:text-surface-600"
          >
            Read more
            <Svg name="icon-external" width={16} height={17} />
          </Link>
        </p>
        <span aria-hidden className="hidden border-l-[0.5px] border-dashed border-surface-400 md:block" />
        <Link href="/policy" prefetch={false} className={footerLink}>
          <Svg name="icon-alert" width={20} height={20} className="size-6 md:size-5" />
          Website policy
        </Link>
      </div>
    </div>
  );
}

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

        <div className="mt-[11px] w-full md:mt-[15px]">
          <Honeycomb />
        </div>
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
