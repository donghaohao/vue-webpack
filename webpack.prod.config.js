var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

config.output.publicPath = './';                        // 资源路径,根据需要可改为cdn地址
config.output.filename = '[name].[hash].js';                 // 带hash值的入口js名称
config.output.chunkFilename = '[name].[hash].chunk.js';      // 带hash值的路由js名称

config.vue.loaders = {
  css: ExtractTextPlugin.extract(
    "style-loader",
    "css-loader?sourceMap",
    "postcss-loader",
    {
        publicPath: "../dist/"
    }
  )
};
config.module.loaders.push({
  test: /\.(gif|jpg|png|jpeg|svg)\??.*$/, loader: 'url-loader?limit=8192'
});
config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin("[name].[hash].css",{ allChunks : true,resolve : ['modules'] }),       // 提取带hash值的css名称
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),                     // 提取带hash值的第三方库名称
    new webpack.optimize.UglifyJsPlugin({                                                         // 压缩文件
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({                                                                     // 构建html文件
        filename: '../dist/index.html',
        template: './src/index.tpl',
        inject: 'body'
    }),
    new CleanWebpackPlugin(['dist'],{
      verbose: true,
    })
]);

module.exports = config;