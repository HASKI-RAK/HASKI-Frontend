const path = require('path')
const dotenv = require('dotenv').config({
  path: './.env.development'
})
if (dotenv.error) {
  throw dotenv.error
}
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
