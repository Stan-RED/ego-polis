const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    plugins: [
        require("tailwindcss"),
        postcssPresetEnv({
            stage: 3,
            features: {
                "nesting-rules": true
            }
        })
    ]
};
