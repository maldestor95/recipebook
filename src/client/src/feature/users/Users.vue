<template>
  <v-container>
    <v-row>
      <v-alert type="success" :value="true" v-if="userStoreState.msg">{{userStoreState.msg}}</v-alert>
      <v-alert type="info" :value="true" v-if="userStoreState.err!=null">{{userStoreState.err}}</v-alert>
    </v-row>
    <v-row>
        Users
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <!-- </v-card-title> -->
      </v-row>
      <!-- {{userStoreState.users.length}} -->
      <v-row>
        <v-data-table
          :headers="headers"
          :items="userStoreState.users"
          v-model="selected"
          item-key="login"
          :search="search"
          @click:row="handleClick"
          
          :show-select="allowDeleteUser"
          :sort-by="['userApplication','login']"
          :class="{loading:userStoreState.users.length==0}"
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
              v-for="(appRight,app) in item.userApplication"
              :key="app.id"
              :class="appRight"
            >{{ app }}</v-chip>
          </template>
        </v-data-table>
        <!-- </v-card> -->
      </v-row>

    <v-row>
      <div v-if="!EditUserForm">
        <v-btn color="success" @click="userAddDialog=true">Add User</v-btn>
        <v-btn
          color="success"
          @click="allowDeleteUser=!allowDeleteUser"
          v-if="isRoot()"
        >{{allowDeleteUser?'quit delete menu':'active delete menu'}}</v-btn>

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

      <v-dialog v-model="EditUserForm" max-width="800">
        <user-edit
          :details="selectedUser"
          v-model="selectedUser"
          v-if="EditUserForm"
          @leave="EditUserForm=false;"
          :appList="appList"
          :rightsList="rightsList"
          :edit="itemToDelete"
        ></user-edit>
      </v-dialog>
      <users-admin @leave="userAddDialog=false" v-if="userAddDialog"></users-admin>
    </v-row>
  </v-container>
</template>
<script>
import { store } from "../../store/index.js";
import { userstore } from "./userstore.js";
import usersApi from "./usersapi";
import userEdit from "./UsersEdit";
import usersAdmin from "./UsersAdmin";

export default {
  name: "User",
  components: { userEdit, usersAdmin },

  data() {
    return {
      userStoreState: userstore.state,
      userEditDialog: false,
      userAddDialog: false,
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
        { text: "Version", value: "version" },
        { text: "Password", value: "pwd" }
      ],
      selectedUser: {
        email: "selectedUserEmailInitial",
        phone: "selectedUserPhoneInitial",
        address: "selectedUserAddressInitial"
      },
      appList: [],
      rightsList: [],
      EditUserForm: false,
      debug: "none",
      confirmDialog: false,
      activeTab: 3,
      allowDeleteUser: false
    };
  },
  mounted: function() {
    userstore.scan().then(() => {
      this.userStoreState = userstore.getState();
    });
    // this.scan();
    this.getAppList();
  },
  methods: {
    handleClick(selectedUser) {
      this.EditUserForm = true;
      this.itemToDelete = true;
      this.activeTab = 0;
      this.selectedUser = selectedUser;
    },
    // methods used to initiate the Applist
    getAppList() {
      let _this = this;
      usersApi
        .getApplicationList()
        .then(data => {
          _this.appList = data.application;
          _this.rightsList = data.role;
        })
        .catch(err => {
          _this.appList = err;
        });
    },
    isRoot() {
      let t = this.$store.getters.getApplicationAccess("Users");
      return t == "Root" ? true : false;
    },
    DeleteSelectedUsers() {
      let listOfUserToDelete = this.selected.map(x => {
        return x.login;
      });

      let PromiseTable = listOfUserToDelete.map(x => userstore.deleteUser(x));
      Promise.all(PromiseTable)
        .then(function() {
          this.userStoreState = userstore.state;
        })
        .catch(err => {
          this.debug = JSON.stringify(err);
          this.userStoreState = userstore.state;
        });
    }
  },
  computed: {
    selectUserToDelete() {
      return this.isRoot();
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
.loading {
  color: transparent;
  background: linear-gradient(100deg, #eceff1 30%, #f6f7f8 50%, #eceff1 70%);
  background-size: 400%;
  animation: loading 1.2s ease-in-out infinite;
}
@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 100 50%;
  }
}
</style>
