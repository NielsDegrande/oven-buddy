
import React, { createContext, useContext, useState } from "react";

// Add hasTurkey to state
type OvenState = {
  temp: number;
  targetTemp: number;
  doorOpen: boolean;
  history: { t: number; temp: number }[];
  hasTurkey: boolean;
};

type OvenContextValue = OvenState & {
  openDoor: () => void;
  closeDoor: () => void;
  toggleDoor: () => void;
  setTargetTemp: (t: number) => void;
  insertTurkey: () => void;
  removeTurkey: () => void;
  simulateApiCommand: (cmd: string) => void;
};

const OvenContext = createContext<OvenContextValue | undefined>(undefined);

export function useOven() {
  const ctx = useContext(OvenContext);
  if (!ctx) throw new Error("Must be used within OvenProvider");
  return ctx;
}

export function OvenProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OvenState>({
    temp: 25,
    targetTemp: 25,
    doorOpen: false,
    history: [{ t: Date.now(), temp: 25 }],
    hasTurkey: false, // new!
  });

  // Simulate heating/cooling loop
  React.useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        let { temp, targetTemp, doorOpen, history, hasTurkey } = prev;
        let dTemp = 0;
        if (doorOpen) {
          dTemp = Math.max(-0.8, 25 - temp);
        } else if (Math.abs(temp - targetTemp) > 0.2) {
          dTemp = (targetTemp - temp) * 0.06;
        }
        temp += dTemp;
        temp = Math.max(0, Math.min(270, temp));
        const now = Date.now();
        if (
          history.length === 0 ||
          now - history[history.length - 1].t > 250
        ) {
          history = [...history, { t: now, temp }];
          if (history.length > 200) history = history.slice(history.length - 200);
        }
        return { ...prev, temp, history };
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Actions (including new ones)
  function openDoor() {
    setState((s) => ({ ...s, doorOpen: true }));
  }
  function closeDoor() {
    setState((s) => ({ ...s, doorOpen: false }));
  }
  function toggleDoor() {
    setState((s) => ({ ...s, doorOpen: !s.doorOpen }));
  }
  function setTargetTemp(t: number) {
    setState((s) => ({ ...s, targetTemp: Math.max(25, Math.min(270, t)) }));
  }
  function insertTurkey() {
    setState((s) => (s.doorOpen ? { ...s, hasTurkey: true } : s));
  }
  function removeTurkey() {
    setState((s) => (s.doorOpen ? { ...s, hasTurkey: false } : s));
  }

  // Simulated API commands
  function simulateApiCommand(cmd: string) {
    if (cmd === "OPEN_DOOR") openDoor();
    else if (cmd === "CLOSE_DOOR") closeDoor();
    else if (cmd.startsWith("SET_TEMP:")) {
      const num = Number(cmd.split(":")[1]);
      if (!isNaN(num)) setTargetTemp(num);
    }
    // Optionally add API control for turkey (future)
  }

  return (
    <OvenContext.Provider
      value={{
        ...state,
        openDoor,
        closeDoor,
        toggleDoor,
        setTargetTemp,
        insertTurkey,
        removeTurkey,
        simulateApiCommand,
      }}
    >
      {children}
    </OvenContext.Provider>
  );
}

