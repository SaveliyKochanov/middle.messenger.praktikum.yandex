export type Indexed<T = unknown> = Record<string, T>;

export function isPlainObject(value: unknown): value is Indexed {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}
