import React, { Fragment } from 'react'
import { Redirect, Route, Switch, Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { Icon,Spin } from 'antd'
import GlobalFooter from './components/global-footer'
import styles from './styles.less'
import logo from 'static/images/cybertron.svg'

import routes from './routes'

const links = [
  // {
  //   key: 'help',
  //   title: '帮助',
  //   href: '',
  // },
  // {
  //   key: 'privacy',
  //   title: '隐私',
  //   href: '',
  // },
  // {
  //   key: 'terms',
  //   title: '条款',
  //   href: '',
  // },
]

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 塞伯坦前端架构组
  </Fragment>
)

class UserLayout extends React.PureComponent {

  getPageTitle() {
    let title = 'CYB Ant Design'
    return title
  }

  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>CYB Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>基于塞伯坦和antDesign的最佳工程实践解决方案</div>
            </div>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null)
                })}
                <Redirect from="/user" to="/user/login" />
              </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    )
  }
}

export default UserLayout
