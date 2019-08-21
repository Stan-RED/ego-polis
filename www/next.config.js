const withPlugins = require('next-compose-plugins');

const images = require("remark-images")
const emoji = require("remark-emoji")
const math = require("remark-math")
const katex = require("rehype-katex")

const withMDX = require("@next/mdx")({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: [ images, emoji, math ],
		rehypePlugins: [ katex ]
	}
})

const withCSS = require("@zeit/next-css")

module.exports = withPlugins([
	[ withCSS, {
		// This settings required to import CSS files from packages.
		// For example: import "katex/dist/katex.css"
		cssLoaderOptions: {
			url: false
		}
	}],

	[ withMDX, {
		pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
	}]
])
