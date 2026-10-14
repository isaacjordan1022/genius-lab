/** Observed retailer records. The server derives the child-facing ticket catalog. */
export type CatalogPrize = {
  id: string;
  title: string;
  retailer: string;
  url: string;
  price: number | null;
  priceNote?: string;
  category: string;
  interests: string[];
  ageNote?: string;
  screenshot: string;
  productImage?: string;
  checkedAt: string;
};

export function parsePrizeCatalog(value: unknown): CatalogPrize[] {
  if (!Array.isArray(value))
    throw new Error("The prize catalog must be a list.");
  const ids = new Set<string>();
  return value.map((item: unknown, index) => {
    if (!item || typeof item !== "object")
      throw new Error(`Prize ${index + 1} needs a record.`);
    const p = item as Record<string, unknown>;
    for (const field of [
      "id",
      "title",
      "retailer",
      "url",
      "category",
      "screenshot",
      "checkedAt",
    ])
      if (typeof p[field] !== "string" || !(p[field] as string).trim())
        throw new Error(`Prize ${index + 1} needs ${field}.`);
    if (ids.has(p.id as string))
      throw new Error(`Duplicate prize ID: ${p.id}.`);
    ids.add(p.id as string);
    const url = new URL(p.url as string);
    if (url.protocol !== "https:")
      throw new Error(`Prize ${index + 1} needs a secure retailer link.`);
    if (
      !(p.screenshot as string).startsWith("/prizes/") ||
      (p.screenshot as string).includes("..")
    )
      throw new Error(`Prize ${index + 1} needs a local /prizes/ screenshot.`);
    if (
      p.price !== null &&
      (typeof p.price !== "number" || !Number.isFinite(p.price) || p.price < 0)
    )
      throw new Error(`Prize ${index + 1} has an invalid dollar price.`);
    if (
      !Array.isArray(p.interests) ||
      !p.interests.every((tag) => typeof tag === "string")
    )
      throw new Error(`Prize ${index + 1} needs an interest list.`);
    if (Number.isNaN(Date.parse(p.checkedAt as string)))
      throw new Error(`Prize ${index + 1} needs a capture date.`);
    for (const field of ["priceNote", "ageNote"])
      if (p[field] !== undefined && typeof p[field] !== "string")
        throw new Error(`Prize ${index + 1} has an invalid ${field}.`);
    if (
      p.productImage !== undefined &&
      (typeof p.productImage !== "string" ||
        (!p.productImage.startsWith("/prizes/") &&
          !p.productImage.startsWith("https://")))
    )
      throw new Error(`Prize ${index + 1} has an invalid product image.`);
    return item as CatalogPrize;
  });
}
