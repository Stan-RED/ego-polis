import React, { useContext } from "react";
import { Link as GatsbyLink } from "gatsby";
import { LayoutContext, LayoutContextProps } from "../lib";

export const Link = (props: any) => {
    const context = useContext<LayoutContextProps>(LayoutContext).pageContext;
    if (context && context.langKey) {
        const { to, href, children, ...rest } = props;
        const language = context.langKey;
        const target = to ? `/${language}${to}` : `/${language}${href}`;
        return (
            <GatsbyLink to={target} {...rest}>
                {children}
            </GatsbyLink>
        );
    } else {
        const { children, ...rest } = props;
        <GatsbyLink {...rest}>{children}</GatsbyLink>;
    }
};
