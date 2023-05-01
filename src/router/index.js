//src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import VistaUnirse from '../views/VistaUnirse.vue'
import VistaEsperar from '../views/VistaEsperar.vue'
import VistaJugar from '../views/VistaJugar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: VistaUnirse
    },
    {
      path: '/wait',
      name: 'wait',
      component: VistaEsperar
    },
    {
      path: '/play',
      name: 'play',
      component: VistaJugar
    }
  ]
})

export default router