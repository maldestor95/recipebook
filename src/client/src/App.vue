<template>
  <v-app >
    <v-app-bar dense app color="blue" text-color="white">
        <cog @click.native="navdrawer = !navdrawer"></cog>
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

    <v-btn id="menumobile" color="blue">
        <cog @click.native="navdrawer = !navdrawer" :showTitle="false"></cog>
    </v-btn>
  
    <site-footer></site-footer>

  </v-app>
</template>

<script>
  import LoginUser from "./components/LoginUser.vue";
  import cog from "./components/cog.vue"
  import siteFooter from "./feature/footer"
  import {
    store
  } from "./store/index.js";

  export default {
    name: "App",
    components: {
      LoginUser, cog, siteFooter
    },
    data: () => ({
      storeState: store.state,
      logged: false,
      navdrawer: null,
      item: 1,
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
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800');
  @font-face {
    font-family: 'SaucerBB';
    src: url("./assets/fonts/saucer/SaucerBB.ttf") format("truetype");
  }

  @font-face {
    font-family: 'CoffeeHouse';
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
  #vcontent {
          padding: 48px 0px 0px!important;
  }
    #menumobile {
      display: none;
    }
@media (max-width: 480px) {
    #vcontent {
        padding: 0px 0px 0px!important;
    }
    .v-app-bar {
      display: none;
      height: 0px;
    }
  #menumobile {
    position: fixed;
    margin-top: 0!important;
    display: block;  }
  }
</style>