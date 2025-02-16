'use strict';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {

  //   mode: 'development',
  mode: 'production',

  entry: {
    'phaser-custom': `./phaser-custom.js`,
    'phaser-custom.min': './phaser-custom.js'
  },

  resolve: {
    alias: {
      'eventemitter3': path.resolve(__dirname, './node_modules/eventemitter3'),
      'phaser3spectorjs': path.resolve(__dirname, './node_modules/phaser3spectorjs')
    },
    modules: ['node_modules/phaser/src']
  },

  stats: {
    modules: true,
  },

  experiments: {
    outputModule: true
  },

  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    library: {
      name: 'Phaser',
      type: 'module'
    },
    libraryTarget: 'umd',
    libraryExport: 'default',
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
    devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    umdNamedDefine: true
  },

  performance: { hints: false },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        include: /\.min\.js$/,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: true,
          ie8: false,
          ecma: 6,
          output: { comments: false },
          warnings: false,
          module: true
        },
        warningsFilter: () => false
      })
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(false),
      "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
      "typeof PLUGIN_FBINSTANT": JSON.stringify(false)
    }),

    new CleanWebpackPlugin()
  ],

  devtool: 'source-map'

};
