module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["babel", "react", "prettier", "react-hooks"],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
    mocha: true
  },
  rules: {
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "import/prefer-default-export": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-new": "off"
  }
};
