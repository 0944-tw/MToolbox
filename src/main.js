import { createApp } from 'vue'
import route from './router'
// Vuetify

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
let app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})

app.use(VueAxios, axios)
app.use(vuetify)
app.use(route)
app.mount('#app')
