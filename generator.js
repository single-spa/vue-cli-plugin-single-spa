const semver = require("semver");

module.exports = (api) => {
  const isTs = api.entryFile.endsWith(".ts");
  const packageJsonPath = api.resolve("package.json")
  const { dependencies, name } = require(packageJsonPath);
  if (!dependencies) {
    throw Error(`Could not find any dependencies declared in ${packageJsonPath}.`);
  }
  const usesRouter = Boolean(dependencies && dependencies["vue-router"]);
  const appName = name || "appName";
  const vueVersion = dependencies.vue;
  if (!vueVersion) {
    throw Error(`Could not find vue dependency in package.json`);
  }
  const minVueVersion = semver.minVersion(vueVersion);
  const isVue2 = semver.satisfies(minVueVersion, "<3");

  api.render(
    {
      [api.entryFile]: `./template/src/main-vue-${isVue2 ? "2" : "3"}.js`,
      "./src/set-public-path.js": "./template/src/set-public-path.js",
    },
    {
      isTs,
      usesRouter,
      appName,
    }
  );

  api.extendPackage({
    dependencies: {
      "single-spa-vue": "^1.9.0",
      "systemjs-webpack-interop": "^2.1.2",
    },
  });
};
