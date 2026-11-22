import type { Block } from "./block";

export function render(query: string, block: Block<object>) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`Root element ${query} not found`);
  }

  const element = block.element();

  if (element) {
    root.appendChild(element);
  }

  return root;
}
