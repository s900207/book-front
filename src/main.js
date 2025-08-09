/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

// Composables
import { createApp } from 'vue'

setTimeout(() => {
  import('@mdi/font/css/materialdesignicons.css')
}, 100)

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
app.use(vuetify)
