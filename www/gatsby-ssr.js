/**
 * @see https://github.com/gatsbyjs/gatsby/issues/1526#issuecomment-433347822
 * @see https://www.gatsbyjs.org/docs/api-files-gatsby-ssr/
 * @see https://www.gatsbyjs.org/docs/ssr-apis/
 *
 * @option https://www.gatsbyjs.org/docs/static-folder/ with own postcss prebuild
 * @dig https://github.com/gatsbyjs/gatsby/issues/2289#issuecomment-517276598
 * @rejected https://www.gatsbyjs.org/docs/custom-html/
 *
 * TODO: ? https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/#help-purgecss-breaks-my-site
 */

// Replacing inline css/scss with links to reduce *.html file size
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
    if (process.env.NODE_ENV !== "production") {
        return;
    }

    getHeadComponents().forEach(component => {
        if (component.type === "style") {
            component.type = "link";
            component.props["href"] = component.props["data-href"];
            component.props["rel"] = "stylesheet";
            component.props["type"] = "text/css";

            delete component.props["data-href"];
            delete component.props["dangerouslySetInnerHTML"];
        }

        delete component.props["data-react-helmet"];
    });
};
