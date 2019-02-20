export const Login = (req, res) => {
  const {
    password,
    userName
  } = req.body;
  if (password === '888888' && userName === 'admin') {

    const userInfo = {
      "id": "155",
      "avatar": 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      "name": "admin",
      "nickName": "赵Sir",
      "phone": "13811869208",
      "age": 25,
      "email": "furic@qq.com",
      "createTime": "2018-11-21 15:37:12"
    }

    const userToken = userInfo.id + new Date()*1

    req.session.userToken = userToken

    req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000

    res.send({
      errno: 0,
      msg: '',
      data: {
        "userInfo": userInfo,
        "clientToken": userToken
      }
    })
    return
  }
  res.send({
    errno: 401,
    msg: '用户名或密码错误',
    data: {}
  })
}

export default {
  Login
}
