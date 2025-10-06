import React, { createContext, ReactNode, useContext, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

export interface DropZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DropZonesContextValue {
  dropZones: DropZone[];
  registerDropZone: (zone: DropZone) => void;
  unregisterDropZone: (id: string) => void;
  remeasureTrigger: SharedValue<number>;
  triggerRemeasure: () => void;
}

const DropZonesContext = createContext<DropZonesContextValue | null>(null);

export function useDropZones() {
  const context = useContext(DropZonesContext);
  if (!context) {
    throw new Error("useDropZones must be used within DropZonesProvider");
  }
  return context;
}

interface DropZonesProviderProps {
  children: ReactNode;
}

export function DropZonesProvider({ children }: DropZonesProviderProps) {
  const [dropZones, setDropZones] = useState<DropZone[]>([]);
  const remeasureTrigger = useSharedValue(0);

  const registerDropZone = (zone: DropZone) => {
    setDropZones((dropZones) => [
      ...dropZones.filter((z) => z.id !== zone.id),
      zone,
    ]);
  };
  const unregisterDropZone = (id: string) => {
    setDropZones((dropZones) => dropZones.filter((z) => z.id !== id));
  };

  const triggerRemeasure = () => {
    remeasureTrigger.value += 1;
  };

  return (
    <DropZonesContext
      value={{
        dropZones,
        registerDropZone,
        unregisterDropZone,
        remeasureTrigger,
        triggerRemeasure,
      }}
    >
      {children}
    </DropZonesContext>
  );
}
