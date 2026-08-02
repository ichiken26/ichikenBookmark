export function categoryAnchor(categoryId: string): string {
  const encoded = Array.from(new TextEncoder().encode(categoryId), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `category-${encoded}`;
}
