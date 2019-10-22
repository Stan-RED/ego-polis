import { createContext } from "react";
import { Frontmatter } from "./Frontmatter";

export const LayoutContext = createContext({});
export type LayoutContextProps = {
    path: string;
    location: any; //TODO:There should be a type

    pageContext: {
        frontmatter: Frontmatter;
        langKey?: string;
    };
}
