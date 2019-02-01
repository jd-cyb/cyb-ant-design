import Cookies from 'js-cookie'

export default {
  /**
   * 登录成功
   * @param {登录成功后的返回信息} res
   * @param {登录成功后的回调} callback
   */
  login(res, callback) {
    Cookies.set('sid', res.sid);
    Cookies.set('userInfo', res.userInfo);
    if (callback) callback();
  },

  /**
   * 是否已登录
   */
  loggedIn() {
    return !!Cookies.get('sid');
  },

  /**
   * 获取登录后的sessionID
   */
  getSid() {
    return Cookies.get('sid');
  },

  /**
   * 获取登录后的用户信息
   */
  getUserInfo() {
    return Cookies.get('userInfo')
  },

  /**
   * 退出登录
   * @param {退出登录后的回调} cb
   */
  logout(cb) {
    Cookies.remove('sid');
    Cookies.remove('userInfo');
    if (cb) cb()
  }
}
