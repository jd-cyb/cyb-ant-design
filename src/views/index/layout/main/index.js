import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import GlobalHeader from './components/global-header';
import GlobalFooter from './components/global-footer';
import SiderMenu from './components/sider-menu';
import { getMenuData } from './menu';
import logo from 'static/images/cybertron.svg';
import { observer, inject } from 'mobx-react';

import auth from '@/utils/auth';
import { stringify } from 'qs';

import routes from './routes';

const { Content, Header, Footer } = Layout;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
// const getBreadcrumbNameMap = (menuData, routerData) => {
//   const result = {};
//   const childResult = {};
//   for (const i of menuData) {
//     if (!routerData[i.path]) {
//       result[i.path] = i;
//     }
//     if (i.children) {
//       Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
//     }
//   }
//   return Object.assign({}, routerData, result, childResult);
// };

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

@inject('Collapsed') @observer

class BasicLayout extends React.Component {

  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };

  state = {
    isMobile,
  };

  getChildContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: {},
    };
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: !!mobile,
      });
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  getPageTitle() {
    let title = 'CYB Ant Design';
    return title;
  }

  getBaseRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const { history } = this.props;
    const redirect = history.location.pathname === '/' ? "/dashboard" : history.location.pathname
    return redirect;
  };

  handleMenuCollapse = collapsed => {
    const { Collapsed } = this.props;
    Collapsed.toggleCollapse(collapsed);
  };

  handleMenuClick = ({ key }) => {
    // console.log(key)
    const { history } = this.props
    if (key === 'logout') {
      auth.logout(() => {
        history.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href
          })
        })
      })
    }
  }

  render() {
    const { collapsed } = this.props.Collapsed;
    const currentUser = JSON.parse(auth.getUserInfo());
    const {
      location,
    } = this.props;
    const { isMobile: mb } = this.state;
    const baseRedirect = this.getBaseRedirect();
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={mb}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              collapsed={collapsed}
              isMobile={mb}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Switch>
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
                    ) : (null);
                  })}
                  <Redirect from="/" to={baseRedirect} />
                </Switch>
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              links={[
                {
                  key: '塞伯坦CYB',
                  title: '塞伯坦CYB',
                  href: 'http://cyb.hestudy.com',
                  blankTarget: true,
                },
                {
                  key: 'github',
                  title: <Icon type="github" />,
                  href: 'https://github.com/jd-cyb',
                  blankTarget: true,
                },
                {
                  key: 'CYB Ant Design',
                  title: 'CYB Ant Design',
                  href: 'https://github.com/jd-cyb/cyb-ant-design',
                  blankTarget: true,
                },
              ]}
              copyright={
                <Fragment>
                  Copyright <Icon type="copyright" /> 2018 塞伯坦前端架构组
                </Fragment>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default BasicLayout;
