/**
 * Generated MCP server from OpenAPI spec.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
/**
 * Calls the backend REST API.
 */
async function callBackend(path, options) {
    const baseUrl = process.env.BACKEND_URL;
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Backend error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
const server = new McpServer({
    name: "Generated-MCP",
    version: "1.0.0",
});
server.tool("get__api_oven_door-state", {}, async (params) => {
    const result = await callBackend("/api/oven/door-state", {
        method: "GET"
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("post__api_oven_door-state", {
    doorState: z.string().optional()
}, async (params) => {
    const result = await callBackend("/api/oven/door-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("post__api_oven_off", {}, async (params) => {
    const result = await callBackend("/api/oven/off", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("get__api_oven_state", {}, async (params) => {
    const result = await callBackend("/api/oven/state", {
        method: "GET"
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("post__api_oven_state", {
    ovenState: z.string().optional()
}, async (params) => {
    const result = await callBackend("/api/oven/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("get__api_oven_target-timer", {}, async (params) => {
    const result = await callBackend("/api/oven/target-timer", {
        method: "GET"
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("post__api_oven_target-timer", {
    targetTimer: z.number().optional()
}, async (params) => {
    const result = await callBackend("/api/oven/target-timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("get__api_oven_temperature_in_celsius", {}, async (params) => {
    const result = await callBackend("/api/oven/temperature", {
        method: "GET"
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("post__api_oven_temperature_in_celsius", {
    targetTemperature: z.number().optional()
}, async (params) => {
    const result = await callBackend("/api/oven/temperature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("get__api_oven_timer", {}, async (params) => {
    const result = await callBackend("/api/oven/timer", {
        method: "GET"
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
server.tool("post__api_oven_timer", {
    timer: z.number().optional()
}, async (params) => {
    const result = await callBackend("/api/oven/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
const transport = new StdioServerTransport();
await server.connect(transport);
