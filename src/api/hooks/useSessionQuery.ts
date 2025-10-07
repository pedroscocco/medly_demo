import { useQuery } from "@tanstack/react-query";
import { useAuthSession } from "../../authentication/AuthSessionProvider";
import { Session } from "../../types";
import { apiClient } from "../apiClient";

export default function useSessionQuery() {
  const { handleTokenExpiration } = useAuthSession();

  return useQuery<Session>({
    queryKey: ["questions"],
    queryFn: async () => {
      const { data, error } = await apiClient.get<Session>("/sessions/questions");

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("No data returned");
      }

      return data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: (_, error) => {
      // Check if error is an ApiError
      if (error && typeof error === "object" && "retryable" in error) {
        const apiError = error as { message: string; retryable: boolean };

        if (apiError.message.includes("Token expired") || apiError.message.includes("Invalid token")) {
          handleTokenExpiration();
          return false;
        }

        return apiError.retryable;
      }
      return true;
    },
  });
}
