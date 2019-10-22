import React, { ReactNode } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { DraftAlert } from "../components/DraftAlert";
import { GitHub } from "../components/icons";
import { SiteMetadata } from "../lib/SiteMetadata";

import "../styles/index.css";

type Frontmatter = {
    title: string;
    created?: Date;
    status?: "draft" | "public";
};

type LayoutProps = {
    children: ReactNode;

    path: string;
    location: any; //TODO:There should be a type

    pageContext: {
        frontmatter: Frontmatter;
        langKey?: string;
    };
};

const Layout = ({ children, pageContext }: LayoutProps) => {
    const data = useStaticQuery(graphql`
        query PageInfoQuery {
            site {
                siteMetadata {
                    title
                    repository
                }
            }
        }
    `);

    const page = pageContext.frontmatter;
    const site: SiteMetadata = data.site.siteMetadata;

    return (
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
                {status === null || (status === "draft" && <DraftAlert />)}

                <h1>{page.title}</h1>

                {children}
            </main>
        </div>
    );
};

export default Layout;
