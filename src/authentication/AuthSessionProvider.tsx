import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, type PropsWithChildren, use } from 'react';
import myfetch from '../api/myfetch';
import { useSecureStoreState } from '../hooks/useSecureStoreState';

type UserCredentials = { email: string, password: string };

const AuthContext = createContext<{
  signUp: (userCredentials: UserCredentials) => void;
  signIn: (userCredentials: UserCredentials) => void;
  signOut: () => void;
  authSession?: { token: string } | null;
  isLoading: boolean;
  isSingingIn: boolean;
  error: Error | null;
  clearError: () => void;
}>({
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
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
    throw new Error('useSession must be wrapped in a <AuthSessionProvider />');
  }

  return value;
}

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [[isLoading, authSession], setAuthSession] = useSecureStoreState('authSession');
  const signinMutation = useMutation({
    mutationFn: async (params: {isSignUp: boolean, userCredentials: UserCredentials}) => {
      const path = params.isSignUp ? '/auth/signup' : '/auth/login';
      const response = await myfetch(path, 'POST', params.userCredentials);
      if (response.code === '200') {
        return response.data;
      }
      throw new Error(response.error || 'Failed to log in');
    },
    onSettled: (data) => {
      if (data?.token) {
        setAuthSession(data.token);
      }
      if (data?.user) {
        queryClient.setQueryData(['currentUser'], data.user);
        queryClient.invalidateQueries({ queryKey: ['currentUser']});
      }
    }
  });

  return (
    <AuthContext
      value={{
        signUp: async (userCredentials: UserCredentials) => {
          signinMutation.mutate({isSignUp: true, userCredentials});
        },
        signIn: async (userCredentials: UserCredentials) => {
          signinMutation.mutate({isSignUp: false, userCredentials});
        },
        signOut: () => {
          queryClient.removeQueries({ queryKey: ['currentUser']});
          setAuthSession(null);
        },
        authSession: authSession ? { token: authSession } : null,
        isLoading,
        isSingingIn: signinMutation.isPending,
        error: signinMutation.error,
        clearError: () => signinMutation.reset(),
      }}>
      {children}
    </AuthContext>
  );
}
