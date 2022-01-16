const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const config = require('./webpack.config')
const dirOutput = path.resolve(__dirname, '../dist')

module.exports = merge(config, {
  mode: 'production',

  output: {
    path: dirOutput,
  },

  plugins: [new CleanWebpackPlugin()],
})
