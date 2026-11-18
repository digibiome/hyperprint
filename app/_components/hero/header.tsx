import Link from "next/link";
import Callout from "./callout";
import Svg from "./svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-linear-to-b from-surface-175 from-50% to-surface-175/0">
      <nav className="mx-auto grid max-w-screen-xl grid-cols-[1fr_auto_1fr] items-end px-6 py-10">
        <Callout
          href="/login"
          prefetch={false}
          aria-label="Login"
          className="justify-self-start [--edge:#372005] [--tile:#f09700]"
        >
          <Callout.Tile>
            <Svg name="icon-login" width={28} height={28} className="self-end max-md:size-8" />
          </Callout.Tile>
          <Callout.Label>Login</Callout.Label>
        </Callout>
        <Link href="/" aria-label="Hyperprint home" className="self-center">
          <Svg name="logo" width={152} height={32} className="h-9 w-auto md:h-8" />
        </Link>
        <Callout
          href="/bag"
          prefetch={false}
          aria-label="Bag"
          className="justify-self-end [--edge:#2d4650] [--tile:#83d2d3]"
        >
          <Callout.Label>Bag</Callout.Label>
          <Callout.Tile>
            <Svg name="icon-bag" width={28} height={28} className="max-md:size-8" />
          </Callout.Tile>
        </Callout>
      </nav>
    </header>
  );
}
