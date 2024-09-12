import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework.mjs'

// Composables

import { zhHant } from 'vuetify/locale'

Vue.use(Vuetify)

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
    defaultSet: 'mdi'
  }
})
