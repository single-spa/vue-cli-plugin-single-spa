# Contributing

If you'd like to report an issue, please create a Github issue. To propose a code change, please submit a Github pull request.

This project is a Vue CLI plugin. Vue provides [this development guide](https://cli.vuejs.org/dev-guide/plugin-dev.html) that explains how to develop a Vue CLI plugin.

## Local development

See [this guide](https://cli.vuejs.org/dev-guide/plugin-dev.html#installing-plugin-locally).

_Make sure to test both Vue 2 and Vue 3, with separate test-apps!_

Manually:

```
vue create test-app
cd test-app
yarn add --dev file:../vue-cli-plugin-single-spa
vue invoke single-spa
```

Automatically:

```
pnpm run test
```

You can also run the tests separately for Vue2 and Vue3

```
pnpm run test:vue2
pnpm run test:vue3
```
