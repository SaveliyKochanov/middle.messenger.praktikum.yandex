import type { Block } from "../block";
import { render } from "../render-dom";
import { isEqual } from "../utils";

export type RouteAccess = "public" | "guest" | "private";

interface RouteProps {
  rootQuery: string;
  access: RouteAccess;
}

export class Route {
  private readonly pathname: string;

  private readonly createBlock: () => Block<object>;

  private block: Block<object> | null = null;

  private readonly props: RouteProps;

  constructor(pathname: string, createBlock: () => Block<object>, props: RouteProps) {
    this.pathname = pathname;
    this.createBlock = createBlock;
    this.props = props;
  }

  public get access() {
    return this.props.access;
  }

  public leave() {
    if (this.block) {
      const element = this.block.element();
      this.block.destroy();
      element?.remove();
      this.block = null;
    }
  }

  public match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  public render() {
    this.block = this.createBlock();
    render(this.props.rootQuery, this.block);
  }
}
