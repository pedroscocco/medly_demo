const SecureStoreUtil = {
  getItemAsync: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  setItemAsync: async (key: string, value: string | null): Promise<void> => {
    if (value == null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  },
};

export default SecureStoreUtil;
