require("source-map-support").install()
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
})

const siteMetadata = require("./src/config/Metadata").default;

module.exports = {
  siteMetadata,
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.tsx")
        },
        remarkPlugins: [
          require("remark-math"),
          require("remark-html-katex")
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    //TODO:
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true
      }
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "any",
        langKeyDefault: siteMetadata.languages.defaultLangKey,
        useLangKeyLayout: false,
        prefixDefault: true
      }
    },
    "gatsby-plugin-postcss"
  ]
}
