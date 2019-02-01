import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox, Alert, Icon } from 'antd'
import Login from '../components/login'
import styles from './login.less'
import { getPageQuery } from '@/utils/utils'

import { login } from '@/api'
import auth from '@/utils/auth'


const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login

export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    loginErrno: 0,
    loginMsg: ''
  }

  onTabChange = type => {
    this.setState({ type })
  }

  handleSubmit = async (err, values) => {

    if (!err) {
      const res = await login(values)

      if (res.errno !== 0) {
        this.setState({ loginErrno: res.errno, loginMsg: res.msg })
        return
      }

      auth.login(res.data)

      const { history } = this.props
      const urlParams = new URL(window.location.href)
      const params = getPageQuery()
      let { redirect } = params
      if (redirect) {
        const redirectUrlParams = new URL(redirect)
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length + urlParams.pathname.length)
          if (redirect.startsWith('/#')) {
            redirect = redirect.substr(2)
          } else if (redirect.startsWith('#/')) {
            redirect = redirect.substr(1)
          }
          history.push(redirect)
        } else {
          window.location.href = redirect
          return
        }
      } else {
        history.push('/')
      }
    }
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    })
  }

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  }

  render() {
    const { login, submitting } = this.props
    const { loginErrno, loginMsg, type, autoLogin } = this.state
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          {/* <Tab key="account" tab="账户密码登录">
            {loginErrno !== 0 && this.renderMessage(loginMsg)}
            <UserName name="userName" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">

            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab> */}
          {loginErrno !== 0 && this.renderMessage(loginMsg)}
          <UserName name="userName" placeholder="admin" />
          <Password name="password" placeholder="888888" />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    )
  }
}
