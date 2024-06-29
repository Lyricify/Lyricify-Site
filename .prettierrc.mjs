// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
        {
            files: '*.mdx',
            options: {
                embeddedLanguageFormatting: 'off',
            },
        },
    ],
    trailingComma: 'es5',
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: true,
    bracketSpacing: false,
    bracketSameLine: false,
    arrowParens: 'always',
    htmlWhitespaceSensitivity: 'ignore',
    vueIndentScriptAndStyle: true,
    endOfLine: 'lf',
};

export default config;