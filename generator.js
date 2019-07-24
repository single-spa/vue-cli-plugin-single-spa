module.exports = api => {
  const isTs = api.entryFile.endsWith('.ts')

  api.render({
    [api.entryFile]: './template/src/main.js'
  }, {
    isTs,
  })

  api.extendPackage({
    dependencies: {
      'single-spa-vue': '^1.5.2'
    }
  })
}