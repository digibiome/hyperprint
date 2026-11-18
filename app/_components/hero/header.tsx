import Link from "next/link";
import Svg from "./svg";

export default function Header() {
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
