import { useCallback, useEffect, useReducer } from "react";
import SecureStorageUtil from "../utils/SecureStorage";

type AsyncState<T> = [boolean, T | null];

type UseAsyncStateHook<T> = [AsyncState<T>, (value: T | null) => void];

/* The state is a tuple where the first element is a boolean indicating loading status,
and the second element is the loaded value or null if not loaded.
Initializes with loading true and changes to loading false once a value is set. */
function useAsyncLoadingState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseAsyncStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseAsyncStateHook<T>;
}

export function useSecureStoreState(key: string): UseAsyncStateHook<string> {
  // Local state to manage loading and value from async storage
  const [asyncLoadingState, setAsyncState] = useAsyncLoadingState<string>();

  // Get
  useEffect(() => {
    SecureStorageUtil.getItemAsync(key).then((value) => {
      setAsyncState(value);
    });
  }, [key, setAsyncState]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setAsyncState(value);
      SecureStorageUtil.setItemAsync(key, value);
    },
    [key, setAsyncState],
  );

  return [asyncLoadingState, setValue];
}
