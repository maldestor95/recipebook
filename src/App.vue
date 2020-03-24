<template>
  <v-app>
    <v-app-bar dense app color="primary" dark>
      <v-icon @click="navdrawer = !navdrawer">mdi-menu</v-icon>
      <v-spacer></v-spacer>
      <h1>{{ currentApp }}</h1>
      <v-spacer></v-spacer>
      <login-user color="info"></login-user>
    </v-app-bar>

    <v-navigation-drawer temporary v-model="navdrawer" class="NavMenu">
      <v-list dense>
        <v-list-item @click="navdrawer = !navdrawer">
          <v-list-item-icon>
            <v-icon>mdi-menu</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>TOOLS</v-subheader>
        <v-list-item-group v-model="item">
          <v-list-item
            v-for="(item, i) in navlistfiltered"
            :key="i"
            @click="navigateTo(item)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-subheader>Info</v-subheader>
        <p>{{ currentroute.path }}</p>
        <login-user color="info"></login-user>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import LoginUser from "./components/LoginUser.vue";
import storey from "./store.js";

export default {
  name: "App",
  components: {
    LoginUser
  },
  data: () => ({
    Store: storey.state,
    navdrawer: null,
    currentApp: "Current Application",
    item: 1,
    navlist: [
      {
        icon: "mdi-information-variant",
        text: "About",
        link: "/About",
        logrequired: false
      },
      {
        icon: "mdi-alert-box",
        text: "Risks",
        link: "/Risks",
        logrequired: true
      },
      {
        icon: "mdi-cash-100",
        text: "Expenses",
        link: "/Expenses",
        logrequired: true
      },
      {
        icon: "mdi-account-group",
        text: "Users",
        link: "/Users",
        logrequired: false
      }
    ]
  }),
  methods: {
    navigateTo(it) {
      this.$router.push(it.link);
      this.currentApp = it.text;
      return true;
    }
  },
  computed: {
    // filter navlist depending on user's right to access other menus
    navlistfiltered() {
      const res = this.navlist.filter(
        nav => !nav.logrequired | this.Store.logged
      );
      return res;
    },
    currentroute() {
      return JSON.stringify(this.$route);
    }
  }
};
</script>
<style lang="scss" scoped>
#routerview {
  border-style: solid;
}
.NavMenu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5); /*dim the background*/
}
</style>
