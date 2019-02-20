/**
 * =================================
 * @2018 塞伯坦-CYB前端模块化工程构建工具
 * https://github.com/jd-cyb/cyb-cli
 * =================================
 */


module.exports = {
  webpack: {
    lessLoader: {
      options: {
        javascriptEnabled: true
      }
    },
    cssLoader: {
      options: {
        modules: true,
        sourceMap: true,
        import: true,
        importLoaders: 2
      }
    }
  },
  style: {
    lessOptions: {
      javascriptEnabled: true
    }
  }
}
