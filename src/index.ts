import { config } from "dotenv";

import { initializeDiscordBot } from "./libs/discord/bot.js";

// Load environment variables from .env file
config();

/**
 * Main entry point for the Discord bot
 */
async function main() {
  console.log("Starting Discord bot...");

  try {
    // Initialize the Discord bot
    const client = await initializeDiscordBot();

    if (!client) {
      console.error("Failed to initialize Discord bot");
      process.exit(1);
    }

    console.log("Discord bot is running!");

    // Handle graceful shutdown
    process.on("SIGINT", () => {
      console.log("\nShutting down Discord bot...");
      client.destroy();
      process.exit(0);
    });

    process.on("SIGTERM", () => {
      console.log("\nShutting down Discord bot...");
      client.destroy();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start Discord bot:", error);
    process.exit(1);
  }
}

// Start the bot
void main();
