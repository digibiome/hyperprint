import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * A top-level footer link: icon then label. Type comes from the footer row.
 * Its dashed sides double as the footer's dividers: colour the inner one via `className`
 * (e.g. `border-r-surface-400`); the rest stay transparent until hover.
 * On hover it lifts like a key about to be pressed: it rises by the same amount its
 * hard shadow drops, and its border and fill appear.
 */
export default function FooterLink({
  href,
  icon,
  className,
  children,
}: {
  href: string;
  icon: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        "grid grid-flow-col auto-cols-max items-center gap-3 px-6 py-3 uppercase md:gap-2.5 md:px-5 md:py-4",
        "border-[0.5px] border-dashed border-transparent [border-block-style:solid] transition-[translate,box-shadow,background-color,border-color] duration-150 ease-out",
        "hover:border-surface-400 hover:bg-surface-150 hover:shadow-[0_--spacing(0.5)_0_var(--color-surface-400)] motion-safe:hover:-translate-y-0.5",
        className,
      )}
    >
      <Image src={icon} alt="" width={20} height={20} className="size-6 md:size-5" />
      {children}
    </Link>
  );
}
