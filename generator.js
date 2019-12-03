module.exports = api => {
  const isTs = api.entryFile.endsWith('.ts')
  const usesRouter = Boolean(require(api.resolve('package.json')).dependencies['vue-router'])
  const projectName = require(api.resolve('package.json')).name;

  api.render({
    [api.entryFile]: './template/src/main.js',
    './src/set-public-path.js': './template/src/set-public-path.js',
  }, {
    isTs,
    usesRouter,
    appName: projectName,
  });

  api.extendPackage({
    dependencies: {
      'single-spa-vue': '^1.5.2',
      'systemjs-webpack-interop': '^1.1.0',
    }
  })
}
