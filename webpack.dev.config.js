var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

config.devtool = '#source-map';                             // source-map
config.output.publicPath = '';                        // 资源路径
config.output.filename = '[name].js';                       // 入口js命名
config.output.chunkFilename = '[name].chunk.js';            // chunk js命名

config.vue.loaders = {
  css: ExtractTextPlugin.extract(
    "style-loader",
    "css-loader?sourceMap",
    "postcss-loader",
    {
        publicPath: "/dist/"
    }
  )
};
config.module.loaders.push({
  test: /\.(gif|jpg|png|jpeg|svg)\??.*$/, loader: 'url-loader?name=[name].[ext]&limit=8192'
});

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin("[name].css",{ allChunks : true,resolve : ['modules'] }),             // 提取CSS
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),                           // 提取第三方库
    new HtmlWebpackPlugin({                                                                     // 构建html文件
        filename: './index.html',
        template: './src/index.tpl',
        inject: 'body'
    })
]);

module.exports = config;