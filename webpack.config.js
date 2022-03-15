const path = require('path');

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
  }
};