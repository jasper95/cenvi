const webpack = require('webpack');
const express = require('express');
const { baseConfig, resolvePath } = require('./base');

require('dotenv').config({ path: resolvePath('config/.env') });

const result = baseConfig({
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
  },
  devServer: {
    open: true,
    port: process.env.PORT || 6969,
    hotOnly: true,
    overlay: true,
    historyApiFallback: true,
    before(app) {
      app.use('/', express.static(resolvePath('public')));
      app.use('/cdn', express.static(resolvePath('uploads')));
    },
    proxy: {
      '/api': {
        target: process.env.API_URL,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
      '/geoserver': {
        target: process.env.GEOSERVER_URL,
        pathRewrite: { '^/geoserver': '' },
        changeOrigin: true,
      },
    },
  },
});
module.exports = result;
