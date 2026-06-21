import { API_BASE_URL, RETRY_CONFIG } from "@/config/constants";

interface FetchOptions extends RequestInit {
  timeout?: number;
  retry?: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getDelay = (attempt: number): number => {
  const delay = RETRY_CONFIG.INITIAL_DELAY * Math.pow(2, attempt);
  return Math.min(delay, RETRY_CONFIG.MAX_DELAY);
};

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    timeout = 30000,
    retry = RETRY_CONFIG.MAX_RETRIES,
    ...fetchOptions
  } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`);
        error.name = `HTTP_${response.status}`;
        throw error;
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");

      if (attempt < retry) {
        const delay = getDelay(attempt);
        await sleep(delay);
      }
    }
  }

  clearTimeout(timeoutId);
  throw lastError || new Error("Request failed after retries");
}

export const api = {
  get: <T,>(endpoint: string, options?: FetchOptions) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T,>(endpoint: string, body?: Record<string, unknown>, options?: FetchOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T,>(endpoint: string, body?: Record<string, unknown>, options?: FetchOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T,>(endpoint: string, options?: FetchOptions) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T,>(endpoint: string, body?: Record<string, unknown>, options?: FetchOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: body ? JSON.stringify(body) : undefined,
    }),
};
