<template>
  <v-container class="white scroll-y" style="height: 450px">
    <v-row class="grey lighten-5" justify="center">
      <h1>Update of <span class="blue--text">{{value.login}}</span></h1>
    </v-row>

    <v-tabs v-model="
    activeTabs" color="primary" slider-color="primary">
      <v-tab :createUser="isDisabled">Application</v-tab>
      <v-tab :createUser="isDisabled">Details</v-tab>
      <v-tab :createUser="isDisabled">Pwd</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTabs">
      <v-tab-item>
        <users-app
          v-model="value"
          :appList="appList"
          :rightsList="rightsList"
          @change="updateApp"
          @leave="leave"
        ></users-app>
      </v-tab-item>

      <v-tab-item>
        <users-details v-model="value" @leave="leave"></users-details>
      </v-tab-item>
      <v-tab-item>
        <users-pwd v-model="value" @leave="leave"></users-pwd>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import usersDetails from "./UsersDetails";
import usersPwd from "./UsersPwd";
import usersApp from "./UsersApp";

import { userstore } from "./userstore";

export default {
  components: { usersDetails, usersPwd, usersApp },
  props: {
    userEditDialog: {
      type: Boolean,
      default: false
    },
    details: {
      type: Object
    },
    appList: {
      type: Array,
      default() {
        return [];
      }
    },
    rightsList: {
      type: Array,
      default() {
        return [];
      }
    },
    createUser: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default() {
        return { login: null };
      }
    },
    edit: { type: Boolean, default: false }
  },
  data() {
    return {
      isDisabled: false,
      activeTabs: this.value,
      errmsg: null,
      statusmsg: null,
      userStoreState: userstore.state
    };
  },
  methods: {
    updateApp() {},
    leave(event) {
      this.errmsg = event.errmsg;
      this.statusmsg = event.statusmsg;
      this.$emit("leave");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>