const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = {
  entry: {
    app: './src/index.tsx',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    symlinks: false,
  },
  module: {
    rules: [
      /* {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }, */
      {
        test: /\.(tsx|ts)?$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // url-loader内置了file-loader,不同的是，当文件小于1024字节时，会转换为base64编码
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '8192',
              outputPath: 'img/',
              publicPath: '../img',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 清除dist中的文件
    // new CleanWebpackPlugin(['dist']),
    // 生成包含js等各种依赖的html文件
    // TODO 其他特别配置
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 这能把loadsh作为全局变量，使用时无需引入，$ jquery同理
    /* new webpack.ProvidePlugin({
      _: 'lodash',
      join: ['lodash', 'join']提取loadsh的join,使用join时都是调用的_.join,这能很好的与 tree shaking 配合，将 lodash 库中的其他没用到的部分去除。
    }) */
  ],
  // 处理重复模块代码，提取到单独的chunk,CommonsChunkPlugin 已经从 webpack v4（代号 legato）中移除。
  // 把库提取到vender中，使得浏览器能使用缓存
  optimization: {
    runtimeChunk: 'single', // 提取模版，runtime到单独的chunk
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  // 该配置使npm不解析react 和react DOM,这时需要在html中倒入相关文件
  /* externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  }, */
};

module.exports = common;
