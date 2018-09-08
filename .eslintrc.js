module.exports = {
    "extends": "airbnb-base",
    "env": {
      "browser": true,
    },
    "globals": {
      "components": true
    },
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": "webpack.dev.js"
        }
      }
    }
};