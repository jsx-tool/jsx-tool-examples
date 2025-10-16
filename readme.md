# JSX Tool Examples

Complete examples showing how to integrate JSX Tool with different frameworks and project structures.

## Examples

### Vite-Based Projects (Easiest Setup)

If you're using **Vite**, setup is simple - just add the JSX Tool Vite plugin:

- **[react-router-with-vite](./react-router-with-vite)** - Single package with Vite plugin
- **[vite-monorepo](./vite-monorepo)** - Monorepo with shared packages using Vite plugin

### Non-Vite Projects (Manual Setup)

If you're **not using Vite** (Next.js, Create React App, or any other framework), you'll need to manually start the JSX Tool dev server and inject scripts. These examples use Next.js but **the patterns apply to any non-Vite project**:

- **[next-without-proxy](./next-without-proxy)** - ⭐ **Recommended** - Manual installation
- **[next-with-proxy](./next-with-proxy)** - Proxy-based setup (can cause redirect issues)
- **[next-monorepo](./next-monorepo)** - Monorepo with shared packages using manual setup

## Quick Decision Guide

**Using Vite?** → Use the Vite plugin examples (automatic setup)

**Not using Vite?** → Follow the Next.js examples (manual setup applies to any framework)

**Have a monorepo?** → See `vite-monorepo` or `next-monorepo` for `additionalDirectories` configuration

## Learn More

- [JSX Tool Documentation](https://github.com/jsx-tool/jsx-tool)
- Each example has its own detailed README with setup instructions