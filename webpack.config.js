const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'components', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
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