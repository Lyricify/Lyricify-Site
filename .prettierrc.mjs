/** @type {import("prettier").Config} */
export default {
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
                bracketSpacing: false,
            },
        },
    ],
    bracketSpacing: false,
    embeddedLanguageFormatting: 'off',
    editorconfig: true,
    jsxSingleQuote: true,
    trailingComma: 'es5',
    singleQuote: true,
    tabWidth: 4,
    semi: true,
    printWidth: 120,
};
