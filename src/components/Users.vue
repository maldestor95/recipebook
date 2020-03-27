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
      >
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
      </v-data-table>
    </v-card>

    <v-btn color="success" @click="usersAddDialog()">Add User</v-btn>

    <v-dialog v-model="userEditDialog">
      <v-tabs v-model="tabs" color="primary" slider-color="primary">
        <v-tab>Application</v-tab>
        <v-tab>Details</v-tab>
        <v-tab>Pwd</v-tab>
        <v-tab>Administration</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <!-- TODO  updateApplication-->
          <users-app :details="details" @change="updatePwd"></users-app>
        </v-tab-item>
        <v-tab-item>
    <users-details :details="details" @change="updateDetails"></users-details>
        </v-tab-item>
        <v-tab-item>
          <users-pwd :details="details" @change="updatePwd"></users-pwd>
        </v-tab-item>
        <v-tab-item>
          <!-- TODO  admin-->
          <users-admin :details="details" :toDelete="itemToDelete" @leave="userEditDialog=false;scan()"></users-admin>
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
import qs from "qs";

export default {
  name: "User",
  components: { usersDetails, usersPwd, usersApp, usersAdmin },
  data() {
    return {
      tabs: "",
      itemToDelete:false,
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
      }
    };
  },
  mounted: function() {
    this.scan();
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
    usersAddDialog(){
      this.tabs=3
      this.details={login:null}
      this.userEditDialog=true
      this.itemToDelete=false
    },

    handleClick(value) {
      this.Value = value;
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
      this.itemToDelete=true
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
    }
  }
};
</script>

<style lang="scss" scoped>
.bord {
  border-style: solid;
}
</style>
