<template>
  <v-app>
    <v-app-bar dense app hide-on-scroll class="hidden-sm-and-down" color="blue lighten-1" text-color="white">
      <!-- src="logoMaldestor.svg" -->
      <img src="logoMaldestor.svg" alt="logo Maldestor" height="50" width="50" @click="navdrawer = !navdrawer" />

      <!-- <v-icon id="menu" @click="navdrawer = !navdrawer" color="white">mdi-menu</v-icon> -->

      <span class="text-uppercase white--text" style="font-family:CoffeeHouse;font-size: x-large;">Maldestor 95</span>
      <span></span>
      <v-spacer></v-spacer>
      <v-chip label color="blue ligthen-1" text-color="white" v-if="storeState.username">User Connected:
        {{storeState.username}}</v-chip>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <login-user v-model="logged"></login-user>
    </v-app-bar>

    <v-navigation-drawer temporary app v-model="navdrawer">
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
          <v-list-item v-for="(item, i) in routeList" :key="i" @click="navigateTo(item)">
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
        <login-user color="info" v-model="logged"></login-user>
      </v-list>
    </v-navigation-drawer>

    <!-- style="position:absolute; top:0px;left 20px" -->
    <v-content id="vcontent">
      <router-view></router-view>
    </v-content>

    <v-btn absolute top left fab id="menumobile" class="mt-8 hidden-md-and-up">
      <!-- color="blue lighten-3" -->
      <!-- <v-icon @click="navdrawer = !navdrawer">mdi-menu</v-icon> -->
      <img src="logoMaldestor.svg" alt="triangle with all three sides equal" height="50" width="50"
        @click="navdrawer = !navdrawer" />
    </v-btn>
  </v-app>
</template>

<script>
  import LoginUser from "./components/LoginUser.vue";
  import {
    store
  } from "./store/index.js";

  export default {
    name: "App",
    components: {
      LoginUser
    },
    data: () => ({
      storeState: store.state,
      logged: false,
      navdrawer: null,
      item: 1
    }),
    methods: {
      navigateTo(it) {
        if (it.extLocation) {
          if (it.newWindow) {window.open(it.extLocation)} else { window.location.href=it.extLocation}
          } else {
          if (it.link != this.$route.path) {
            this.$router.push(it.link).catch(() => {});
        }
        }
      }
    },
    computed: {
      currentroute() {
        return JSON.stringify(this.$route);
      },
      currentApp() {
        let currentNav = this.navlist.filter(nav => {
          return this.$route.name == nav.link;
        });
        return currentNav[0] ? currentNav[0].text : "none";
      },
      routeList() {
        let routeL = this.$router.options.routes.map(x => {
          return x.meta;
        });
        routeL = routeL
          .filter(x => x.menu)
          .filter(x => {
            return !x.requireAuth | this.$store.getters.isAuthorised(x.link);
          });
        return routeL;
      }
    },
    mounted() {
      this.$store.commit("reinitSession");
    }
  };
</script>
<style lang="scss">
  @font-face {
    font-family: SaucerBB;
    src: url("./assets/fonts/saucer/SaucerBB.ttf") format("truetype");
  }

  @font-face {
    font-family: CoffeeHouse;
    src: url("./assets/fonts/coffee-house/CoffeeHouse.ttf") format("truetype");
    font-weight: bold;
    font-size: xx-large;
  }
</style>
<style lang="scss" scoped>
  // .v-content{
  //   padding:0px;
  // }
  // .AppClass {
  //   width: 100%;
  // }
  // .NavMenu {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   z-index: 10;
  //   background-color: rgba(0, 0, 0, 0.5); /*dim the background*/
  // }

  //   .AppBar {
  //     @media screen and (max-width: 400px),
  //       screen and (max-width: 740px) and (orientation: landscape)
  //  {
  //     display: none;
  //     }
  //   }

  // .AppContent {
  //   padding-top: 20px;
  //   @media screen and (max-width: 400px) {
  //     padding-top: 0px;
  //   }
  // }
  // .menuMobile{
  //   @media screen and (max-width: 400px)
  //    {
  //   position: fixed;
  //   top: 10px;
  //   left: 10px;
  //   height: 10px;
  //   z-index: 4;
  //   }

  //   @media screen and (max-width: 740px) and (orientation: landscape) {
  //   position: fixed;
  //   top: 0px;
  //   left: 10px;
  //   height: 10px;
  //   z-index: 4;
  //   }
  // }

  @page {
    margin: 1cm;
    border: solid;
    border-color: black;
    size: A4 landscape;
  }

  @media print {
    .v-app-bar {
      display: none;
      height: 0px;
    }

    .v-content {
      position: absolute;
      top: -96px;
      // padding: 0px;
      // color:red;
    }

    #menumobile {
      display: none;
    }
  }
</style>