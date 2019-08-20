const images = require("remark-images")
const emoji = require("remark-emoji")
const math = require("remark-math")

const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [ images, emoji, math ]
    }
})

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
})
