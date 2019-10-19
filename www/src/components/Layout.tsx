import React, { ReactNode } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { DraftAlert } from "../components/DraftAlert";
import { GitHub } from "../components/icons";

import "../styles/index.css";

const Layout = ({ children }: { children: ReactNode }) => {
    const data = useStaticQuery(graphql`
        query PageInfoQuery {
            site {
                siteMetadata {
                    title
                    repository
                }
            }
            mdx {
                id
                frontmatter {
                    title
                    status
                }
            }
        }
    `);

    const { title, status } = data.mdx.frontmatter;

    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-black border-solid border-b-2 bg-gray-200">
                <div className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-6">
                    <div className="flex items-center">
                        <Link to="/">
                            <a className="font-bold text-xl">{data.site.siteMetadata.title}</a>
                        </Link>
                    </div>
                    <div>
                        <a href={data.site.siteMetadata.repository} className="font-bold">
                            <GitHub />
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto p-4 md:px-8 md:py-16 w-full">
                {status === null || (status === "draft" && <DraftAlert />)}

                <h1>{title}</h1>

                {children}
            </main>
        </div>
    );
};

export default Layout;
