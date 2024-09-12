/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
// import { createVuetify } from 'vuetify'

import { zhHant } from 'vuetify/locale'
Vue.use(Vuetify)

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default new Vuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6'
        }
      }
    }
  },
  locale: {
    locale: 'zhHant',
    messages: { zhHant }
  },
  icons: {
    iconfint: 'mdi'
  }
})
