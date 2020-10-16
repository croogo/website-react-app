const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/index.ts',

  target: 'node',

  externals: [
    nodeExternals(),
    "react-helmet",
  ],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'ts-loader',
        options: {
            configFile : 'tsconfig-ssr.json'
        }
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
};
