
module.exports = api => {
  const isTs = api.entryFile.endsWith('.ts')
  const usesRouter = Boolean(require(api.resolve('package.json')).dependencies['vue-router'])

  api.render({
    [api.entryFile]: './template/src/main.js'
  }, {
    isTs,
    usesRouter
  })

  api.extendPackage({
    scripts:{
      'serve:single-spa':'vue-cli-service serve --mode production'
    },
    dependencies: {
      'single-spa-vue': '^1.5.2',
    },
    devDependencies:{
      'image-webpack-loader':'^6.0.0'
    }
  })
}