import Login from '../page/login/index.vue'
import NotFound from '../page/404/index.vue'

export default [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '*',
        name: '404',
        component: NotFound,
    }
]