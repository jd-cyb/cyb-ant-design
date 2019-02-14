import Loadable from '@/components/loadable'

const Login = Loadable(() => import('./pages/login'))
const Register = Loadable(() => import('./pages/register'))
const RegisterResult = Loadable(() => import('./pages/register-result'))

const routes = [
  { path: '/user/login', name: 'Login', component: Login },
  { path: '/user/register', name: 'Register', component: Register },
  { path: '/user/register-result', name: 'RegisterResult', component: RegisterResult },
]

export default routes
