import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import babelParser from "@babel/eslint-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["template/src", "tests/fixtures"],
  },
  ...compat.extends("important-stuff"),
  {
    languageOptions: {
      parser: babelParser,
      globals: {
        process: true,
      },
    },
  },
];
