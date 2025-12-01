import { config } from "dotenv";
import http from "http";

import { initializeDiscordBot } from "./libs/discord/bot.js";

// Load environment variables from .env file
config();

/**
 * Creates a simple HTTP server for health checks
 * Required for Render Web Service (free tier)
 */
function createHealthCheckServer() {
  const server = http.createServer((req, res) => {
    if (req.url === "/health" || req.url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", service: "discord-bot" }));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Health check server running on port ${port}`);
  });

  return server;
}

/**
 * Main entry point for the Discord bot
 */
async function main() {
  console.log("Starting Discord bot...");

  // Start health check server (required for Render Web Service)
  const healthServer = createHealthCheckServer();

  try {
    // Initialize the Discord bot
    const client = await initializeDiscordBot();

    if (!client) {
      console.error("Failed to initialize Discord bot");
      process.exit(1);
    }

    console.log("Discord bot is running!");

    // Handle graceful shutdown
    const shutdown = () => {
      console.log("\nShutting down Discord bot...");
      healthServer.close();
      client.destroy();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start Discord bot:", error);
    healthServer.close();
    process.exit(1);
  }
}

// Start the bot
void main();
