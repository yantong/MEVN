import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import * as util from '../../util'

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.name == 'Login' && util.getCookie('login'))
  {    
    next({ name: 'homeIndex' })
  }
  else if(to.name != 'Login' && !util.getCookie('login'))
  {    
    next({ path: '/' })
  }
  else
    next();
});

router.afterEach(to => {  
})

export default router
