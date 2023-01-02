module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "comma-dangle": "off",
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "no-confusing-arrow": "off",
    "object-curly-newline": "off",
  },
};
