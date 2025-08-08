/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import svgIcon from '@/components/svgIcon/svgIcon.vue'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.component('svgIcon', svgIcon)
app.mount('#app')
app.use(vuetify)
