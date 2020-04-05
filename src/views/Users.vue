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
        :show-select="isRoot()"
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

    <div v-if="!EditUserForm">
      <v-btn color="success" @click="usersAddDialog()">Add User</v-btn>
      <v-dialog
        v-model="confirmDialog"
        persistent
        max-width="400"
        v-if="isRoot()&&selected.length!=0"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Delete selected Users</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Confirmation required!</v-card-title>
          <v-card-text>Are you sure you want to delete the selected users?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="confirmDialog = false">Disagree</v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="DeleteSelectedUsers() ; confirmDialog = false; selected=[]"
            >Confirm Delete Selected Users</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-if="EditUserForm">
            <v-btn color="success" @click="EditUserForm=false">Cancel</v-btn>
    </div>

    <user-edit
      :details="details"
      v-if="EditUserForm"
      @leave="EditUserForm=false;scan()"
      :appList="appList"
      :rightsList="rightsList"
      v-model="activeTab"
    ></user-edit>
  </div>
</template>
<script>
import { store } from "../store.js";
import axios from "axios";
import usersApi from "../components/usersapi";
import userEdit from "./UsersEdit";

export default {
  name: "User",
  components: { userEdit },

  data() {
    return {
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
      EditUserForm: false,
      debug: "none",
      confirmDialog: false,
      activeTab: 3
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
      this.EditUserForm = true;
      this.details = { login: null };
      this.userEditDialog = true;
      this.activeTab = 3;
      this.itemToDelete = false;
    },

    handleClick(value) {
      this.Value = value;
      this.EditUserForm = true;
      this.activeTab = 0;

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
    },
    isRoot() {
      let t = store.getApplicationAccess("Users");
      return t == "Root" ? true : false;
    },
    DeleteSelectedUsers() {
      let listOfUserToDelete = this.selected.map(x => {
        return x.login;
      });
      let vscan = this.scan;
      let PromiseTable = listOfUserToDelete.map(x => this.UserToDel(x));
      Promise.all(PromiseTable)
        .then(function() {
          vscan();
        })
        .catch(err => {
          this.debug = JSON.stringify(err);
          vscan();
        });
    },
    UserToDel(user) {
      return new Promise(function(resolve, reject) {
        axios
          .delete(`/API/users/${user}`)
          .then(res => {
            if (res.data.err) {
              reject(JSON.stringify(res.data.err.message));
            } else {
              resolve("succesfully Delete User :" + user);
            }
          })
          .catch(err => {
            reject("unable to connect to server " + JSON.stringify(err));
          });
      });
    }
  },
  computed: {}
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
