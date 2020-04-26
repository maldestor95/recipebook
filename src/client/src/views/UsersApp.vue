<template>
  <div>
    <h1>Edit Privileges for user ---- {{value.login}}</h1>
    <v-container>
      <v-row>
        <v-col>
          <v-select :items="appList" v-model="appListSelection" label="Application"></v-select>
        </v-col>
        <v-col>
          <v-select :items="rightsList" v-model="rightsListSelection" label="Privilege"></v-select>
        </v-col>
        <v-col cols="1">
          <v-btn rounded color="success" @click="addPrivilege()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container grid-list-xs>
      <v-row v-for="(appname,index) in value.userApplication" :key="index">
        <v-col cols="1">{{index}}</v-col>
        <v-col>{{Object.keys(appname)[0]}}</v-col>
        <v-col>{{Object.values(appname)[0]}}</v-col>
        <v-col>
          <v-btn icon dense color="error" cols="1" @click="deletePrivilege(appname)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import usersApi from "../components/usersapi";
export default {
  props: {
    appList: { type: Array },
    rightsList: { type: Array },
    value: {
      type: Object,
      default: function() {
        return {
          userApplication: [
            { Users: "Root" },
            { Todo: "Viewer" },
            { Expenses: "Manager" }
          ],
          login: "toto",
          version: 123
        };
      }
    }
  },
  data() {
    return {
      appListSelection: null,
      rightsListSelection: "Viewer",
      activeRow: false,
      debug: ""
    };
  },
  methods: {
    Leave() {
      this.$emit("leave")
      // TODO
    },
    deletePrivilege(ItemApp) {
      let newupdateApp = this.value.userApplication.filter(x => {
        return Object.keys(x)[0] != Object.keys(ItemApp)[0];
      });
let _this=this
       usersApi
          .updateApplication({
            login: this.value.login,
            version: this.value.version,
            userApplication: newupdateApp
          })
          .then(response => {
            _this.value.version += 1;
            _this.debug = response;
            // _this.value.userApplication=newupdateApp

          })
          .catch(err => {
            _this.debug = err;
          });
    },
    addPrivilege() {
      let activeKeyList = this.value.userApplication.map(function(x) {
        return Object.keys(x)[0];
      });
      if (activeKeyList.lastIndexOf(this.appListSelection) < 0) {
        let newApp = {};
        newApp[this.appListSelection] = this.rightsListSelection;
        let _this=this
        let newAppList=this.value.userApplication
        newAppList.push(newApp);
        usersApi
          .updateApplication({
            login: this.value.login,
            version: this.value.version,
            userApplication: newAppList
          })
          .then(response => {
            _this.value.version += 1;
            _this.debug = response;
            
          })
          .catch(err => {
            _this.debug = err;
          });
      } else {
        // TODO message because the list of user is not accessible
      }
    }
  }
};
// BUG list not updated when a privilege is deleted
</script>

<style lang="scss" scoped>
.focusEntry {
  border: pink;
  color: red;
}
</style>
