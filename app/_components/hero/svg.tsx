import Image from "next/image";

/** Decorative SVG from /public/hero. */
export default function Svg({
  name,
  width,
  height,
  className,
  style,
}: {
  name: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src={`/hero/${name}.svg`}
      alt=""
      width={width}
      height={height}
      unoptimized
      className={className}
      style={style}
    />
  );
}
