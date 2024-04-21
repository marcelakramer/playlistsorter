import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
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
