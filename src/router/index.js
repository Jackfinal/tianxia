import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Page from '@/components/Page'
import Newlist from '@/components/Newlist'
import Shownew from '@/components/Shownew'
import Shoplist from '@/components/Shoplist'
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
    },
    {
      path: '/Newlist/:id',
      name: 'Newlist',
      component: Newlist
    },
    {
      path: '/Shownew/:id',
      name: 'Shownew',
      component: Shownew
    },
    {
      path: '/Shoplist/:id',
      name: 'Shoplist',
      component: Shoplist
    }
  ]
})