import Image from "next/image";
import Link from "next/link";

/** The news line in the middle of the footer. Desktop only; the text truncates to fit. */
export default function Announcement() {
  return (
    <p className="hidden min-w-0 grid-cols-[auto_minmax(0,max-content)_auto] items-center justify-start gap-2.5 px-5 md:grid">
      <Image src="/hero/icon-info.svg" alt="" width={20} height={20} className="size-5 shrink-0" />
      <span className="truncate">You can now order banner and bunting online too!</span>
      <Link
        href="/blog"
        prefetch={false}
        className="grid grid-flow-col items-start gap-1 font-normal tracking-[0.12em] text-surface-450 underline underline-offset-2 hover:text-surface-600"
      >
        Read more
        <Image src="/hero/icon-external.svg" alt="" width={16} height={17} />
      </Link>
    </p>
  );
}
