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
import Login from '@/components/Login'
import Newform from '@/components/Newform'
import Sign from '@/components/Sign'
import Share from '@/components/Share'
import ShareList from '@/components/ShareList'
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
      path: '/Newform/:id',
      name: 'Newform',
      component: Newform,
      meta: { requiresAuth: true }
    },
    {
      path: '/Shoplist/:id',
      name: 'Shoplist',
      component: Shoplist
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path: '/UserScore',
      name: 'UserScore',
      component: UserScore,
      meta: { requiresAuth: true }
    },
    {
      path: '/UserAccount',
      name: 'UserAccount',
      component: UserAccount,
      meta: { requiresAuth: true }
    },
    {
      path: '/UserAccount/:id',
      name: 'UserAccount',
      component: UserAccount,
      meta: { requiresAuth: true }
    },
    {
      path: '/UserOrders',
      name: 'UserOrders',
      component: UserOrders,
      meta: { requiresAuth: true }
    },
    {
      path: '/Sign',
      name: 'Sign',
      component: Sign,
      meta: { requiresAuth: true }
    },
    {
      path: '/Share',
      name: 'Share',
      component: Share,
      meta: { requiresAuth: true }
    },
    {
      path: '/ShareList',
      name: 'ShareList',
      component: ShareList,
      meta: { requiresAuth: true }
    },
    {
      path: '/Clear',
      name: 'Clear',
      redirect: to => {
        localStorage.removeItem('user');
        return '/'
      }
    }
  ]
})
