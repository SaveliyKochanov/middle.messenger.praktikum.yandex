import { API_URL } from "../config/api";
import { createHTTPError, NetworkError, TimeoutError } from "./errors";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

export type QueryParams = Record<string, string | number | boolean | undefined>;

export type RequestBody = Record<string, unknown> | unknown[] | FormData;

interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

export interface GetOptions extends RequestOptions {
  query?: QueryParams;
}

export interface BodyOptions extends RequestOptions {
  data?: RequestBody;
}

interface SendOptions extends RequestOptions {
  method: Method;
  data?: RequestBody;
}

const DEFAULT_TIMEOUT = 10000;

export function queryStringify(query: QueryParams): string {
  const params = Object.entries(query)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return params.length > 0 ? `?${params.join("&")}` : "";
}

function parseResponse(xhr: XMLHttpRequest): unknown {
  const contentType = xhr.getResponseHeader("Content-Type") ?? "";

  if (contentType.includes("application/json") && xhr.responseText) {
    return JSON.parse(xhr.responseText);
  }

  return xhr.responseText;
}

function getErrorReason(response: unknown, fallback: string): string {
  if (
    typeof response === "object" &&
    response !== null &&
    "reason" in response &&
    typeof response.reason === "string"
  ) {
    return response.reason;
  }

  return fallback;
}

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(prefix = "") {
    this.baseUrl = `${API_URL}${prefix}`;
  }

  public get<T>(path: string, { query, ...options }: GetOptions = {}): Promise<T> {
    const url = query ? `${path}${queryStringify(query)}` : path;
    return this.request<T>(url, { ...options, method: METHODS.GET });
  }

  public post<T>(path: string, options: BodyOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: METHODS.POST });
  }

  public put<T>(path: string, options: BodyOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: METHODS.PUT });
  }

  public delete<T>(path: string, options: BodyOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: METHODS.DELETE });
  }

  private request<T>(path: string, options: SendOptions): Promise<T> {
    const { method, data, headers = {}, timeout = DEFAULT_TIMEOUT } = options;

    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, `${this.baseUrl}${path}`);
      xhr.withCredentials = true;
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([name, value]) => {
        xhr.setRequestHeader(name, value);
      });

      xhr.onload = () => {
        let response: unknown;

        try {
          response = parseResponse(xhr);
        } catch {
          reject(createHTTPError(xhr.status, "Некорректный ответ сервера"));
          return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(response as T);
          return;
        }

        reject(createHTTPError(xhr.status, getErrorReason(response, xhr.statusText)));
      };

      xhr.onerror = () => reject(new NetworkError());
      xhr.onabort = () => reject(new NetworkError("Запрос был прерван"));
      xhr.ontimeout = () => reject(new TimeoutError());

      if (method === METHODS.GET || data === undefined) {
        xhr.send();
        return;
      }

      if (data instanceof FormData) {
        xhr.send(data);
        return;
      }

      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    });
  }
}
