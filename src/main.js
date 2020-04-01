import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(require('vue-moment'));

import VueSession from 'vue-session'
Vue.use(VueSession)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import router from '@/router'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");