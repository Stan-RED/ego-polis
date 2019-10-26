import { SiteMetadata } from "../lib/SiteMetadata";
import messages from "../locale";

const Metadata: SiteMetadata = {
    title: "Egopolis",
    description: "TODO:",
    author: "TODO:@StanEgo",
    repository: "https://github.com/StanEgo/ego-polis",

    languages: {
        langs: Object.keys(messages),
        defaultLangKey: "en"
    }
}

export default Metadata;
