const path = require('path');

const base = {
  name: 'server',
  target: 'node',
  entry: {
    server: './src/web/server/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
  },

  node: {
    __dirname: false,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: [/node_modules/],
    }],
  },
};

module.exports = base;
