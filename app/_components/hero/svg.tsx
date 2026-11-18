import Image from "next/image";

/** Decorative SVG from /public/hero. Extra props pass through to the image. */
export default function Svg({
  name,
  ...props
}: { name: string } & Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  return <Image src={`/hero/${name}.svg`} alt="" unoptimized {...props} />;
}
