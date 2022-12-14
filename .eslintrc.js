module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["standard", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    semi: ["error", "always", { omitLastInOneLineBlock: true }],
    "no-useless-constructor": "off",
    camelcase: "off",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        endOfLine: "auto",
      },
    ],
  },
};
