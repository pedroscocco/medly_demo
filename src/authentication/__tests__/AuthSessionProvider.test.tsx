import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { AuthSessionProvider, useAuthSession } from '../AuthSessionProvider';

// Mock SecureStorage to avoid async state updates
jest.mock('../../utils/SecureStorage');

describe('AuthSessionProvider', () => {
  it('provides authentication context', async () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </QueryClientProvider>
      ),
    });

    // Wait for initial async loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.signIn).toBeDefined();
    expect(result.current.signUp).toBeDefined();
    expect(result.current.signOut).toBeDefined();
    expect(result.current.authSession).toBeDefined();
  });

  it('starts with loading state and then finishes loading', async () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </QueryClientProvider>
      ),
    });

    expect(result.current.isLoading).toBe(true);

    // Wait for loading to finish
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('signOut clears auth session', async () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </QueryClientProvider>
      ),
    });

    // Wait for loading to finish
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => result.current.signOut());

    expect(result.current.authSession).toBe(null);
  });
});
