module.exports = {
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            "/": { page: "/index", query: { test: "Stan" } },
            "/about": { page: "/index", query: { test: "world" } }
        }
    },
}
