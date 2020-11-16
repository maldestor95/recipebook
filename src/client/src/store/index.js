import Vue from "vue";
import VueSession from 'vue-session'
import Vuex from 'vuex'

import recette from "../feature/recette/store"
import auth from "./auth"

Vue.use(Vuex)
Vue.use(VueSession)


export const store = new Vuex.Store({
    modules: {
        auth,recette
    }
})