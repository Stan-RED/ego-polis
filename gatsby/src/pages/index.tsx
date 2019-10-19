import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <ul>
            <li>
                <Link to="/ego">Философия EGO</Link>
            </li>
            <li>
                <Link to="/academy">Academy</Link>
            </li>
            <li>
                <Link to="/academy">Academy</Link>
            </li>
        </ul>
    </Layout>
);

export default IndexPage;
