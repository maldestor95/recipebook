<template>
  <div>
    <v-alert type="info">{{msg}}</v-alert>
    <v-card>
      <v-card-title>
        Users
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <!-- show-select -->
      <!-- single-select -->
      <v-data-table
        :headers="headers"
        :items="Users"
        v-model="selected"
        item-key="login"
        :search="search"
        @click:row="handleClick"
        dense
        :sort-by="['userApplication','login']"
      >
        <!-- TODO custom sort by user Application -->
        <template v-slot:item.login="{item}">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon color="primary" v-on="on" @click="userEditDialog=true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          {{ item.login.toUpperCase() }}
        </template>

        <template v-slot:item.userApplication="{item}">
          <v-chip
            v-for="uApp in item.userApplication"
            :key="uApp.id"
            :class="Object.values(uApp)[0]"
          >{{ Object.keys(uApp)[0] }}</v-chip>
        </template>
      </v-data-table>
    </v-card>

    <v-btn color="success" @click="usersAddDialog()">Add User</v-btn>

    <v-dialog v-model="userEditDialog" persistent @keyup.esc="Leave">
      <v-tabs v-model="tabs" color="primary" slider-color="primary">
        <v-tab :disabled="isDisabled">Application</v-tab>
        <v-tab :disabled="isDisabled">Details</v-tab>
        <v-tab :disabled="isDisabled">Pwd</v-tab>
        <v-tab>Administration</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <!-- TODO  updateApplication-->
          <users-app
            v-model="details"
            :appList="appList"
            :rightsList="rightsList"
            @change="updateApp"
            @leave="userEditDialog=false;scan()"
          ></users-app>
        </v-tab-item>

        <v-tab-item>
          <users-details
            :details="details"
            @change="updateDetails"
            @leave="userEditDialog=false;scan()"
          ></users-details>
        </v-tab-item>

        <v-tab-item>
          <users-pwd :details="details" @change="updatePwd" @leave="userEditDialog=false;scan()"></users-pwd>
        </v-tab-item>

        <v-tab-item>
          <users-admin
            :details="details"
            :toDelete="itemToDelete"
            @leave="userEditDialog=false;scan()"
          ></users-admin>
        </v-tab-item>
      </v-tabs-items>
    </v-dialog>
  </div>
</template>
<script>
import store from "../store.js";
import axios from "axios";
import usersDetails from "./UsersDetails";
import usersPwd from "./UsersPwd";
import usersApp from "./UsersApp";
import usersAdmin from "./UsersAdmin";
import usersApi from "./usersapi";

import qs from "qs";

export default {
  name: "User",
  components: { usersDetails, usersPwd, usersApp, usersAdmin },
  data() {
    return {
      tabs: "",
      itemToDelete: false,
      userEditDialog: false,
      search: "",
      singleSelect: false,
      selected: [],
      msg: "",
      showMsg: false,
      storeState: store.state,
      Users: [],
      headers: [
        { text: "Login", value: "login" },
        { text: "UserApplication", value: "userApplication" },
        { text: "Phone", value: "details.phone" },
        { text: "Email", value: "details.email" },
        { text: "Address", value: "details.address" },
        { text: "Version", value: "version" }
      ],
      details: {
        email: "selectedUserEmailInitial",
        phone: "selectedUserPhoneInitial",
        address: "selectedUserAddressInitial"
      },
      appList: [],
      rightsList: [],
      isDisabled: true
    };
  },
  mounted: function() {
    this.scan();
    this.getAppList();
  },
  methods: {
    scan() {
      axios
        .get("/API/users/scan", null)
        .then(res => {
          this.Users = res.data.Items;
        })
        .catch(err => {
          this.Users = err;
        });
    },
    usersAddDialog() {
      this.isDisabled = true;
      this.tabs = 3;
      this.details = { login: null };
      this.userEditDialog = true;
      this.itemToDelete = false;
    },

    handleClick(value) {
      this.Value = value;
      this.isDisabled = false;
      // this.$set(this.details,'login',value.login)
      this.details = {
        login: value.login,
        version: value.version,
        email: value.details.email,
        address: value.details.address,
        phone: value.details.phone,
        pwd: value.pwd,
        userApplication: value.userApplication
      };
      this.itemToDelete = true;
    },
    updateDetails() {
      const user = this.details.login;
      let data = {
        details: {
          address: this.details.address,
          email: this.details.email,
          phone: this.details.phone
        },
        version: this.details.version
      };
      axios
        .put(`/API/users/${user}/details`, qs.stringify(data))
        .then(res => {
          if (res) {
            this.msg = JSON.stringify(`Update details of ${user}`);
            this.showMsg = true;
            this.scan();
          }
        })
        .catch(err => {
          if (err) {
            this.msg = JSON.stringify(err);
            this.showMsg = true;
          }
        });
    },
    updatePwd() {
      const user = this.details.login;
      let data = {
        details: {
          address: this.details.address,
          email: this.details.email,
          phone: this.details.phone
        },
        version: this.details.version
      };
      axios
        .put(`/API/users/${user}/details`, qs.stringify(data))
        .then(res => {
          if (res) {
            this.msg = JSON.stringify(`Update details of ${user}`);
            this.showMsg = true;
            this.scan();
          }
        })
        .catch(err => {
          if (err) {
            this.msg = JSON.stringify(err);
            this.showMsg = true;
          }
        });
    },
    updateApp() {},

    // methods used to initiate the Applist
    getAppList() {
      usersApi
        .getApplicationList()
        .then(data => {
          this.appList = data.application;
          this.rightsList = data.role;
        })
        .catch(err => {
          this.appList = err;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.bord {
  border-style: solid;
}
.Root {
  color: red;
}
.Manager {
  color: blue;
}
.Editor {
  color: pink;
}
.Viewer {
  color: green;
}
</style>
