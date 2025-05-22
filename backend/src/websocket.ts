import { Server as HttpServer } from "http";
import { Server as IOServer, type Socket } from "socket.io";
import type { OvenStatus } from "@/types/index.js";

let io: IOServer | undefined;

/**
 * Initializes the Socket.IO server on top of the provided HTTP server.
 *
 * @param server The HTTP server returned by `createServer`.
 */
export function initializeWebSocket(server: HttpServer): void {
  io = new IOServer(server, {
    cors: {
      origin: "*", // TODO: Restrict CORS in production.
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("WebSocket client connected", socket.id);

    socket.on("disconnect", () => {
      console.log("WebSocket client disconnected", socket.id);
    });
  });
}

/**
 * Broadcasts an oven status update to all connected clients.
 *
 * @param status A partial update of the current oven status. Only the provided
 * fields will be sent.
 */
export function broadcastOvenUpdate(status: Partial<OvenStatus>): void {
  if (!io) return;
  io.emit("ovenUpdate", status);
} 
