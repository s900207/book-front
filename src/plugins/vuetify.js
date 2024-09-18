/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'https://s900207.github.io/book-front/assets/materialdesignicons-webfont-61e8aba5.ttf'
import 'https://s900207.github.io/book-front/assets/materialdesignicons-webfont-a5928a0d.woff'
import 'https://s900207.github.io/book-front/assets/materialdesignicons-webfont-662fefa8.woff2'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
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
