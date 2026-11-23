import { cn } from "@/lib/cn";
import Announcement from "./announcement";
import FooterLink from "./link";

/**
 * The hero's footer: a fade row (`before:`) that dissolves whatever scrolls underneath, then the
 * links over a full-width bar (`after:`, sharing their cell). Only the links take the pointer,
 * so the comb stays clickable through the fade.
 */
export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "pointer-events-none grid",
        "before:mx-auto before:h-10 before:w-full before:max-w-screen-xl before:bg-linear-to-b before:from-surface-175/0 before:to-surface-175",
        "after:-z-10 after:col-start-1 after:row-start-2 after:border-t-[0.5px] after:border-surface-400 after:bg-linear-to-b after:from-surface-100 after:from-50% after:to-surface-100/0",
        className,
      )}
    >
      <div className="pointer-events-auto col-start-1 row-start-2 mx-auto grid w-full max-w-screen-xl grid-cols-[1fr_auto] text-[clamp(15px,4.45vw,19.2px)] leading-none font-light tracking-[0.1em] whitespace-nowrap text-surface-500 md:grid-cols-[auto_1fr_auto] md:text-base md:text-surface-600">
        <FooterLink href="/blog" icon="/hero/icon-blog.svg" className="justify-center border-r-surface-400">
          Blog
        </FooterLink>
        <Announcement />
        <FooterLink href="/policy" icon="/hero/icon-alert.svg" className="md:border-l-surface-400">
          Website policy
        </FooterLink>
      </div>
    </footer>
  );
}
