const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');

const { analysis } = process.env;
const DIST_PATH = path.resolve(__dirname, '../dist');

const productConfig = {
  mode: 'production',
  devtool: false,
  performance: {
    hints: 'error',
    maxEntrypointSize: 512000, // 入口资源最大限制
    maxAssetSize: 250000, // 单个文件
  },
  output: {
    // 多入口输出，加hash，利用缓存，但是两次相同代码的build可能会产生不同的hash
    // 因为 webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest 导致hash改变。
    // 输出可能会因当前的 webpack 版本而稍有差异。新版本不一定有和旧版本相同的 hash 问题，但我们需要提取模板，以防万一。
    pathinfo: true,
    filename: 'js/[name].[chunkhash].js',
    path: DIST_PATH,
    publicPath: '/', // publicPath 总是以斜杠(/)开头和结尾。
    // chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        // loader处理顺序从下往上
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath: '../css/'
            },
          },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js', // 项目根目录创建此文件
              },
            },
          },
          {
            loader: 'sass-loader', // 将 Sass 编译成 CSS
          },
        ],
      },
    ],
  },
  plugins: [
    // 压缩js
    new UglifyJSPlugin({
      exclude: /\.min\.js$/,
      extractComments: false, // 移除注释
      cache: true, // 开启缓存
      uglifyOptions: {
        compress: {
          unused: true,
          warnings: false,
          drop_console: true,
        },
        output: {
          comments: false,
        },
      },
      sourceMap: true,
      parallel: true, // 使用多进程并行运行来提高构建速度。 默认并发运行数os.cpus().length - 1
    }),

    // 提取css
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),

    // 压缩css
    new OptimizeCssAssetsPlugin({
      /* assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true }, // 防止cssnano把浏览器前缀去掉
        mergeLonghand: false,
        discardComments: {
          removeAll: true // 移除注释
        }
      },
      canPrint: true */
    }),

    // 当使用 process.env.NODE_ENV === 'production' 时，
    // 一些 库 可能针对具体用户的环境进行代码优化，
    // 从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
    // 使未更改的模块，hash不变
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],
};

if (analysis) {
  productConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, productConfig);
