module.exports = {
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "no-unused-expressions": ["off"]
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        "import/no-extraneous-dependencies": "off"
      },
    },
  ],
};
