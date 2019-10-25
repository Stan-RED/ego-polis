import React, { useEffect } from "react";
import { navigate, withPrefix, useStaticQuery, graphql, Link } from "gatsby";
import { getUserLocale } from "../lib";
import messages from "../locale";

export type LocalizationNavigatorProps = {
    redirect: boolean;
    children: never;
};

export const LocalizationNavigator = ({ redirect }: LocalizationNavigatorProps) => {
    if (redirect) {
        // TODO:Try to get from local storage/cookie.
        const locale = getUserLocale();

        if (locale) {
            const target = withPrefix(`/${locale.language}/`);
            useEffect(() => {
                navigate(target);
            }, []);
        }
    }

    return (
        <ul>
            {Object.keys(messages).map(key => (
                <li key={key}>
                    <Link to={withPrefix(`/${key}/`)}>{messages[key].Self}</Link>
                </li>
            ))}
        </ul>
    );
};
