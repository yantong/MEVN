import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history'
})

function getCookie (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1){
            return c.substring(name.length, c.length);
          }
        }
        return "";
}

router.beforeEach((to, from, next) => {
  if(to.name == 'Login' && getCookie('login'))
  {    
    next({ path: '/home' })
  }
  else if(to.name == 'Home' && !getCookie('login'))
  {    
    next({ path: '/' })
  }
  else
    next();
});

router.afterEach(to => {  
})

export default router
