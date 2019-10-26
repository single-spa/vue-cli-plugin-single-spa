module.exports = (api, options) => {
  options.css.extract = false
  options.filenameHashing = false;

  api.chainWebpack(webpackConfig => {
    webpackConfig
      .devServer
      .headers({
        'Access-Control-Allow-Origin': '*',
      })
      .set('disableHostCheck', true)
    

    webpackConfig.module.rule()
        .test(/\.(gif|png|jpe?g|svg)$/i)
        .use('file-loader')
        .loader('image-webpack-loader')


    webpackConfig.optimization.delete('splitChunks')
    webpackConfig.output.set('chunkFilename','[name].js')

    webpackConfig.output.libraryTarget('umd')

    webpackConfig.set('devtool', 'sourcemap')
  })
  
}