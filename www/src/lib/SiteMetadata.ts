import { graphql, useStaticQuery } from "gatsby";

export type SiteMetadata = {
    title: string,
    description?: string,
    author?: string,
    siteUrl?: string,
    repository?: string,

    languages: {
        langs: string[],
        defaultLangKey: string
    }
}

export const useSiteMetadata = () => {
    const { site } = useStaticQuery(graphql`
        query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            repository
          }
        }
      }
    `);

    return site.siteMetadata;
};
