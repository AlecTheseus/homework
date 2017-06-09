import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import login from '@/page/login'
import dashboards from '@/page/dashboards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/dashboards',
      name: 'dashboards',
      component: dashboards
    }
  ]
})
