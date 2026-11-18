import Image from "next/image";
import Link from "next/link";
import Cube, { CELL_H, CELL_W } from "./cube";
import styles from "./honeycomb.module.css";

type Art = {
  src: string;
  /** Top-left corner inside the cube, in design px. */
  x: number;
  y: number;
  /** Intrinsic size of the SVG, in design px. */
  w: number;
  h: number;
};

type Product = {
  slug: string;
  /** Use "\n" to break the label onto two lines. */
  label: string;
  art: Art[];
};

const art = (name: string, x: number, y: number, w: number, h: number): Art => ({
  src: `/hero/products/${name}.svg`,
  x,
  y,
  w,
  h,
});

/** Order matters: the grid flows these left-to-right, top-to-bottom. */
const PRODUCTS: Product[] = [
  { slug: "flyer", label: "Flyer", art: [art("flyer", 38.93, 121.91, 96, 56)] },
  {
    slug: "name-card",
    label: "Name\ncard",
    art: [art("name-card", 38.9, 112.45, 96, 55)],
  },
  { slug: "sticker", label: "Sticker", art: [art("sticker", 36.14, 116, 103, 60)] },
  { slug: "banner", label: "Banner", art: [art("banner", 39.24, 60.99, 90, 110)] },
  { slug: "bunting", label: "Bunting", art: [art("bunting", 64.33, 37.08, 45, 151)] },
  {
    slug: "wall-sticker",
    label: "Wall\nsticker",
    art: [art("wall-sticker", 59.59, 59.98, 53, 111)],
  },
  {
    slug: "corporate-profile",
    label: "Corporate\nprofile",
    art: [
      art("corporate-profile-left", 45.45, 82.46, 41, 88),
      art("corporate-profile-right", 86.34, 82.16, 42, 88),
    ],
  },
  {
    slug: "invitation-card",
    label: "Invitation\ncard",
    art: [art("invitation-card", 50.93, 102.11, 85, 63)],
  },
  {
    slug: "guest-book",
    label: "Guest\nbook",
    art: [art("guest-book", 33, 114.58, 101, 65)],
  },
  { slug: "brochure", label: "Brochure", art: [art("brochure", 39.4, 73.94, 97, 89)] },
  { slug: "booklet", label: "Booklet", art: [art("booklet", 37.39, 115.55, 106, 65)] },
  { slug: "book", label: "Book", art: [art("book", 35.8, 117.42, 103, 64)] },
];

const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(3)}%`;

export default function Honeycomb() {
  return (
    <nav aria-label="Products" className={styles.wrap}>
      <ul className={styles.grid}>
        {PRODUCTS.map((product) => (
          <li key={product.slug} className={styles.cell}>
            <Cube />
            <Link
              href={`/products/${product.slug}`}
              prefetch={false}
              className={styles.link}
            >
              <span className={styles.label}>{product.label}</span>
              {product.art.map((a) => (
                <Image
                  key={a.src}
                  src={a.src}
                  alt=""
                  width={a.w}
                  height={a.h}
                  unoptimized
                  className={styles.art}
                  style={{
                    left: pct(a.x, CELL_W),
                    top: pct(a.y, CELL_H),
                    width: pct(a.w, CELL_W),
                  }}
                />
              ))}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
