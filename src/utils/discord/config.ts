/**
 * Discord message character limit (Discord's maximum message length)
 */
export const DISCORD_MESSAGE_LIMIT = 2000;

/**
 * Maximum wait time (in milliseconds) for Discord client initialization
 */
export const INITIALIZATION_WAIT_TIME = 2000;

/**
 * Get the base URL for API calls
 *
 * @returns The base URL for the API from environment variable
 */
export function getApiBaseUrl(): string {
  return process.env.ASSISTANT_AI_API_URL || "";
}

/**
 * Get the Discord bot token from environment variables
 *
 * @returns The Discord bot token
 */
export function getDiscordToken(): string {
  return process.env.DISCORD_TOKEN || "";
}
