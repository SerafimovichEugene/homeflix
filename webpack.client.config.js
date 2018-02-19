const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
];

const base = {
  entry: './src/web/client/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist/public'),
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/web/client/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  module: {
    rules: [
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|svg)$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },

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
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      // {
      //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //     loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      // },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      // },
      // {
      //   test: /\.jsx$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      // },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: false },
            },
            { loader: 'sass-loader' },
          ],
        }),
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

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
},
};

if (nodeEnv === 'production') {
  base.plugins = plugins;
} else {
  base.devtool = 'cheap-module-eval-source-map';
}

module.exports = base;
