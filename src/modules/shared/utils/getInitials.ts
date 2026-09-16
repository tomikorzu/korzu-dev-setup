/**
 * Extracts up to 2 initials from a name string.
 *
 * @example
 * getInitials("John Doe")    // → "JD"
 * getInitials("Alice")       // → "A"
 * getInitials("Ana María")   // → "AM"
 */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
