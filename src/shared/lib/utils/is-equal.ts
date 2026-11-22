import { isPlainObject } from "./types";

export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, index) => isEqual(item, b[index]));
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = Object.keys(a);

    return (
      keys.length === Object.keys(b).length &&
      keys.every((key) => Object.hasOwn(b, key) && isEqual(a[key], b[key]))
    );
  }

  return false;
}
