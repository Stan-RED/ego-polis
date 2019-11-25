import { createContext } from "react";

export type MeshNode = {
    title: string,
    language: string,
    created: Date,
    updated: Date,
    slug?: string,
    status?: "draft" | "public",
    component?: string
}

export const MeshContext = createContext<MeshNode>({
    title: "",
    language: "en",
    created: new Date(),
    updated: new Date()
});
