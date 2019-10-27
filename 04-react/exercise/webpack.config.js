const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const appConfig = require('./app/app.config');

const entryPoint = resolve(__dirname, 'app') + '/index.js';
const htmlTemplate = resolve(__dirname, 'app') + '/templates/index.html';

const config = {
  stats: {
    maxModules: 0
  },
  //context: resolve(__dirname, 'app'),
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?' +
      appConfig.development.url +
      ':' +
      appConfig.development.port,
    'webpack/hot/only-dev-server',
    entryPoint
  ],
  devServer: {
    hot: true,
    //contentBase: resolve(__dirname, '/dist'),
    historyApiFallback: true,
    publicPath: '/',
    disableHostCheck: true,
    port: appConfig.development.port,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  output: {
    path: resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    new CopyWebpackPlugin([
      {
        from: htmlTemplate,
        to: 'dist/index.html'
      }
    ]),
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      filename: resolve(__dirname, '/dist') + '/index.html',
      inject: 'body'
    }),
    new OpenBrowserPlugin({
      url: appConfig.development.url + ':' + appConfig.development.port
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'sass-loader',
                query: {
                  sourceMap: false
                }
              }
            ],
            publicPath: '../'
          })
        )
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
