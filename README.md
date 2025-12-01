# Discord Bot

Standalone Discord bot application for deployment on Render.

## Features

- Listens to Discord messages and responds when mentioned
- Integrates with Assistant AI API for chat responses
- Handles long messages by splitting them into multiple parts
- Graceful error handling and reconnection
- Uses dotenv to load environment variables from `.env` file

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DISCORD_TOKEN=your_discord_bot_token
ASSISTANT_AI_API_URL=https://your-assistant-ai-domain.com
```

### Getting Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select an existing one
3. Go to the "Bot" section
4. Click "Reset Token" or "Copy" to get your bot token
5. Make sure to enable "Message Content Intent" in the Bot settings

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode (with hot reload)
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```

## How it works

The application uses `dotenv` to load environment variables:

1. `env.ts` imports `dotenv` and calls `config()` to load `.env` file
2. Environment variables are validated using Zod schema
3. The validated `env` object is exported and used throughout the app

When running on Render or other platforms, environment variables are typically set through the platform's UI, so `.env` file is not needed in production.

## Deployment on Render

### Option 1: Using Render Dashboard

1. Create a new "Background Worker" service on Render
2. Connect your repository
3. Set the following:
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Environment Variables**:
     - `DISCORD_TOKEN`: Your Discord bot token
     - `ASSISTANT_AI_API_URL`: URL of your Assistant AI API (e.g., `https://your-app.onrender.com`)

### Option 2: Using render.yaml

See `render.yaml` for infrastructure as code configuration.

## Project Structure

```
discord-bot/
├── src/
│   ├── libs/
│   │   └── discord/
│   │       └── bot.ts          # Bot initialization
│   ├── utils/
│   │   └── discord/
│   │       ├── api-client.ts   # API client for chat
│   │       ├── client-manager.ts  # Client state management
│   │       ├── config.ts      # Configuration constants
│   │       ├── event-handlers.ts  # Discord event handlers
│   │       └── message-handler.ts  # Message processing logic
│   └── index.ts               # Entry point
├── env.ts                     # Environment validation (uses dotenv)
├── package.json
├── tsconfig.json
└── README.md
```

## Notes

- This is a standalone application that doesn't depend on monorepo packages
- All dependencies are self-contained in `package.json`
- Environment variables are loaded using `dotenv` and validated using Zod
- The bot requires "Message Content Intent" to be enabled in Discord Developer Portal
- In production (Render), environment variables are set via platform UI, not `.env` file

