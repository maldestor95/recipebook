import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
// eslint-disable-next-line no-unused-vars
const option = {
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
        menuBack: colors.teal.darken4,
        menuBackSelected: colors.teal.darken3,
        menuFont: colors.teal.lighten2,
        background: colors.teal.darken4
      }
    }
  }
}
export default new Vuetify(option)
