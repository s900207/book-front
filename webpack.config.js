const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 其他配置
  plugins: [
    new HtmlWebpackPlugin({
      // 禁用預加載和預取
      preload: false,
      prefetch: false
    })
  ]
}
