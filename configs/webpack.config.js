const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const dirApp = path.join(__dirname, '../app')
const dirAssets = path.join(__dirname, '../assets')
const dirStyles = path.join(__dirname, '../styles')
const dirJsEntry = path.join(dirApp, 'index.js')
const dirScssEntry = path.join(dirStyles, 'index.scss')
const dirNode = 'node_modules'
const dirPublic = path.join(__dirname, '../public')
const dirOutput = path.resolve(__dirname, '../dist')

module.exports = {
  entry: [dirJsEntry, dirScssEntry],

  resolve: {
    modules: [dirApp, dirAssets, dirStyles, dirNode],
  },

  plugins: [
    new ESLintPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: dirPublic,
          to: dirOutput,
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },

      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: 'asset/source',
      },

      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: {
          loader: 'glslify-loader',
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaces: true }],

              ['jpegtran', { progressive: true }],

              ['optipng', { optimizationLevel: 10 }],
            ],
          },
        },
      }),
    ],
  },
}
