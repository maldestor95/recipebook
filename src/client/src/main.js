import Vue from "vue";
import Vuex from 'vuex'
import { store } from "./store/index.js";
Vue.use(Vuex)

import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import VueRouter from "vue-router";


Vue.config.productionTip = false;
Vue.use(VueRouter);

import UUID from "vue-uuid";
Vue.use(UUID);

Vue.use(require('vue-moment'));

import VueSession from 'vue-session'
Vue.use(VueSession)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import {InlineSvgPlugin} from 'vue-inline-svg';
Vue.use(InlineSvgPlugin);


import router from '@/router'

new Vue({
  vuetify,
  router,
  store:store,
  render: h => h(App)
}).$mount("#app");