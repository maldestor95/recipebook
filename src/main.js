import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueRouter);

// 1. Define route components.
// These can be imported from other files
const Foo = { template: "<h1>foormidable</h1>" };
const Bar = { template: "<h1>bar</h1>" };

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes // short for `routes: routes`
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
