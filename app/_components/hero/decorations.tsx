import Svg from "./svg";

/** Aura rings and flying paper. Desktop only; never intercepts pointer events. */
export default function Decorations() {
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
