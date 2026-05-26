/* eslint-disable @typescript-eslint/no-require-imports */
// eslint.config.cjs
const { defineConfig, globalIgnores } = require("eslint/config");
const globals = require("globals");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");
const { fixupPluginRules } = require("@eslint/compat");

module.exports = defineConfig([
    // 1. Global Ignores
    globalIgnores(["**/dist", "**/.eslintrc.cjs", "cypress/downloads", "cypress/screenshots", "cypress/videos"]),

    // 2. Base JS Recommended configs
    js.configs.recommended,

    // 3. TypeScript Recommended configs
    ...tseslint.configs.recommended,

    // 4. Target Configuration for Node files
    {
        files: ["**/*.cjs"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
        },
    },

    // 5. Target Configuration for Frontend App code
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            "react-hooks": fixupPluginRules(reactHooks),
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": "off",
        },
    }
]);