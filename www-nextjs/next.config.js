const images = require(`remark-images`);
const emoji = require(`remark-emoji`);
const math = require(`remark-math`);
const katex = require(`rehype-katex`);
const mdx = require(`@next/mdx`)({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [images, emoji, math],
        rehypePlugins: [katex]
    }
});

const nextConfig = {
    distDir: `.build`,

    pageExtensions: [`js`, `jsx`, `ts`, `tsx`, `md`, `mdx`],

    webpack(config, { isServer }) {
        return config;
    }
};

module.exports = [nextConfig, mdx]
    .reduce((config, plugin) => plugin(config))
