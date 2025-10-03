import * as SecureStore from "expo-secure-store";

const SecureStoreUtil = {
  getItemAsync: async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
  },
  setItemAsync: async (key: string, value: string | null): Promise<void> => {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
};

export default SecureStoreUtil;
