/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

// Composables

import { zhHant } from 'vuetify/locale'

Vue.useAttrs(Vuetify)

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
  icon: {
    iconfont: 'mdi'
  }
})
