import myfetch from "../api_server/myfetch";
import SecureStorageUtil from "../utils/SecureStorage";

export type ApiError = {
  code: string;
  message: string;
  retryable: boolean;
};

type RequestOptions = {
  timeout?: number;
  signal?: AbortSignal;
};

class ApiClient {
  private async getAuthToken(): Promise<string | null> {
    return SecureStorageUtil.getItemAsync("authSession");
  }

  private normalizeError(error: unknown): ApiError {
    // Handle API response errors
    if (error && typeof error === "object" && "error" in error) {
      const apiError = error as { code?: string; error?: string };
      const code = apiError.code || "500";
      const message = apiError.error || "An unknown error occurred";

      // Determine if error is retryable
      const retryable =
        code === "500" || // Server errors are retryable
        code === "503" || // Service unavailable
        message.includes("network") ||
        message.includes("timeout");

      return {
        code,
        message,
        retryable,
      };
    }

    // Handle Error instances
    if (error instanceof Error) {
      // Token expired is not retryable - user needs to re-auth
      const isTokenError =
        error.message.includes("Token expired") ||
        error.message.includes("Invalid token") ||
        error.message.includes("No token provided");

      return {
        code: "400",
        message: error.message,
        retryable: !isTokenError,
      };
    }

    // Handle abort errors
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        code: "CANCELLED",
        message: "Request was cancelled",
        retryable: false,
      };
    }

    // Unknown error
    return {
      code: "500",
      message: "An unknown error occurred",
      retryable: true,
    };
  }

  async get<T>(
    path: string,
    options: RequestOptions = {},
  ): Promise<{ data?: T; error?: ApiError }> {
    try {
      const token = await this.getAuthToken();

      // Handle timeout
      const controller = new AbortController();
      const timeoutId = options.timeout
        ? setTimeout(() => controller.abort(), options.timeout)
        : null;

      // Combine external signal with timeout signal
      if (options.signal) {
        options.signal.addEventListener("abort", () => controller.abort());
      }

      const response = await myfetch(
        path,
        "GET",
        undefined,
        token ?? undefined,
      );

      if (timeoutId) clearTimeout(timeoutId);

      if (response.code === "200") {
        return { data: response.data as T };
      }

      return { error: this.normalizeError(response) };
    } catch (err) {
      return { error: this.normalizeError(err) };
    }
  }

  async post<T>(
    path: string,
    params?: any,
    options: RequestOptions = {},
  ): Promise<{ data?: T; error?: ApiError }> {
    try {
      const token = await this.getAuthToken();

      // Handle timeout
      const controller = new AbortController();
      const timeoutId = options.timeout
        ? setTimeout(() => controller.abort(), options.timeout)
        : null;

      // Combine external signal with timeout signal
      if (options.signal) {
        options.signal.addEventListener("abort", () => controller.abort());
      }

      const response = await myfetch(path, "POST", params, token ?? undefined);

      if (timeoutId) clearTimeout(timeoutId);

      if (response.code === "200") {
        return { data: response.data as T };
      }

      return { error: this.normalizeError(response) };
    } catch (err) {
      return { error: this.normalizeError(err) };
    }
  }

  // Auth methods don't need tokens
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await myfetch("/auth/login", "POST", credentials);
      if (response.code === "200") {
        return { data: response.data };
      }
      return { error: this.normalizeError(response) };
    } catch (err) {
      return { error: this.normalizeError(err) };
    }
  }

  async signup(credentials: { email: string; password: string }) {
    try {
      const response = await myfetch("/auth/signup", "POST", credentials);
      if (response.code === "200") {
        return { data: response.data };
      }
      return { error: this.normalizeError(response) };
    } catch (err) {
      return { error: this.normalizeError(err) };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
