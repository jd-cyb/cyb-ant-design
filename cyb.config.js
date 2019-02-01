/**
 * =================================
 * @2018 塞伯坦-CYB前端模块化工程构建工具
 * https://github.com/jd-cyb/cyb-cli
 * =================================
 */


module.exports = {
  /**
   * 启用/禁用 eslint 检测
   */
  eslint: {
    available: false
  },
  webpack: {
    lessLoader: {
      options: {
        javascriptEnabled: true
      }
    },
    cssLoader: {
      options: {
        modules: true,
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
