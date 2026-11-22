import { merge } from "./merge";
import { isPlainObject, type Indexed } from "./types";

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (!isPlainObject(object)) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const nested = path
    .split(".")
    .reduceRight<unknown>((acc, key) => ({ [key]: acc }), value) as Indexed;

  return merge(object, nested);
}
