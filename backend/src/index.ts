import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import ovenRoutes from "@/routes/ovenRoutes.js";
import { createServer } from "http";
import { initializeWebSocket } from "@/websocket.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware.
app.use(express.json());
app.use(cors());

// Swagger configuration.
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Oven Buddy API",
      version: "1.0.0",
      description: "API for controlling and monitoring an oven",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (_req: express.Request, res: express.Response) => {
  res.json(swaggerSpec);
});

// Routes.
app.use("/api/oven", ovenRoutes);

// Create HTTP server so that we can attach Socket.IO to it.
const server = createServer(app);

// Start server.
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
  initializeWebSocket(server);
});
