import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export type OvenUpdateMessage = {
  doorState?: "open" | "closed";
  ovenState?: "on" | "off";
  targetTemperature?: number;
};

/**
 * Establishes a Socket.IO connection to the backend and invokes the callback
 * whenever an oven update message is received.
 *
 * @param onUpdate Callback to execute when a new oven update arrives.
 */
export function useOvenWebSocket(onUpdate: (u: OvenUpdateMessage) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_OVEN_WS_URL ?? "http://localhost:3000";
    socketRef.current = io(url, {
      autoConnect: true,
      transports: ["websocket"],
    });

    socketRef.current.on("ovenUpdate", (payload: OvenUpdateMessage) => {
      console.log("ovenUpdate", payload);
      onUpdate(payload);
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [onUpdate]);
} 
