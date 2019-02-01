export const Login = (req, res) => {
  const {
    password,
    userName
  } = req.body;
  if (password === '888888' && userName === 'admin') {
    res.send({
      errno: 0,
      msg: '',
      data: {
        "userInfo": {
          "id": "355",
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          "name": "furic",
          "nickName": "赵Sir",
          "phone": "13811869208",
          "age": 74,
          "isMale": false,
          "email": "furic@qq.com",
          "createTime": "2018-11-21 15:37:12"
        },
        "sid": "355235239534235"
      }
    });
    return;
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
