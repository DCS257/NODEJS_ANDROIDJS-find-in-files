// https://eslint.org/docs/user-guide/configuring

module.exports = {
    parserOptions: {
      'sourceType': 'module'
    },
    extends: [
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      'standard',
      'plugin:vue/recommended',
      'plugin:css-modules/recommended'
    ],
    // add your custom rules here
    rules: {
      "indent": ["error", 4],
      "no-tabs": 0,
      "no-trailing-spaces": [2, { "skipBlankLines": true }],
      "padded-blocks": ["error", { "switches": "never" }],
    },
    env: {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jquery": true
    },    
    plugins: [
      "eslint-plugin-vue",
      "css-modules",
      "html"
    ]
  }
  