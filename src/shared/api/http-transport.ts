import { API_URL } from "../config/api";
import { createHTTPError, NetworkError, TimeoutError } from "./errors";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

export type RequestData = Record<string, unknown> | FormData;

export interface RequestOptions {
  headers?: Record<string, string>;
  data?: RequestData;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

interface SendOptions extends RequestOptions {
  method: Method;
}

type HTTPMethod = <T>(url: string, options?: RequestOptions) => Promise<T>;

export function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be a non-null object");
  }

  const keys = Object.keys(data);

  if (keys.length === 0) {
    return "";
  }

  return keys.reduce((result, key, index) => {
    const value = data[key];

    if (value === undefined || value === null) {
      return result;
    }

    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(String(value));

    const separator = index < keys.length - 1 ? "&" : "";

    return `${result}${encodedKey}=${encodedValue}${separator}`;
  }, "?");
}

function getErrorReason(xhr: XMLHttpRequest): string {
  try {
    const response: unknown = JSON.parse(xhr.responseText);

    if (
      typeof response === "object" &&
      response !== null &&
      "reason" in response &&
      typeof response.reason === "string"
    ) {
      return response.reason;
    }
  } catch {
    return xhr.responseText || xhr.statusText;
  }

  return xhr.statusText;
}

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(prefix = "") {
    this.baseUrl = `${API_URL}${prefix}`;
  }

  public get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  public post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  public put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  public delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  private request = <T>(url: string, options: SendOptions, timeout = 5000): Promise<T> => {
    const { headers = {}, method, data, responseType } = options;

    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      const fullUrl = `${this.baseUrl}${url}`;

      xhr.open(
        method,
        isGet && data && !(data instanceof FormData) ? `${fullUrl}${queryStringify(data)}` : fullUrl,
      );

      xhr.withCredentials = true;

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key] as string);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response: unknown;

          if (xhr.responseType) {
            response = xhr.response;
          } else {
            try {
              const contentType = xhr.getResponseHeader("Content-Type");
              if (contentType && contentType.includes("application/json")) {
                response = JSON.parse(xhr.responseText);
              } else {
                response = xhr.responseText;
              }
            } catch {
              response = xhr.responseText;
            }
          }

          resolve(response as T);
        } else {
          reject(createHTTPError(xhr.status, getErrorReason(xhr)));
        }
      };

      xhr.onabort = () => reject(new NetworkError("Запрос был прерван"));

      xhr.onerror = () => reject(new NetworkError());

      xhr.timeout = timeout;

      xhr.ontimeout = () => reject(new TimeoutError());

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        if (!headers["Content-Type"]) {
          xhr.setRequestHeader("Content-Type", "application/json");
        }
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
