const fs = require("fs").promises;
const babel = require("@babel/core");

const configMDX = {
    extension: /\.mdx?$/
};
const withMDX = require("@next/mdx")(configMDX);
const mdx = require("@mdx-js/mdx");

const config = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        const path = `${dir}/pages/index.mdx`;
        const content = await fs.readFile(path);
        const transpile = async () => {
            const jsx = await mdx(content);
            return jsx;
        }
        await transpile().then(async js => {
            const transformed = babel.transform(js, {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ]
            });

            (function (exports) {
                eval(transformed.code);
                console.log(exports.meta);
            })({});
        });

        return {
            "/": { page: "/index", query: { test: "Stan" } },
            "/about": { page: "/index", query: { test: "world" } }
        }
    },
}

module.exports = withMDX(config);
