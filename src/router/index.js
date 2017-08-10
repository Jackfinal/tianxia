import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Page from '@/components/Page'
import Newlist from '@/components/Newlist'
import Shownew from '@/components/Shownew'
import Shoplist from '@/components/Shoplist'
import User from '@/components/User'
import UserScore from '@/components/UserScore'
import UserAccount from '@/components/UserAccount'
import UserOrders from '@/components/UserOrders'
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
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/UserScore',
      name: 'UserScore',
      component: UserScore
    },
    {
      path: '/UserAccount',
      name: 'UserAccount',
      component: UserAccount
    },
    {
      path: '/UserAccount/:id',
      name: 'UserAccount',
      component: UserAccount
    },
    {
      path: '/UserOrders',
      name: 'UserOrders',
      component: UserOrders
    }
  ]
})
