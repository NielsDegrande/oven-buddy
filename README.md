# Oven Buddy

## Frontend

A simple oven digital twin.
You can:

- Open and close the door.
- Insert and remove a turkey.
- Set a target temperature.

## Backend

A simple API to connect to the digital twin.

## MCP Server

Expose the backend to any MCP client. This was generated with [MCPify](https://github.com/NielsDegrande/mcpify).
Build the server when making an update: `pnpm build`.

## Intended Journey

Control `Claude Desktop` or whichever MCP client with voice (built-in or for example Apple dictation).

- `Claude Desktop`: Upload picture of a Turkey. Ask for cooking instructions.
- `Claude Desktop`: Ask to preheat the oven.
- `Frontend`: Once the temperature toast appears, open door, insert turkey, close door.
- `Claude Desktop`: Ask to set the timer.
- `Frontend`: Once the timer beeps, open door, remove Turkey, close door.
- `Claude Desktop`: Turn off the oven.
- You have left the house.
- `Claude Desktop`: Did I turn off the oven?
