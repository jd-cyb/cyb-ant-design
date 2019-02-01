import Loadable from '@/components/loadable'

const Login = Loadable(() => import('./pages/login'))
const Register = Loadable(() => import('./pages/register'))

const routes = [
  { path: '/user/login', name: 'Login', component: Login },
  { path: '/user/register', name: 'Register', component: Register },
]

export default routes
