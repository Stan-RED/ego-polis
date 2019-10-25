import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Redirect } from "@reach/router";
import { getUserLanguage } from "../lib";

export const LocalizationNavigator = () => {
    const { site } = useStaticQuery(graphql`
        query SITE_LANGUAGES_QUERY {
            site {
                siteMetadata {
                    title
                    description
                    repository
                }
            }
        }
    `);

    return <Redirect to={`/${getUserLanguage().language}/`} />;
};
