<template>
  <v-app>
    <v-app-bar dense app color="primary" dark>
      <v-icon @click="navdrawer=!navdrawer">mdi-menu</v-icon>
      <v-spacer></v-spacer>
      <h1>{{currentApp}}</h1>
      <v-spacer></v-spacer>
      <login-user color="info"></login-user>
    </v-app-bar>
    <v-content>
      <v-row>
        <v-col fluid>
          <v-navigation-drawer temporary v-model="navdrawer">
            <v-list dense>
              <v-subheader>TOOLS</v-subheader>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in navlist" :key="i">
                  <div v-if="item.logrequired">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </div>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </v-col>

        <v-col>
          <v-container>
            <v-row>
              <v-col>
                <h1>Is Logged ?{{Store.logged}}</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
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
        icon: "mdi-alert-box",
        text: "Risks",
        logrequired: false
      },
      {
        icon: "mdi-cash-100",
        text: "Expenses",
        logrequired: true
      }
    ]
  }),
  computed: {
    navlistfilter() {
      return this.data;
    }
  }
};
</script>
