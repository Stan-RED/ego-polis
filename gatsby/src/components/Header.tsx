import React from "react";
import { Link } from "gatsby";
import { GitHub } from "../components/icons";

type HeaderProps = { siteTitle: string };

const Header = ({ siteTitle }: HeaderProps) => (
    <header className="border-black border-solid border-b-2 bg-gray-200">
        <div className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex items-center">
                <Link to="/">
                    <a className="font-bold text-xl">{siteTitle}</a>
                </Link>
            </div>
            <div>
                <a href="https://github.com/StanEgo/ego-polis" className="font-bold">
                    <GitHub />
                </a>
            </div>
        </div>
    </header>
);

Header.defaultProps = {
    siteTitle: ``
};

export default Header;
