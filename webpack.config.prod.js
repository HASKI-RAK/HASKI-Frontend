/* 
  This file is used to build the production version of the app.
  @file webpack.config.prod.js
  @see https://webpack.js.org/configuration/
*/
module.exports = {
  mode: 'production',
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
