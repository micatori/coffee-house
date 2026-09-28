const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    home: ['./src/index.js', './home/style.css'],
    menu: ['./src/index.js', './menu/style.css'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './home/index.html',
      filename: 'home/index.html',
      chunks: ['home'],
    }),

    new HtmlWebpackPlugin({
      template: './menu/index.html',
      filename: 'menu/index.html',
      chunks: ['menu'],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'assets',
        },
      ],
    }),
  ],
};