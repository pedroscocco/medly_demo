// https://docs.expo.dev/guides/using-eslint/
const eslintConfigPrettier = require("eslint-config-prettier/flat");
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier,
  {
    ignores: ["dist/*"],
    rules: {
      'no-unused-expressions': ['error', { allowTernary: true }],
    }
  },
]);
