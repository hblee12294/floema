const path = require('path')

const { merge } = require('webpack-merge')

const config = require('./webpack.config')
const dirOutput = path.resolve(__dirname, '../dist')

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    port: 7373,
  },

  output: {
    path: dirOutput,
  },
})
