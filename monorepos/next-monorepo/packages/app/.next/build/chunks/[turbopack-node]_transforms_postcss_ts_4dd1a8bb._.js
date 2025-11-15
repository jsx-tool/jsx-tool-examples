module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/dev/jsx-tool-examples/next-monorepo/packages/app/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/0af62_0bbcc6fe._.js",
  "build/chunks/[root-of-the-server]__eb3fd3d7._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/dev/jsx-tool-examples/next-monorepo/packages/app/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];