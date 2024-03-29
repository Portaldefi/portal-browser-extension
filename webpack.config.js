const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'scripts', 'popup.js'),
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'popup.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'scripts'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              '@babel/preset-react'
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./assets/popup.html",
      filename: "popup.html"
    }),
    new CopyPlugin({
      patterns: [
        { from: "public" }
      ],
    }),
  ]
};