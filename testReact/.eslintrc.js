module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["babel", "react", "prettier", "react-hooks"],
  env: {
    commonjs: true,
    es6: true,
    jest: true
  },
  rules: {
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "import/prefer-default-export": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/forbid-prop-types": "off",
    "no-new": "off"
  }
};
