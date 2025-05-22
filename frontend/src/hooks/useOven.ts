import { useContext } from "react";
import { OvenContext } from "@/contexts/ovenContext";

export type OvenState = {
  temp: number;
  targetTemp: number;
  doorOpen: boolean;
  history: { t: number; temp: number }[];
  hasTurkey: boolean;
  timer: number;
  targetTimer: number;
};

export type OvenContextValue = OvenState & {
  openDoor: () => Promise<void>;
  closeDoor: () => Promise<void>;
  toggleDoor: () => void;
  setTargetTemp: (t: number) => Promise<void>;
  insertTurkey: () => void;
  removeTurkey: () => void;
  simulateApiCommand: (cmd: string) => void;
  setTargetTimer: (t: number) => Promise<void>;
  setTimer: (t: number) => Promise<void>;
};

/**
 * Hook to access the oven context.
 * @returns The oven context value.
 * @throws Error if used outside of OvenProvider.
 */
export function useOven() {
  const ctx = useContext(OvenContext);
  if (!ctx) throw new Error("Must be used within OvenProvider");
  return ctx;
} 
