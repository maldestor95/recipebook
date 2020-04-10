<template>
  <v-app class="AppClass">
    <v-app-bar dense app color="primary" dark class="AppBar">
      <v-icon id="menu" @click="navdrawer = !navdrawer">mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <h1>{{ currentApp }}</h1>
        <v-spacer></v-spacer>
        <v-chip label color="primary" text-color="black">{{storeState.username}}</v-chip>
        <login-user color="info"></login-user>
    </v-app-bar>

    <v-btn fab small class="menuMobile" @click="navdrawer = !navdrawer">
      <!-- <v-btn class="mx-2" fab dark small color="primary"> -->
    <v-icon  >mdi-menu</v-icon>
      </v-btn>

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
          <v-list-item v-for="(item, i) in navlistfiltered" :key="i" @click="navigateTo(item)">
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

    <v-content >
      <router-view class="AppContent"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import LoginUser from "./components/LoginUser.vue";
import { store } from "./store.js";

export default {
  name: "App",
  components: {
    LoginUser
  },
  data: () => ({
    storeState: store.state,
    navdrawer: null,
    item: 1,
    navlist: [
      {
        icon: "mdi-information-variant",
        text: "About",
        link: "about",
        logrequired: false
      },
      {
        icon: "mdi-alert-box",
        text: "Risks",
        link: "risks",
        logrequired: true
      },
      {
        icon: "mdi-cash-100",
        text: "Expenses",
        link: "expenses",
        logrequired: true
      },
      {
        icon: "mdi-account-group",
        text: "Users",
        link: "users",
        logrequired: true
      }
    ]
  }),
  methods: {
    navigateTo(it) {
      if (it.link != this.$route.path) {
        this.$router.push(it.link).catch(() => {});
      }
      // return true;
    }
  },
  computed: {
    // filter navlist depending on user's right to access other menus
    navlistfiltered() {
      const res = this.navlist.filter(
        nav => !nav.logrequired | store.isAuthorised(nav.link)
      );
      return res;
    },
    currentroute() {
      return JSON.stringify(this.$route);
    },
    currentApp() {
      let currentNav = this.navlist.filter(nav => {
        return this.$route.name == nav.link;
      });
      return currentNav[0] ? currentNav[0].text : "none";
    }
  }
};
</script>
<style lang="scss" scoped>

.AppClass {
  width: 100%;
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
.AppContent {
    position: fixed;
    top: 48px;
  }
@media screen and (max-width: 400px) {
  .AppBar {
    display: none;
  }

.menuMobile{
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 4;
}
  .AppContent {
    position: fixed;
    top: 0;
  }
}
</style>
