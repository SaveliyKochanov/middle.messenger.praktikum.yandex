import { ROUTES } from "../../config";
import type { Block } from "../block";
import { store } from "../store";
import { Route, type RouteAccess } from "./route";

interface UseOptions<P> {
  access?: RouteAccess;
  props?: P;
}

export class Router {
  private static __instance: Router | null = null;

  private routes: Route[] = [];

  private history: History = window.history;

  private currentRoute: Route | null = null;

  private readonly rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use<P extends object>(
    pathname: string,
    block: new (props: P) => Block<object>,
    { access = "public", props = {} as P }: UseOptions<P> = {},
  ) {
    const route = new Route(pathname, () => new block(props), {
      rootQuery: this.rootQuery,
      access,
    });

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = () => {
      this.onRoute(window.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  private redirect(pathname: string) {
    this.history.replaceState({}, "", pathname);
    this.onRoute(pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.redirect(ROUTES.NOT_FOUND);
      return;
    }

    const isAuthorized = Boolean(store.getState().user);

    if (route.access === "private" && !isAuthorized) {
      this.redirect(ROUTES.LOGIN);
      return;
    }

    if (route.access === "guest" && isAuthorized) {
      this.redirect(ROUTES.MESSENGER);
      return;
    }

    this.currentRoute?.leave();
    this.currentRoute = route;

    route.render();
  }
}

export const router = new Router("#app");
