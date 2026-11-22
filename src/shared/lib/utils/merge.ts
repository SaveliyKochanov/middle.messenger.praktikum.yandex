import { isPlainObject, type Indexed } from "./types";

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = { ...lhs };

  Object.keys(rhs).forEach((key) => {
    const left = result[key];
    const right = rhs[key];

    result[key] = isPlainObject(left) && isPlainObject(right) ? merge(left, right) : right;
  });

  return result;
}
