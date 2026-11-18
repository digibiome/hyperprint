/**
 * Products shown in the honeycomb menu.
 *
 * Order matters: the grid flows these left-to-right, top-to-bottom.
 * Each product's art lives at /hero/products/<slug>.svg, drawn on the cube's
 * own CELL_W × CELL_H artboard, so it simply overlays the cube.
 */
export const PRODUCTS: {
  slug: string;
  /** Use "\n" to break the label onto two lines. */
  label: string;
}[] = [
  { slug: "flyer", label: "Flyer" },
  { slug: "name-card", label: "Name\ncard" },
  { slug: "sticker", label: "Sticker" },
  { slug: "banner", label: "Banner" },
  { slug: "bunting", label: "Bunting" },
  { slug: "wall-sticker", label: "Wall\nsticker" },
  { slug: "corporate-profile", label: "Corporate\nprofile" },
  { slug: "invitation-card", label: "Invitation\ncard" },
  { slug: "guest-book", label: "Guest\nbook" },
  { slug: "brochure", label: "Brochure" },
  { slug: "booklet", label: "Booklet" },
  { slug: "book", label: "Book" },
];
