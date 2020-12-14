const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // devServer
  devServer: {
    port: 9001
  },
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', resolve('./src'))
  }
}