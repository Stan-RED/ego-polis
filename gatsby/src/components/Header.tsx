import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GitHub } from "../components/icons";

const Header = () => {
    const { title, repository } = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                    repository
                }
            }
        }
    `).site.siteMetadata;

    return (
        <header className="border-black border-solid border-b-2 bg-gray-200">
            <div className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-6">
                <div className="flex items-center">
                    <Link to="/">
                        <a className="font-bold text-xl">{title}</a>
                    </Link>
                </div>
                <div>
                    <a href={repository} className="font-bold">
                        <GitHub />
                    </a>
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    siteTitle: ``
};

export default Header;
