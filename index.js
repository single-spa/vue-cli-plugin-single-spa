module.exports = (api, options) => {
  options.css.extract = false

  api.chainWebpack(webpackConfig => {
    webpackConfig
      .devServer
      .headers({
        'Access-Control-Allow-Origin': '*',
      })
      .set('disableHostCheck', true)
    
    webpackConfig.optimization.delete('splitChunks')

    webpackConfig.output.libraryTarget('umd')

    webpackConfig.set('devtool', 'sourcemap')
  })
}