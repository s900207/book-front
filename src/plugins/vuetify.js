/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { zhHant } from 'vuetify/locale'
document.addEventListener('DOMContentLoaded', () => {
  const preloadLinks = document.querySelectorAll('link[rel="preload"][as="font"][type="font/eot"]')
  preloadLinks.forEach(link => link.remove())
})

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
