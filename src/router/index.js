import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import HomeVue from '@/views/Home.vue'
import Record from '@/views/Record.vue'

const routes = [
  {
    path: '/', component: Layout, redirect: '/home', children: [
      { path: '/home', component: HomeVue },
      { path: '/record', component: Record }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
