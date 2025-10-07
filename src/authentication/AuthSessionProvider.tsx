import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, type PropsWithChildren, use } from "react";
import { apiClient, type ApiError } from "../api/apiClient";
import { useSecureStoreState } from "../hooks/useSecureStoreState";
import { useAppSessionStore } from "../store/useAppSessionStore";

type UserCredentials = { email: string; password: string };

const AuthContext = createContext<{
  signUp: (userCredentials: UserCredentials) => void;
  signIn: (userCredentials: UserCredentials) => void;
  signOut: () => void;
  handleTokenExpiration: () => void;
  authSession?: { token: string } | null;
  isLoading: boolean;
  isSingingIn: boolean;
  error: ApiError | null;
  clearError: () => void;
}>({
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  handleTokenExpiration: () => null,
  authSession: null,
  isLoading: false,
  isSingingIn: false,
  error: null,
  clearError: () => null,
});

// Use this hook to access the user info.
export function useAuthSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <AuthSessionProvider />");
  }

  return value;
}

export function AuthSessionProvider({ children }: PropsWithChildren) {
  // ===== Routing & Data =====
  const queryClient = useQueryClient();

  // ===== Hooks =====
  const [[isLoading, authSession], setAuthSession] =
    useSecureStoreState("authSession");

  // ===== Store State & Actions =====
  const clearStoreOnSignOut = useAppSessionStore(
    (state) => state.clearStoreOnSignOut
  );

  // ===== Mutations =====
  const signinMutation = useMutation<any, ApiError, any>({
    mutationFn: async (params: any) => {
      const { data, error } = params.isSignUp
        ? await apiClient.signup(params.userCredentials)
        : await apiClient.login(params.userCredentials);

      if (error) {
        throw error;
      }

      return data;
    },
    onSettled: (data) => {
      if (data?.token) {
        setAuthSession(data.token);
      }
      if (data?.user) {
        queryClient.setQueryData(["currentUser"], data.user);
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
    },
    retry: false,
  });

  // ===== Handlers and Callbacks =====
  const signOutUser = () => {
    clearStoreOnSignOut();
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    setAuthSession(null);
  };

  // ===== Render =====
  return (
    <AuthContext
      value={{
        signUp: async (userCredentials: UserCredentials) => {
          signinMutation.mutate({ isSignUp: true, userCredentials });
        },
        signIn: async (userCredentials: UserCredentials) => {
          signinMutation.mutate({ isSignUp: false, userCredentials });
        },
        signOut: () => {
          signOutUser();
        },
        handleTokenExpiration: () => {
          // Attempt token refresh
          signOutUser();
        },
        authSession: authSession ? { token: authSession } : null,
        isLoading,
        isSingingIn: signinMutation.isPending,
        error: signinMutation.error,
        clearError: () => signinMutation.reset(),
      }}
    >
      {children}
    </AuthContext>
  );
}
