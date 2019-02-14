import Loadable from '@/components/loadable'

const Dashboard = Loadable(() => import('./pages/dashboard'))
const basicForm = Loadable(() => import('./pages/basic-form'))
const stepForm = Loadable(() => import('./pages/step-form'))
const basicTable = Loadable(() => import('./pages/basic-table'))
const searchTable = Loadable(() => import('./pages/search-table'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/form/basic-form', name: 'basicForm', component: basicForm },
  { path: '/form/step-form', name: 'stepForm', component: stepForm },
  { path: '/table/basic-table', name: 'basicTable', component: basicTable },
  { path: '/table/search-table', name: 'searchTable', component: searchTable }
]

export default routes
