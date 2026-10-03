import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 70,
            }
        }

        return { top: 0, behavior: 'smooth' }
    },
})

export default router