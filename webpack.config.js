const dotenv = require('dotenv');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

const base = {
  devServer: {
    port: 8282,
    historyApiFallback: true,
  },
  entry: {
    bundle: './src/client/index.js',
  },

  output: {
    filename: 'assets/[name].js',
    path: path.join(__dirname, './public'),
    publicPath: `${process.env.BASE_HREF}`,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_HREF: JSON.stringify(process.env.BASE_HREF),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/bundle.css',
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/client/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      styles: path.join(__dirname, './src/client/styles'),
      assets: path.join(__dirname, './src/client/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: 'file-loader?name=./assets/img/[name].png',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./assets/fonts/[name].[ext]',
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        loader: 'file-loader?name=./config/[name].json',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
        options: {
          minimize: false,
          attrs: ['img:src', 'link:href'],
        },
      },
    ],
  },
};

module.exports = base;
