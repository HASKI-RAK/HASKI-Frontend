/* 
  This file is used to build the production version of the app.
  @file webpack.config.prod.js
  @see https://webpack.js.org/configuration/
*/
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { DefinePlugin } = require('webpack')

const dotenv = require('dotenv').config({
  path: './.env.production'
})
if (dotenv.error) {
  throw dotenv.error
}
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: 'src/index.tsx',
  mode: 'production',
  devtool: false,
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: ['node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, './', 'tsconfig.json')
      })
    ]
  },
  target: 'web',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    }),
    new CompressionPlugin()
  ]
}
