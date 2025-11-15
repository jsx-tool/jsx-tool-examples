# Next.js with JSX Tool (Manual Installation - Recommended)

This is an example project with JSX Tool and Next.js using the **manual installation**. This is the **recommended approach**. Acess the app with JSX Tool pre-installed on **localhost:3000**

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
1. Starts the JSX Tool WebSocket server on port 12021
2. Starts your application on port 3000
3. Starts dev server on port 4000

## How It Works

JSX Tool scripts are directly injected into your Next.js application during development. This approach:

- **Next.js runs on port 3000**
- **Proxy server runs on port 4000**
- **WebSocket runs on port 12021** - For file-system communication
- **Scripts injected via `<head>`** - Manual injection in `layout.tsx`

The JSX Tool WebSocket URL is set via a global window variable that's only included in development mode.

## Configuration

See `.jsxtool/config.json` for the configuration:

```json
{
  "serverPort": 3000,
  "serverHost": "localhost",
  "serverProtocol": "http",
  "noProxy": false,
  "proxyPort": 4000,
  "proxyHost": "localhost",
  "proxyProtocol": "http",
  "wsPort": 12021,
  "wsHost": "localhost",
  "wsProtocol": "ws",
  "injectAt": "</head>"
}
```

## rules.md
A blank rules.md is available at `.jsxtool/rules.md`.  Update these rules to and they will be sent to the LLM with every prompt.

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
              __html: `window.__JSX_TOOL_DEV_SERVER_WS_URL__ = 'ws://0.0.0.0:12021';`,
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
- Uses port 12021 (matching the `wsPort` in config.json)

### Access Your Application

Visit `http://localhost:3000`

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

- [JSX Tool Documentation](https://jsx-tool.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)