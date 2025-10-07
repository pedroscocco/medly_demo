import { onlineManager } from "@tanstack/react-query";
import { useEffect } from "react";
import ToastManager, { Toast } from "toastify-react-native";

export function useNetworkStatus() {
  // ===== Effects =====
  // Subscribe to network status changes
  useEffect(() => {
    const unsubscribe = onlineManager.subscribe((isOnline) => {
      if (isOnline) {
        Toast.success("Back online");
      } else {
        Toast.error("You're offline");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // ===== Render =====
  return function NetworkToast() {
    return <ToastManager topOffset={60} />;
  };
}
