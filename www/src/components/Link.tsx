import React, { useContext } from "react";
import { Link as GatsbyLink } from "gatsby";
import { LayoutContext, LayoutContextProps } from "../lib";

export const Link = (props: any) => {
    const context = useContext<LayoutContextProps>(LayoutContext);
    const { to, children, ...rest } = props;
    const target = `/${context.pageContext.langKey}${to}`;
    return (
        <GatsbyLink to={target} {...rest}>
            {children} -> {target}
        </GatsbyLink>
    );
};
