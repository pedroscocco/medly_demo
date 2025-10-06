import { onlineManager } from "@tanstack/react-query";
import { useEffect } from "react";
import ToastManager, { Toast } from "toastify-react-native";

export function useNetworkStatus() {
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

  return function NetworkToast() {return <ToastManager topOffset={60} />};
}
