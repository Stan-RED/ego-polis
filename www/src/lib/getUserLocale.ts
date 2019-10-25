import { withPrefix } from "gatsby";

export type UserLocaleDetails = {
    name: string;
    language: string;
};

export const getUserLocale = (): UserLocaleDetails | undefined => {
    if (typeof window === "undefined") {
        return undefined;
    }

    const browser: any = window.navigator;
    const locale: string =
        (browser.languages && browser.languages[0]) ||
        browser.language ||
        browser.browserLanguage ||
        browser.userLanguage ||
        browser.systemLanguage ||
        undefined;

    if (locale) {
        const parts = locale.split("-");

        return {
            language: parts[0],
            name: locale
        };
    }
};
