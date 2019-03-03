const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: { 
    'main': [
      isDev ? 'webpack-hot-middleware/client' : null, 
      './src/client.js'
    ].filter(item=>item!==null)
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    publicPath: '/',
  },
  target: "web",
  devtool: isDev ? "source-map" : "none",
  mode: process.env.NODE_ENV,
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [ path.resolve(__dirname, 'src', 'client') ],
      use: {
        loader: 'babel-loader',
        query: {
          "env": {
            "development": {
              "plugins": ["react-hot-loader/babel"],
            },
            "production":{
              "plugins": ['@babel/plugin-transform-react-jsx'],
            }
          },
        },
      },
    },
    {
      test: /\.html$/,
      use: [
        // apply multiple loaders and options
        "htmllint-loader",
        {
          loader: "html-loader",
          options: {
            minimize: true,
          }
        }
      ]
    },
    {
      test: /.css$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            // modules: true,
            // importLoaders: 1,
            // localIdentName: '[path][name]-[local]'
          }
        }
      ]
    }
  ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    isDev ? new webpack.HotModuleReplacementPlugin() : null,
    isDev ? null : new HtmlWebPackPlugin({
      template: './src/res/index.html',
      filename: './index.html',
      favicon: './src/res/favicon.ico',
      inject: false,
      chunks: ['main'],
    })
  ].filter(item=>item!==null)
};