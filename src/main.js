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



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
