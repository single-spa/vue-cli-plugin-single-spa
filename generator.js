module.exports = api => {
  const isTs = api.entryFile.endsWith('.ts')
  const usesRouter = Boolean(require(api.resolve('package.json')).dependencies['vue-router'])

  api.render({
    [api.entryFile]: './template/src/main.js'
  }, {
    isTs,
    usesRouter,
  })

  api.extendPackage({
    dependencies: {
      'single-spa-vue': '^1.5.2'
    },
    scripts: {
      "build": "vue-cli-service build --target lib"
    }
  })
}