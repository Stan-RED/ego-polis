const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/
});

const config = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

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

module.exports = withMDX(config);
