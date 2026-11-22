export class HTTPError extends Error {
  public readonly status: number;

  public readonly reason: string;

  constructor(status: number, reason: string) {
    super(`HTTP ${status}: ${reason}`);
    this.name = "HTTPError";
    this.status = status;
    this.reason = reason;
  }
}

export class BadRequestError extends HTTPError {
  constructor(reason: string) {
    super(400, reason);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends HTTPError {
  constructor(reason: string) {
    super(401, reason);
    this.name = "UnauthorizedError";
  }
}

export class ServerError extends HTTPError {
  constructor(status: number, reason: string) {
    super(status, reason);
    this.name = "ServerError";
  }
}

export class NetworkError extends Error {
  constructor(message = "Сервер недоступен, проверьте подключение") {
    super(message);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends NetworkError {
  constructor() {
    super("Сервер не ответил вовремя");
    this.name = "TimeoutError";
  }
}

export function createHTTPError(status: number, reason: string): HTTPError {
  if (status === 400) {
    return new BadRequestError(reason);
  }

  if (status === 401) {
    return new UnauthorizedError(reason);
  }

  if (status >= 500) {
    return new ServerError(status, reason);
  }

  return new HTTPError(status, reason);
}
