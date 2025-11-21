// import globals from "globals";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);

// eslint.config.js
import globals from "globals";
import { defineConfig } from "eslint/config";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Run Prettier as an ESLint rule and show formatting issues as lint errors
      "prettier/prettier": "error",
    },
    // Extend Prettier config so ESLint and Prettier don’t clash
    extends: [configPrettier],
  },
]);
