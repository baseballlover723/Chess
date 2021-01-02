const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
  entry: {
    main: path.resolve(__dirname, 'entry.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../public/dist'),
    publicPath: '/dist'
  },
  resolve: {
    alias: {
      amber: path.resolve(__dirname, '../../lib/amber/assets/js/amber.js')
    }
  },
  context: path.resolve(__dirname, '../../src/assets'),
  module: {
    rules: [{
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /.*\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name(file) {
            return '/' + path.relative(path.resolve(__dirname, '../../src/assets'), file);
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching',
    }),
  ],
  // For more info about webpack logs see: https://webpack.js.org/configuration/stats/
  stats: 'errors-only'
};

module.exports = config;
