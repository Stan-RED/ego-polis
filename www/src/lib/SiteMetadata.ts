export type SiteMetadata = {
    title: string,
    description?: string,
    author?: string,
    siteUrl?: string,
    repository?: string,

    i18n?: {
        languages: string[],
        default: string
    }
}
