var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');
var cssnext = require('postcss-cssnext');
var flexFallback = require('postcss-flex-fallback');
var precss = require('precss');

module.exports = {
  entry: {
    main: './src/index.js',
    vendors: ['vue']
  },
  output: {
    path: './dist'
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.(html|tpl)$/, loader: 'html-loader'}
    ],
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
  },
  vue: {
    autoprefixer: false,
    postcss: [
      nested(),
      cssnext({ browsers: ['last 2 versions', 'Android >= 2.1', 'iOS >= 7.0'] }),
      flexFallback(),
    ],
  },
  eslint: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  },
  resolve: {
    // 扩展，require时省略扩展名
    extensions: ['', '.js', '.vue'],
    // 别名
    alias: {
      filter: path.join(__dirname, './src/filters'),
      components: path.join(__dirname, './src/components')
    }
  }
}
