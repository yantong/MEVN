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
        path: '/home',
        name: 'Home',
        component: () => import('../page/main/index.vue'),
        children: [
            {
                path: '/editSelfData',
                name: 'editSelfData',
                component: () => import('../page/editSelfData/index.vue')
            },
          ]
    },
    {
        path: '/findPsd',
        name: 'findPsd',
        component: () => import('../page/findPsd/index.vue')
    },
    
    {
        path: '*',
        name: '404',
        component: () => import('../page/404/index.vue')
    }
]