// TODO:
module.exports = {
    locales: {
        "/": {
            lang: "en-US",
            title: "Egopolis",
            description: "TODO:"
        },
        "/ru/": {
            lang: "ru-RU",
            title: "Egopolis",
            description: "TODO:"
        }
    },
    themeConfig: {
        locales: {
            "/": {
                selectText: "Languages",
                label: "English",
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {}
            },
            "/ru/": {
                selectText: "Язык",
                label: "Русский",
                serviceWorker: {
                    updatePopup: {
                        message: "Доступны новые материалы.",
                        buttonText: "Обновить"
                    }
                },
                algolia: {}
            }
        }
    }
}