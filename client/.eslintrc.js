{
  "extends": ["airbnb", "react-app", "prettier"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "rules": {
    "jsx-quotes": [1, "prefer-double"],
    "react/prop-types": "off",
    "no-underscore-dangle": "off",
    "react/destructuring-assignment": "off"
  },
  "plugins": ["prettier"]
}
