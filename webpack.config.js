/**
 * Webpack configuration to build the project
 */

'use strict';

const { resolve }         = require('path');
const webpack             = require('webpack');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const WebpackChunkHash    = require('webpack-chunk-hash');
const { version }         = require('./package.json');

module.exports = env => {
  const isProd    = !!env.prod;
  const isStaging = !!env.staging;
  const isProdOrStaging = isProd || isStaging;

  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const removeEmpty = plugins => plugins.filter(plugin => !!plugin);
  const ifProd = plugin => addPlugin(isProdOrStaging, plugin);

  const output = {
    path: resolve(process.cwd(), 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  };

  if (isProdOrStaging) {
    Object.assign(output, {
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].js',
    });
  }

  return {
    entry: {
      'vendor': [
        'firebase',
      ],
      'app': './index.tsx',
    },
    output,
    context: resolve(__dirname, 'src'),
    // devtool: isProdOrStaging ? 'source-map' : 'eval',
    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    },
    plugins: removeEmpty([
      new CleanWebpackPlugin('./dist'),
      new CopyWebpackPlugin([{ from: '../public' }]),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        minChunks: Infinity,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isProdOrStaging ? '"production"' : '"development"',
          // Error logging
          APP_VERSION: `'${version}'`,
          IN_BROWSER: '"true"',
          FIREBASE_KEY: `"${process.env.KAIZEN_FB_KEY}"`,
          FIREBASE_DB: `"${process.env.KAIZEN_FB_DB}"`,
          FIREBASE_AUTH_DOMAIN: `"${process.env.KAIZEN_FB_AUTH_DOMAIN}"`,
          FIREBASE_PROJECT_ID: `"${process.env.KAIZEN_FB_PROJECT_ID}"`,
        },
      }),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      })),
      new HtmlWebpackPlugin({ template: '../public/index.html' }),
    ]),
    module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  plugins: [
                    [
                      "transform-runtime", {
                        "polyfill": false,
                        "regenerator": true,
                      },
                    ],
                    'transform-class-properties',
                    'transform-object-assign',
                  ],
                  presets: [
                    'env',
                  ],
                },
              },
              'ts-loader',
            ],
          },
          {
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
            ],
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: [
              { loader: 'url-loader?limit=100000' },
            ],
          },
        ]
    }
  };
}
