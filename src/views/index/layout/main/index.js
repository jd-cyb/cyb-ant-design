import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { stringify } from 'qs';

import config from './config'
import Header from './components/header'
import Footer from './components/footer'
import GridContent from './components/page-wrapper';
import SiderMenu from './components/sider-menu';

import { getMenuData } from './menu';

import logo from 'static/images/cybertron.svg';

import styles from './index.less';

import { observer, inject } from 'mobx-react';

import auth from '@/utils/auth';

import routes from './routes';

const { Content } = Layout;

/**
 * 根据菜单取得重定向地址.
 */
// const redirectData = [];
// const getRedirect = item => {
//   if (item && item.children) {
//     if (item.children[0] && item.children[0].path) {
//       redirectData.push({
//         from: `${item.path}`,
//         to: `${item.children[0].path}`,
//       });
//       item.children.forEach(children => {
//         getRedirect(children);
//       });
//     }
//   }
// };
// getMenuData().forEach(getRedirect);

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

  state = {
    isMobile,
    ...config
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

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.state;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

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

    const { isMobile, layout: StateLayout, navTheme, fixedHeader } = this.state;

    const isTop = StateLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

    const baseRedirect = this.getBaseRedirect();
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}

            collapsed={collapsed}
            menuData={getMenuData()}
            isMobile={isMobile}
            {...this.state}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={getMenuData()}
            handleMenuCollapse={this.handleMenuCollapse}
            handleMenuClick={this.handleMenuClick}
            logo={logo}
            isMobile={isMobile}
            collapsed={collapsed}
            currentUser={currentUser}
            {...this.state}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            <GridContent
              {...this.state}
              {...this.props}
            >
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
            </GridContent>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );

    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle()}>
          <ContainerQuery query={query}>
            {params => <div className={classNames(params)}>{layout}</div>}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

export default BasicLayout;
