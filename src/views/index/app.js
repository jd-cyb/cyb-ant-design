import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Loadable from '@/components/loadable'
import PrivateRoute from '@/components/private'

const BasicLayout = Loadable(() => import('@/layout/main'))
const UserLayout = Loadable(() => import('@/layout/login'))
const Page404 = Loadable(() => import('@/layout/exception/404'))
const Page403 = Loadable(() => import('@/layout/exception/403'))
const Page500 = Loadable(() => import('@/layout/exception/500'))

class App extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/user" name="User Page" component={UserLayout} />
          <Route exact path="/exception/404" name="Page 404" component={Page404} />
          <Route exact path="/exception/403" name="Page 403" component={Page403} />
          <Route exact path="/exception/500" name="Page 500" component={Page500} />
          <PrivateRoute path='/' component={BasicLayout} />
        </Switch>
      </HashRouter>
    )
  }
}

export default hot(module)(App)
