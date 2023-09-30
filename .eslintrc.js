/** @type {import("eslint-config-custom")} */
module.exports = {
  root: true,
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  rules: {
    "react/no-children-prop": "off",
    "@next/next/no-img-element": "off",
  },
};
