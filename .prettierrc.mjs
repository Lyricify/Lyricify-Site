/** @type {import("prettier").Config} */
export default {
    plugins: ['prettier-plugin-astro'],
    bracketSpacing: false,
    embedLanguageFormatting: 'off',
    editorconfig: true,
    jsxSingleQuote: true,
    trailingComma: 'es5',
    singleQuote: true,
    tabWidth: 4,
    semi: true,
    printWidth: 120,
    "overrides": [
        {
            "files": "*.json",
            "options": {
                "tabWidth": 2,
                singleQuote: false,
            }
        },
        {
            "files": ["*.html", "legacy/**/*.js"],
            "options": {
                "tabWidth": 4
            }
        }
    ]
};
