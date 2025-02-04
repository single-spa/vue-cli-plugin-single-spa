const SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");

function lessThanWebpack5() {
  const semver = require("semver");
  const webpack = require(
    require.resolve("webpack", {
      paths: [require.resolve("@vue/cli-service")],
    }),
  );
  return semver.satisfies(webpack.version, "<5");
}

module.exports = (api, options) => {
  options.css.extract = false;

  const outputSystemJS =
    options?.pluginOptions?.["single-spa"].outputSystemJS === true;

  const packageJsonPath = api.resolve("package.json");
  const { name } = require(packageJsonPath);
  if (!name) {
    throw Error(
      `vue-cli-plugin-single-spa: could not determine package name -- change your package json name field`,
    );
  }

  api.chainWebpack((webpackConfig) => {
    webpackConfig.optimization.delete("splitChunks");

    // Terser error occurs when libraryTarget is set to "system" rather than "umd"
    webpackConfig.output.libraryTarget(outputSystemJS ? "umd" : "module");
    webpackConfig.set("experiments", { outputModule: true });
    // webpack doesn't yet support HMR for native modules
    webpackConfig.devServer.hot(false);
    webpackConfig.target("web");

    webpackConfig.output.devtoolNamespace(name);

    webpackConfig.set("devtool", "source-map");

    if (outputSystemJS) {
      webpackConfig
        .plugin("SystemJSPublicPathWebpackPlugin")
        .use(SystemJSPublicPathWebpackPlugin, [
          {
            rootDirectoryLevel: 2,
            systemjsModuleName: name,
          },
        ]);
    }

    webpackConfig
      .plugin("StandaloneSingleSpaPlugin")
      .use(StandaloneSingleSpaPlugin, [
        {
          appOrParcelName: name,
          disabled: process.env.STANDALONE_SINGLE_SPA !== "true",
        },
      ]);

    if (lessThanWebpack5()) {
      webpackConfig.output.set("jsonpFunction", `webpackJsonp__${name}`);

      webpackConfig.devServer
        .headers({
          "Access-Control-Allow-Origin": "*",
        })
        .set("disableHostCheck", true);
    } else {
      webpackConfig.devServer
        .headers({
          "Access-Control-Allow-Origin": "*",
        })
        .set("allowedHosts", "all");
    }

    webpackConfig.externals(["single-spa"]);
  });
};
