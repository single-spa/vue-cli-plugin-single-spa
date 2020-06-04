module.exports = api => {
  const isTs = api.entryFile.endsWith('.ts')
  const packageJson = require(api.resolve('package.json'));
  const usesRouter = Boolean(packageJson.dependencies && packageJson.dependencies['vue-router']);

  api.render({
    [api.entryFile]: './template/src/main.js',
    './src/set-public-path.js': './template/src/set-public-path.js',
  }, {
    isTs,
    usesRouter,
    appName: packageJson.name || 'appName',
  });

  api.extendPackage({
    dependencies: {
      'single-spa-vue': '^1.5.2',
      'systemjs-webpack-interop': '^1.1.0',
    }
  })
}
