import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Page from '@/components/Page'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Page/:id',
      name: 'Page',
      component: Page
    }
  ]
})
