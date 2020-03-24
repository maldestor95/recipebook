import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(require('vue-moment'));

// 1. Define route components.
import Expenses from "./components/Expenses.vue";
import Users from "./components/Users.vue";
import About from "./components/About.vue";
import Sandbox from "./components/Sandbox.vue";
const Foo = {
  template: "<h1>foormidable</h1>"
};
const Bar = {
  template: "<h1>bar</h1>"
};
//2 Map routes
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/foo",
      component: Foo
    },
    {
      path: "/a",
      redirect: {
        name: "/About"
      }
    },
    {
      path: "/bar",
      component: Bar
    },
    {
      path: "/Expenses",
      component: Expenses
    },
    {
      path: "/Users",
      component: Users
    },
    {
      path: "/About",
      component: About
    },
    {
      path: "/Sandbox",
      component: Sandbox
    }
  ]
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
