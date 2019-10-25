import React, { useEffect } from "react";
import { navigate, withPrefix, useStaticQuery, graphql } from "gatsby";
import { getUserLocale } from "../lib";

export type LocalizationNavigatorProps = {
    redirect: boolean;
    children: never;
};

export const LocalizationNavigator = ({ redirect }: LocalizationNavigatorProps) => {
    if (redirect) {
        const locale = getUserLocale();

        if (locale) {
            const target = withPrefix(`/${locale.language}/`);
            useEffect(() => {
                navigate(target);
            }, []);
        }
    }

    const { site } = useStaticQuery(graphql`
        query SITE_LANGUAGES_QUERY {
            site {
                siteMetadata {
                    languages {
                        langs
                    }
                }
            }
        }
    `);

    return <div>{JSON.stringify(site.siteMetadata.languages)}</div>;
};
