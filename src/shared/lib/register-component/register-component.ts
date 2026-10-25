import Handlebars, { type HelperOptions } from 'handlebars';
import type { Block } from '../block/block';

let uniqueId = 0;

interface BlockConstructor<P extends object = object> {
  componentName: string;
  new (props: P): Block<P>;
}

export function registerComponent<P extends object>(Component: BlockConstructor<P>) {
  Handlebars.registerHelper(
    Component.componentName,
    function (this: unknown, { hash, data, fn }: HelperOptions) {
      const dataAttribute = `data-component-hbs-id="${++uniqueId}"`;
      const props = fn ? { ...hash, content: fn(this) } : hash;
      const component = new Component(props as P);

      if ("ref" in hash) {
        (data.root.__refs = data.root.__refs || {})[hash.ref] = component.element();
      }

      (data.root.__children = data.root.__children || []).push({
        component,
        embed(node: DocumentFragment) {
          const placeholder = node.querySelector(`[${dataAttribute}]`);
          if (!placeholder) {
            throw new Error(
              `Can't find data-id for component ${Component.componentName}`
            );
          }

          const element = component.element();
          if (!element) {
            throw new Error(
              `Component ${Component.componentName} rendered nothing`
            );
          }

          placeholder.replaceWith(element);
        },
      });

      return `<div ${dataAttribute}></div>`;
    }
  );
}
