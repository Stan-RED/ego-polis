import React, { useContext } from "react";
import { Link as GatsbyLink } from "gatsby";
import { LayoutContext, LayoutContextProps } from "../lib";

export const Link = (props: any) => {
    const context = useContext<LayoutContextProps>(LayoutContext);
    const { to, href, children, ...rest } = props;
    const language = context.pageContext.langKey;
    const target = to ? `/${language}${to}` : `/${language}${href}`;
    return (
        <GatsbyLink to={target} {...rest}>
            {children}
        </GatsbyLink>
    );
};
