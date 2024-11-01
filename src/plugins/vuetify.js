/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'virtual:svg-icons-register'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { zhHant } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
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
    iconFont: 'md'
  }
})
