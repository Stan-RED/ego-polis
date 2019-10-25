export type UserLanguageDetails = {
    locale: string,
    language: string
}

export const getUserLanguage = (): UserLanguageDetails | undefined => {
    if (typeof window === "undefined") {
        return undefined
    }

    const browser: any = window.navigator;
    const locale: string = (browser.languages && browser.languages[0]) ||
        browser.language ||
        browser.browserLanguage ||
        browser.userLanguage ||
        browser.systemLanguage ||
        undefined
        ;

    if (locale) {
        const parts = locale.split("-");

        return {
            language: parts[0],
            locale
        }
    }
}