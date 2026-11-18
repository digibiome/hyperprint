import Link from "next/link";
import Svg from "./svg";

const footerLink =
  "flex items-center gap-3 bg-surface-100 px-6 py-3 text-[clamp(15px,4.45vw,19.2px)] leading-none font-light tracking-[0.1em] uppercase whitespace-nowrap text-surface-500 hover:bg-white md:gap-2.5 md:px-5 md:py-4 md:text-base md:text-surface-600";

export default function FooterBar() {
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
