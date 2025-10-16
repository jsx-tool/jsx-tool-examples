# Next.js with JSX Tool (Manual Installation - Recommended)

This example demonstrates how to use JSX Tool with Next.js using **manual installation**. This is the **recommended approach** as it avoids the redirect and routing issues that can occur with the proxy setup.

## How It Works

Instead of using a proxy server, JSX Tool scripts are directly injected into your Next.js application during development. This approach:

- **Next.js runs on port 3002** - Your development server (no proxy needed!)
- **WebSocket runs on port 12022** - For file-system communication
- **Scripts injected via `<head>`** - Manual injection in `layout.tsx`

The JSX Tool WebSocket URL is set via a global window variable that's only included in development mode.

## Configuration

See `.jsxtool/config.json` for the configuration:

```json
{
  "noProxy": true,              // Disable proxy mode
  "wsPort": 12022,              // WebSocket port
  "wsHost": "localhost",
  "wsProtocol": "ws",
  "logging": false
}
```

## Manual Installation Setup

The key to manual installation is setting the WebSocket URL in your root layout. In `app/layout.tsx`:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__JSX_TOOL_DEV_SERVER_WS_URL__ = 'ws://0.0.0.0:12022';`,
            }}
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

This script:
- Only runs in development mode
- Sets the WebSocket URL for JSX Tool to connect to your file system
- Uses port 12022 (matching the `wsPort` in config.json)

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
1. Starts the JSX Tool WebSocket server on port 12022
2. Starts Next.js dev server on port 3002

### Access Your Application

Simply visit `http://localhost:3002` - no proxy needed!

## Available Scripts

- `npm run dev` - Start Next.js dev server only (port 3002)
- `npm run jsx-tool` - Start JSX Tool WebSocket server only
- `npm run dev:jsx-tool` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run start` - Start production server

## Why Manual Installation is Better

✅ **No redirect issues** - Your Next.js routing works exactly as expected

✅ **No proxy overhead** - Direct connection to your dev server

✅ **Simpler debugging** - No intermediate proxy layer to troubleshoot

✅ **More control** - You decide exactly when and how JSX Tool is loaded

## Comparison with Proxy Setup

| Feature | Manual Installation | Proxy Setup |
|---------|-------------------|-------------|
| Redirect handling | ✅ Works perfectly | ⚠️ Can cause issues |
| Setup complexity | Slightly more | Simpler initial setup |
| Performance | ✅ No overhead | Proxy overhead |
| Port management | Direct access | Requires proxy port |
| Recommended | ✅ Yes | Only if manual won't work |

## Project Structure

```
next-without-proxy/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with JSX Tool injection
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── public/             # Static assets
├── .jsxtool/           # JSX Tool configuration
│   ├── config.json     # WebSocket configuration
│   └── rules.md        # Custom rules (optional)
├── next.config.ts      # Next.js configuration
└── package.json        # Dependencies and scripts
```

## Learn More

- [JSX Tool Documentation](https://github.com/jsx-tool/jsx-tool)
- [Next.js Documentation](https://nextjs.org/docs)
- [Proxy Installation Example](../next-with-proxy) - Alternative approach