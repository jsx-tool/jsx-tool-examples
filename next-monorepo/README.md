# Next.js Monorepo with JSX Tool

This example demonstrates how to use JSX Tool in a Next.js monorepo setup with shared packages. The key feature here is configuring JSX Tool to access multiple directories across your monorepo.

## Monorepo Structure

```
next-monorepo/
├── package.json              # Root workspace configuration
├── packages/
│   ├── app/                  # Next.js application
│   │   ├── .jsxtool/        # JSX Tool config (next to package.json!)
│   │   │   ├── config.json
│   │   │   └── rules.md
│   │   ├── app/
│   │   ├── package.json
│   │   └── ...
│   └── shared/               # Shared components/utilities
│       ├── src/
│       │   ├── components/
│       │   │   └── Button.tsx
│       │   └── index.ts
│       └── package.json
```

## Key Configuration: Additional Directories

The critical feature for monorepos is the `additionalDirectories` configuration in `.jsxtool/config.json`. This gives JSX Tool access to additional directories in your monorepo.

### Configuration Location

**Important:** The `.jsxtool/` directory must be placed **next to the `package.json` of your app package**, not at the monorepo root.

```
packages/app/.jsxtool/config.json  ✅ Correct
.jsxtool/config.json               ❌ Wrong
```

### Additional Directories Setup

In `packages/app/.jsxtool/config.json`:

```json
{
  "noProxy": true,
  "wsPort": 12124,
  "wsHost": "localhost",
  "wsProtocol": "ws",
  "injectAt": "</head>",
  "additionalDirectories": ["../shared"]
}
```

**Critical:** The paths in `additionalDirectories` are **relative to the app's `package.json`**, not the monorepo root.

Since the config is in `packages/app/.jsxtool/`, and you want to access `packages/shared/`, the relative path is `../shared`.

```
packages/app/          (your .jsxtool/config.json is here)
    └── .jsxtool/
        └── config.json
            └── "additionalDirectories": ["../shared"]  (goes up one, then into shared)
```

## Package Configuration

### Root `package.json`

```json
{
  "name": "next-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev:jsx-tool --workspace=app",
    "build": "npm run build --workspace=app",
    "start": "npm run start --workspace=app",
    "lint": "npm run lint --workspace=app"
  },
  "devDependencies": {
    "typescript": "^5.9.2"
  }
}
```

### App `package.json` (`packages/app/package.json`)

```json
{
  "name": "app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port 3001",
    "jsx-tool": "jsx-tool",
    "dev:jsx-tool": "npm run jsx-tool & npm run dev",
    "build": "next build --turbopack",
    "start": "next start"
  },
  "dependencies": {
    "@jsx-tool/jsx-tool": "^0.0.10",
    "next": "15.5.5",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "shared": "*"
  }
}
```

**Note:** The `jsx-tool` script uses `../../node_modules/` because dependencies are hoisted to the monorepo root.

### Shared `package.json` (`packages/shared/package.json`)

```json
{
  "name": "shared",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/*.tsx"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

## Manual Installation in Layout

In `packages/app/app/layout.tsx`, inject the WebSocket URL:

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
              __html: `window.__JSX_TOOL_DEV_SERVER_WS_URL__ = 'ws://localhost:12124';`,
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

## Getting Started

### Install Dependencies

```bash
npm install
```

This installs dependencies for all workspace packages.

### Start Development

```bash
npm run dev
```

This runs `npm run dev:jsx-tool --workspace=app`, which:
1. Starts the JSX Tool WebSocket server on port 12124
2. Starts Next.js dev server on port 3001
3. Gives JSX Tool access to both `packages/app/` and `packages/shared/`

### Access Your Application

Visit `http://localhost:3001`

## Using Shared Components

With the monorepo setup, you can use shared components in your app:

```tsx
// In packages/app/app/page.tsx
import { Button } from 'shared';

export default function Home() {
  return (
    <div>
      <Button>Click me!</Button>
    </div>
  );
}
```

**JSX Tool now has access to both packages!** When you ask JSX Tool to update the Button component, it can find and read `packages/shared/src/components/Button.tsx`.

## Available Scripts

From the monorepo root:

- `npm run dev` - Start app with JSX Tool
- `npm run build` - Build the app
- `npm run start` - Start production server
- `npm run lint` - Lint the app

## Why This Setup is Important

✅ **Access shared code** - JSX Tool can read files across your entire monorepo

✅ **Single source of truth** - Shared components live in one place

✅ **Type safety** - TypeScript references work across packages

✅ **Scalable** - Easy to add more packages to `additionalDirectories`

## Adding More Packages

To give JSX Tool access to additional packages, just add them to `additionalDirectories`:

```json
{
  "additionalDirectories": [
    "../shared",
    "../ui-library",
    "../utils"
  ]
}
```

All paths are relative to `packages/app/` where the config lives.

## Learn More

- [JSX Tool Documentation](https://github.com/jsx-tool/jsx-tool)
- [Next.js Documentation](https://nextjs.org/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Single Package Examples](../next-without-proxy)