const path = require('path');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const nodeEnv = process.env.NODE_ENV || 'development';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }),
  // new BundleAnalyzerPlugin(),
];

const base = {
  // entry: ['babel-polyfill', './src/index.js'],
  entry: './client/index.js',

  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, './public'),
  },

  // resolve: {
  //   extensions: ['.js', '.jsx'],
  // },

  module: {
    rules: [
      // {
      //     test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //     use: "url-loader",
      // },
      // {
      //     test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      //     use: 'file-loader',
      // },
      // {
      //     test: /\.(png|jpe?g|gif|ico)$/,
      //     loader: 'file-loader?name=assets/[name].[hash].[ext]',
      // },
      // {
      //     test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      //     loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      // },
      // {
      //     test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      //     loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      // },
      // {
      //     test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //     loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      // },
      // {
      //     test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //     loader: 'file-loader',
      // },
      // {
      //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //     loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: [/public/],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader',
        ],
      }
    ],
  },
};

if (nodeEnv === 'production') {
  base.plugins = plugins;
} else {
  base.devtool = 'cheap-module-eval-source-map';
}

module.exports = base;
