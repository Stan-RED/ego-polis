import React, { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import { IntlProvider } from "react-intl";
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
    const meta = props.pageContext.frontmatter;
    const language = props.pageContext.langKey;

    return (
        <LayoutContext.Provider value={props}>
            <IntlProvider locale={language} messages={i18messages[language]}>
                <MDXProvider components={mdxComponents}>
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
                            {meta && (meta.status === null || meta.status === "draft") && (
                                <DraftAlert />
                            )}
                            {meta && <h1>{meta.title}</h1>}
                            {props.children}
                        </main>
                    </div>
                </MDXProvider>
            </IntlProvider>
        </LayoutContext.Provider>
    );
};

export default Layout;
