// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import './assets/css/main.css'
import './assets/css/style.css'
import './assets/css/default.css'
import store from './store'
Vue.use(Vuex)
Vue.use(require('vue-wechat-title'))
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.title
  }
})
Vue.config.productionTip = false
localStorage.removeItem('user');
//执行请求微信登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.accessToken && store.state.user.uid && store.state.user.ismobile == 1 && store.state.user.phone) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
  /*
  if(to.name != 'login' && to.name != 'weixin')
  {
    let user = store.state.user;
    //let user = {id:null};
    if (user && user.id) {
      next();
    } else {
      next({
        path:'/login',
        query:''
      })
    }
  }else{
    next();
  }*/
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
