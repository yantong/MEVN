export default [
    {
        path: '/',
        name: 'Login',
        component: () => import('../page/login/index.vue')
    },
    {
        path: '/regest',
        name: 'Regest',
        component: () => import('../page/regest/index.vue')
    },
    {
        path: '*',
        name: '404',
        component: () => import('../page/404/index.vue')
    }
]