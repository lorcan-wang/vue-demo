import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo.vue')
  },
  {
    path: '/demo2',
    name: 'Demo2',
    component: () => import('../views/demo2.vue')
  },
  {
    path: '/canvas-demo',
    name: 'canvasDemo',
    component: () => import('../views/canvasDemo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
