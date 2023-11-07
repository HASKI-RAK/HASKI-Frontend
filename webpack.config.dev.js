const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'public')
    }
  }
}
