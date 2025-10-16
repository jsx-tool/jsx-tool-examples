# Next.js with JSX Tool (Proxy Setup)

This example demonstrates how to use JSX Tool with Next.js using a **proxy-based setup**. The proxy intercepts requests to your Next.js development server and injects the JSX Tool scripts needed to communicate with your file-system.

## How It Works

The setup uses JSX Tool's built-in proxy server to intercept and modify responses from your Next.js dev server:

- **Next.js runs on port 3001** - Your actual development server
- **Proxy runs on port 4000** - The intercepting proxy server
- **WebSocket runs on port 12021** - For file-system communication

When you visit `http://localhost:4000`, the proxy forwards requests to `http://localhost:3001` and injects JSX Tool's scripts into the HTML response in the `</head>` tag.

## Configuration

See `.jsxtool/config.json` for the proxy configuration:
```json
{
  "serverPort": 3001,          // Next.js dev server port
  "serverHost": "localhost",
  "serverProtocol": "http",
  "noProxy": false,             // Enable proxy mode
  "proxyPort": 4000,            // Proxy server port (visit this in browser)
  "proxyHost": "localhost",
  "proxyProtocol": "http",
  "wsPort": 12021,              // WebSocket port
  "wsHost": "localhost",
  "wsProtocol": "ws",
}
```

## Getting Started

### Install Dependencies
```bash
npm install
```

### Start the Development Server with JSX Tool
```bash
npm run dev:jsx-tool
```

This command:
1. Starts the JSX Tool proxy server on port 4000
2. Starts Next.js dev server on port 3001

### Access Your Application

**Important:** Visit `http://localhost:4000` (the proxy port), not port 3001.

The proxy intercepts requests to port 3001 and injects JSX Tool functionality.

## Available Scripts

- `npm run dev` - Start Next.js dev server only (port 3001)
- `npm run jsx-tool` - Start JSX Tool proxy server only
- `npm run dev:jsx-tool` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run start` - Start production server

## Downsides of Proxy Setup

⚠️ **The proxy approach can cause issues with redirect logic.** When your Next.js app performs redirects, the proxy may not handle them correctly, which could lead to the dev-server disconnecting.

### Recommended Alternative

**We strongly recommend using manual installation instead of proxying when possible.** Manual installation gives you more control and avoids redirect issues. See the `next-without-proxy` example for the recommended approach.

## Project Structure
```
next-with-proxy/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── public/             # Static assets
├── config.json         # JSX Tool proxy configuration
├── next.config.ts      # Next.js configuration
└── package.json        # Dependencies and scripts
├── .jsxtool
│   ├── config.json
│   └── rules.md
```