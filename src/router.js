const router = require("vue-router")
import index from './components/main.vue'
import apm from './components/apm.vue'
import imgproc from './components/imageproc'
import about from './components/about.vue'
const route = router.createRouter({
    history: router.createWebHistory(),
    routes: [
        { path: '/',redirect:'home' },
        { path: '/home', component: index },
        { path: '/apm',component: apm},
        { path: '/imgproc',component: imgproc},
        { path: '/about',component: about},
    ]
})

export default route
