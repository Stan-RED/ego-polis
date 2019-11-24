import React, { useContext } from "react";
import { Link as GatsbyLink } from "gatsby";
import { MeshContext, MeshNode } from "../lib";

export const Link = (props: any) => {
    const context = useContext<MeshNode>(MeshContext);
    if (context && context.language) {
        const { to, href, children, ...rest } = props;
        const language = context.language;
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
