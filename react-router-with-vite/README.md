# React Router with Vite and JSX Tool

This example demonstrates how to use JSX Tool with React Router 7 and Vite. JSX Tool integrates seamlessly through a Vite plugin, making setup incredibly simple.

## How It Works

JSX Tool provides a Vite plugin (`jsxToolDevServer`) that automatically:
- Starts the WebSocket server for file-system communication
- Injects the necessary scripts into your HTML during development
- Handles all configuration automatically

No manual script injection or proxy setup required!

## Configuration

The only setup needed is adding the JSX Tool Vite plugin to your `vite.config.ts`:

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
    jsxToolDevServer()  // That's it!
  ],
});
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

That's all! The JSX Tool Vite plugin automatically:
1. Starts the WebSocket server
2. Injects the necessary scripts
3. Handles all communication with your file system

### Access Your Application

Visit `http://localhost:5173` (or whatever port Vite assigns)

## Available Scripts

- `npm run dev` - Start the development server with JSX Tool
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Why This is the Easiest Setup

✅ **Zero configuration** - Just add one line to your Vite config

✅ **No manual injection** - Plugin handles everything automatically

✅ **No proxy needed** - Direct integration with Vite's dev server

✅ **Works out of the box** - No ports to configure, no scripts to add

## Comparison with Other Setups

| Feature | Vite Plugin | Next.js Manual | Next.js Proxy |
|---------|-------------|----------------|---------------|
| Setup complexity | ✅ Simplest | Moderate | Simple |
| Configuration needed | One line | Script injection | Proxy config |
| Port management | ✅ Automatic | Manual | Manual |
| Framework support | Vite-based | Next.js only | Next.js only |

## Tech Stack

- **React Router 7.9.2** - Modern routing for React
- **Vite 7.1.7** - Fast build tool and dev server
- **React 19** - Latest React version
- **TypeScript 5.9.2** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **JSX Tool** - React component development assistance

## Project Structure

```
react-router-with-vite/
├── app/                      # Application code
│   ├── root.tsx             # Root component
│   ├── routes/              # Route components
│   │   └── home.tsx
│   ├── routes.ts            # Route configuration
│   ├── app.css              # Global styles
│   └── welcome/             # Welcome screen components
├── public/                  # Static assets
├── .jsxtool/               # JSX Tool configuration (optional)
│   └── rules.md            # Custom rules
├── vite.config.ts          # Vite configuration with JSX Tool plugin
├── react-router.config.ts  # React Router configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Optional Configuration

While the Vite plugin works out of the box, you can optionally customize behavior with a `.jsxtool/` directory:

```
.jsxtool/
└── rules.md    # Custom prompting rules for JSX Tool
```

## Learn More

- [JSX Tool Documentation](https://github.com/jsx-tool/jsx-tool)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vite.dev)
- [Next.js Examples](../next-without-proxy) - Alternative framework setup