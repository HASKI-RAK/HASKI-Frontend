const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production' // Jest will set process.env.NODE_ENV to 'test'
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: 'src/index.tsx',
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'cheap-module-source-map' : 'source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: ['node_modules'],
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
        },
        plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname, "./", "tsconfig.json") })]
    },
    output: { filename: 'index.bundle.js', path: path.resolve(__dirname, 'dist') },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        })
    ],
};