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
              <v-btn icon color="primary" v-on="on" @click="userEditDetails(item.login)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit details</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon color="primary" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
              <span>Delete User</span>
          </v-tooltip>

            {{ item.login.toUpperCase() }}
        </template>
      </v-data-table>
    </v-card>
    <users-details :details="details" @change="updateDetails"></users-details>
  </div>
</template>
<script>
import store from "../store.js";
import axios from "axios";
import usersDetails from "./UsersDetails";
import qs from "qs";

export default {
  name: "User",
  components: { usersDetails },
  data() {
    return {
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
    handleClick(value) {
      this.Value = value;
      this.details = {
        login: value.login,
        version: value.version,
        email: value.details.email,
        address: value.details.address,
        phone: value.details.phone
      };
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
    editUsersDetail(){

      this.updateDetails()
    }
  }
};
</script>

<style lang="scss" scoped>
.bord {
  border-color: black;
  border-style: solid;
}
</style>
