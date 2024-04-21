import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import 'typeface-open-sans'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: {
        VApp: {
          style: 'font-family: "Open Sans", sans-serif'
        }
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#F8F8F8',
                    secondary: '#B8BAC5',
                    fontprimary: '#121212'
                },
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#070F2B',
                    secondary: '#535C91',
                    fontprimary: '#FFFFFF'
                },
            }
          }

    },

  })
  app.vueApp.use(vuetify)
})
