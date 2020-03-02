import Vue from 'vue'
import Router from 'vue-router'

// Page content
import Project from '@/components/Project'
import Home from '@/components/Home'

// Fallback page
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/project/:slug',
            name: 'project',
            component: Project
        },
        {
            path: '**',
            name: 'pageNotFound',
            component: NotFound
        }
    ]
})