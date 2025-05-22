import React, { useState, useEffect, useCallback } from "react";
import { ovenApi } from "@/api/ovenApi";
import { useOvenWebSocket } from "@/hooks/useOvenWebSocket";
import { OvenState, OvenContextValue } from "@/hooks/useOven";
import { OvenContext } from "@/contexts/ovenContext";

export function OvenProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OvenState>({
    temp: 25,
    targetTemp: 25,
    doorOpen: false,
    history: [{ t: Date.now(), temp: 25 }],
    hasTurkey: false,
    timer: 0,
    targetTimer: 0,
  });

  // Fetch initial backend state.
  useEffect(() => {
    (async () => {
      try {
        const [
          { doorState },
          { targetTemperature },
          { timer },
          { targetTimer }
        ] = await Promise.all([
          ovenApi.getDoorState(),
          ovenApi.getTargetTemperature(),
          ovenApi.getTimer(),
          ovenApi.getTargetTimer(),
        ]);

        setState((prev) => ({
          ...prev,
          doorOpen: doorState === "open",
          targetTemp: targetTemperature,
          timer,
          targetTimer,
        }));
      } catch (err) {
        console.error("Failed to fetch initial oven state", err);
      }
    })();
  }, []);

  // Simulate heating/cooling loop.
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        // Use const for variables that are not reassigned.
        let { temp, targetTemp, history, timer } = prev;
        const { doorOpen, targetTimer } = prev;
        let dTemp = 0;
        if (doorOpen) {
          dTemp = Math.max(-0.8, 25 - temp);
        } else if (Math.abs(temp - targetTemp) > 0.2) {
          dTemp = (targetTemp - temp) * 0.06;
        }
        temp += dTemp;
        temp = Math.max(0, Math.min(270, temp));

        // Update timer.
        if (timer > 0) {
          timer = Math.max(0, timer - 0.2);
          setTimer(timer);
          if (timer === 0 && targetTimer > 0) {
            // Reset temperature when timer reaches 0.
            targetTemp = 25;
          }
        }

        const now = Date.now();
        if (history.length === 0 || now - history[history.length - 1].t > 250) {
          history = [...history, { t: now, temp }];
          if (history.length > 200)
            history = history.slice(history.length - 200);
        }
        return { ...prev, temp, history, timer, targetTemp };
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // WebSocket: live updates.
  const handleOvenUpdate = useCallback((update) => {
    setState((prev) => ({
      ...prev,
      doorOpen: update.doorState ? update.doorState === "open" : prev.doorOpen,
      targetTemp: update.targetTemperature ?? prev.targetTemp,
      timer: update.timer ?? prev.timer,
      targetTimer: update.targetTimer ?? prev.targetTimer,
    }));
  }, []);

  useOvenWebSocket(handleOvenUpdate);

  // Actions (including new ones).
  async function openDoor() {
    try {
      await ovenApi.updateDoorState("open");
      setState((s) => ({ ...s, doorOpen: true }));
    } catch (err) {
      console.error("Failed to open door", err);
    }
  }

  async function closeDoor() {
    try {
      await ovenApi.updateDoorState("closed");
      setState((s) => ({ ...s, doorOpen: false }));
    } catch (err) {
      console.error("Failed to close door", err);
    }
  }

  function toggleDoor() {
    if (state.doorOpen) closeDoor();
    else openDoor();
  }

  async function setTargetTemp(t: number) {
    const clamped = Math.max(25, Math.min(270, t));
    try {
      await ovenApi.updateTargetTemperature(clamped);
      setState((s) => ({ ...s, targetTemp: clamped }));
    } catch (err) {
      console.error("Failed to set target temperature", err);
    }
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

  async function setTimer(t: number): Promise<void> {
    try {
      await ovenApi.updateTimer(t);
      setState((s) => ({ ...s, timer: t }));
    } catch (err) {
      console.error("Failed to set timer", err);
    }
  }

  async function setTargetTimer(t: number): Promise<void> {
    try {
      await ovenApi.updateTargetTimer(t);
      setState((s) => ({ ...s, targetTimer: t, timer: t }));
    } catch (err) {
      console.error("Failed to set target timer", err);
    }
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
        setTargetTimer,
        setTimer,
      }}
    >
      {children}
    </OvenContext.Provider>
  );
}
