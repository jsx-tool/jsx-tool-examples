# Vite Monorepo with JSX Tool

This example demonstrates how to use JSX Tool in a Vite/React Router monorepo setup with shared packages. The Vite plugin makes this incredibly simple - just pass `additionalDirectories` to access multiple packages.

## Monorepo Structure

```
vite-monorepo/
├── package.json              # Root workspace configuration
├── packages/
│   ├── app/                  # React Router application
│   │   ├── .jsxtool/        # Optional JSX Tool config
│   │   │   └── rules.md
│   │   ├── app/
│   │   ├── package.json     # App package.json (important!)
│   │   ├── vite.config.ts   # JSX Tool config goes here
│   │   └── ...
│   └── shared/              # Shared components/utilities
│       ├── src/
│       │   ├── components/
│       │   │   └── Button.tsx
│       │   └── index.ts
│       └── package.json
```

## Key Configuration: Additional Directories in Vite

The Vite plugin accepts an `additionalDirectories` option to give JSX Tool access to other packages in your monorepo.

### Configuration Location

**Critical:** The `vite.config.ts` must be in the **same directory as your app's `package.json`**. The `additionalDirectories` paths are **relative to this location**.

```
packages/app/vite.config.ts    ✅ Correct (next to package.json)
packages/app/package.json      ✅ Same directory
vite.config.ts                 ❌ Wrong (at monorepo root)
```

### Vite Plugin Configuration

In `packages/app/vite.config.ts`:

```typescript
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { jsxToolDevServer } from "@jsx-tool/jsx-tool/vite";

export default defineConfig({
  plugins: [
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(), 
    jsxToolDevServer({
      additionalDirectories: ['../shared']  // Relative to vite.config.ts!
    })
  ],
});
```

**Important:** The path `../shared` works because:
- `vite.config.ts` is in `packages/app/`
- You want to access `packages/shared/`
- So you go up one level (`../`) then into `shared`

```
packages/app/vite.config.ts   (you are here)
    └── additionalDirectories: ['../shared']  (goes up to packages/, then into shared/)
```

If your `vite.config.ts` is not in the same directory as `package.json`, the relative paths will be wrong and it won't work!

## Package Configuration

### Root `package.json`

```json
{
  "name": "vite-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=app",
    "build": "npm run build --workspace=app",
    "start": "npm run start --workspace=app"
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
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "start": "react-router-serve ./build/server/index.js"
  },
  "dependencies": {
    "@jsx-tool/jsx-tool": "^0.0.13",
    "@react-router/node": "^7.9.2",
    "@react-router/serve": "^7.9.2",
    "isbot": "^5.1.31",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router": "^7.9.2",
    "shared": "*"
  },
  "devDependencies": {
    "@react-router/dev": "^7.9.2",
    "@tailwindcss/vite": "^4.1.13",
    "@types/node": "^22",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "tailwindcss": "^4.1.13",
    "typescript": "^5.9.2",
    "vite": "^7.1.7",
    "vite-tsconfig-paths": "^5.1.4"
  }
}
```

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
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  }
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

This starts the React Router dev server with JSX Tool automatically:
1. Vite plugin starts the JSX Tool WebSocket server
2. Scripts are automatically injected into your HTML
3. JSX Tool has access to both `packages/app/` and `packages/shared/`

### Access Your Application

Visit `http://localhost:5173` (or whatever port Vite assigns)

## Using Shared Components

With the monorepo setup, you can use shared components in your app:

```tsx
// In packages/app/app/routes/home.tsx
import { Button } from 'shared';

export default function Home() {
  return (
    <div>
      <Button>Click me!</Button>
    </div>
  );
}
```

**JSX Tool now has access to both packages!** When you ask JSX Tool about the Button component, it can read `packages/shared/src/components/Button.tsx`.

## Available Scripts

From the monorepo root:

- `npm run dev` - Start app with JSX Tool
- `npm run build` - Build the app
- `npm run start` - Start production server

## Why Vite Makes This Easy

✅ **Zero manual setup** - No script injection needed

✅ **Simple configuration** - Just one option in the plugin

✅ **No proxy needed** - Direct integration with Vite

✅ **Automatic everything** - WebSocket server, script injection, all handled

## Adding More Packages

To give JSX Tool access to additional packages, just add them to the array:

```typescript
jsxToolDevServer({
  additionalDirectories: [
    '../shared',
    '../ui-library',
    '../utils'
  ]
})
```

All paths are relative to where `vite.config.ts` lives (next to `package.json` in `packages/app/`).

## Optional: Custom Rules

You can add custom prompting rules in `.jsxtool/rules.md`:

```
packages/app/.jsxtool/rules.md
```

This is optional - the Vite plugin works without it.

## Learn More

- [JSX Tool Documentation](https://github.com/jsx-tool/jsx-tool)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vite.dev)
- [Next.js Monorepo Example](../next-monorepo)