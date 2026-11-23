import Image from "next/image";
import Footer from "./footer";
import Honeycomb from "./honeycomb";
import Search from "./search";

export default function Hero() {
  return (
    <section
      id="hero"
      className="grid min-h-svh grid-cols-[0_minmax(0,1fr)_0] gap-x-6 grid-rows-[auto_auto_auto_1fr_auto] justify-items-center overflow-clip text-surface-500 children:col-start-2"
    >
      <h1 className="text-center text-[clamp(30px,8.9vw,38.4px)] leading-[1.1] font-bold tracking-[0.05em] uppercase md:text-[42px] md:leading-none md:tracking-[0.07em]">
        <Image
          src="/hero/bolts.svg"
          alt=""
          width={136.988}
          height={34.1373}
          className="mx-auto mb-[19px] block h-[39px] w-auto md:mb-[18px] md:h-[34px]"
        />
        <span className="bg-surface-175 box-decoration-clone p-px">
          Instant <br className="md:hidden" />
          print quote
        </span>
      </h1>

      <Search className="mt-3.5" />

      <p className="mt-2.5 text-center text-[clamp(17px,5vw,21.6px)] leading-none tracking-[0.03em] text-surface-450 md:mt-6 md:text-base md:text-surface-500">
        <span className="bg-surface-175 box-decoration-clone px-2.5">or choose one product to start</span>
        <Image
          src="/hero/arrow-down.svg"
          alt=""
          width={24}
          height={24}
          className="mx-auto mt-[23px] block size-[29px] md:mt-2 md:size-6"
        />
      </p>

      <Honeycomb />

      <Footer className="sticky bottom-0 z-30 col-span-full justify-self-stretch" />
    </section>
  );
}
