import VueRouter from 'vue-router'
import NotFound from './pages/404'
import Login from './pages/Login'
import Main from './pages/Main'
import Moling from './pages/Moling'
import MolingList from './pages/MolingList'

const routes = [
    { path: '/', component: Main },
    { path: '/moling', component: Moling },
    { path: '/login', component: Login },
    { path: '/molings', component: MolingList },
    { path: '*', component: NotFound }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router
