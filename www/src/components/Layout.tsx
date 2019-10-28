import React, { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import { IntlProvider } from "react-intl";
import Helmet from "react-helmet";
import { DraftAlert } from "../components/DraftAlert";
import { GitHub } from "../components/icons";
import { Link } from "../components";
import { useSiteMetadata, LayoutContext, LayoutContextProps } from "../lib";
import i18messages from "../locale";

import "../styles/index.css";

type LayoutProps = LayoutContextProps & {
    children: ReactNode;
};

const mdxComponents = {
    a: Link
};

const Layout = (props: LayoutProps) => {
    const site = useSiteMetadata();
    const meta = props.pageContext && props.pageContext.frontmatter;
    const lang = props.pageContext && props.pageContext.langKey;

    return (
        <LayoutContext.Provider value={props}>
            <IntlProvider locale={lang} messages={i18messages[lang]}>
                <MDXProvider components={mdxComponents}>
                    <Helmet
                        htmlAttributes={{
                            lang
                        }}
                        title={meta && meta.title}
                        titleTemplate={`%s | ${site.title}`}
                        meta={
                            [
                                // {
                                //     name: `description`,
                                //     content: meta && meta.description
                                // },
                                // {
                                //     property: `og:title`,
                                //     content: title
                                // },
                                // {
                                //     property: `og:description`,
                                //     content: metaDescription
                                // },
                                // {
                                //     property: `og:type`,
                                //     content: `website`
                                // },
                                // {
                                //     name: `twitter:card`,
                                //     content: `summary`
                                // },
                                // {
                                //     name: `twitter:creator`,
                                //     content: site.siteMetadata.author
                                // },
                                // {
                                //     name: `twitter:title`,
                                //     content: title
                                // },
                                // {
                                //     name: `twitter:description`,
                                //     content: metaDescription
                                // }
                            ]
                        }
                    />

                    <div className="flex flex-col min-h-screen">
                        <header className="border-black border-solid border-b-2 bg-gray-200">
                            <div className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-6">
                                <div className="flex items-center">
                                    <Link to="/" className="font-bold text-xl">
                                        {site.title}
                                    </Link>
                                </div>
                                <div>
                                    <a href={site.repository} className="font-bold">
                                        <GitHub />
                                    </a>
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 max-w-4xl mx-auto p-4 md:px-8 md:py-16 w-full">
                            {meta && <h1>{meta.title}</h1>}

                            {meta && (meta.status === null || meta.status === "draft") && (
                                <DraftAlert />
                            )}

                            {props.children}
                        </main>
                    </div>
                </MDXProvider>
            </IntlProvider>
        </LayoutContext.Provider>
    );
};

export default Layout;
