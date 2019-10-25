import React, { useEffect } from "react";
import { navigate, withPrefix, useStaticQuery, graphql } from "gatsby";
import { FormattedMessage } from "react-intl";
import { getUserLocale } from "../lib";
import messages from "../locale";

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

    return (
        <div>
            <div>
                <strong>Self:</strong>
                <FormattedMessage id="Self" />
            </div>
            <div>{JSON.stringify(messages)}</div>
            <div>{JSON.stringify(site.siteMetadata.languages)}</div>
        </div>
    );
};
