import Image from "next/image";
import Link from "next/link";
import Callout from "./callout";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-linear-to-b from-surface-175 from-50% to-surface-175/0">
      <nav className="mx-auto grid max-w-screen-xl grid-cols-[1fr_auto_1fr] items-end px-6 py-10">
        <Callout
          href="/account"
          prefetch={false}
          aria-label="Account"
          className="justify-self-start [--edge:#372005] [--tile:#f09700]"
        >
          <Callout.Tile>
            <Image src="/hero/icon-login.svg" alt="" width={28} height={28} className="self-end max-md:size-8" />
          </Callout.Tile>
          <Callout.Label>Account</Callout.Label>
        </Callout>
        <Link href="/" aria-label="Hyperprint home" className="self-center">
          <Image src="/hero/logo.svg" alt="" preload width={152} height={32} className="h-9 w-auto md:h-8" />
        </Link>
        <Callout
          href="/order/bag"
          prefetch={false}
          aria-label="Bag"
          className="justify-self-end [--edge:#2d4650] [--tile:#83d2d3]"
        >
          <Callout.Label>Bag</Callout.Label>
          <Callout.Tile>
            <Image src="/hero/icon-bag.svg" alt="" width={28} height={28} className="max-md:size-8" />
          </Callout.Tile>
        </Callout>
      </nav>
    </header>
  );
}
