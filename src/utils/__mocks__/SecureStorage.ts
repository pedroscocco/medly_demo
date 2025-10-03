// Mock SecureStorage for testing - synchronous in-memory storage
const storage: { [key: string]: string | null } = {};

const SecureStorageUtil = {
  async getItemAsync(key: string): Promise<string | null> {
    return storage[key] ?? null;
  },

  async setItemAsync(key: string, value: string | null): Promise<void> {
    if (value === null) {
      delete storage[key];
    } else {
      storage[key] = value;
    }
  },

  async deleteItemAsync(key: string): Promise<void> {
    delete storage[key];
  },

  // Test helper to clear all storage
  clearAll() {
    Object.keys(storage).forEach(key => delete storage[key]);
  },
};

export default SecureStorageUtil;
