import { HTTPTransport } from "./http-transport";

export abstract class BaseAPI {
  protected readonly http: HTTPTransport;

  constructor(prefix: string) {
    this.http = new HTTPTransport(prefix);
  }
}
