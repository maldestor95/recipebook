<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-select :items="appList" v-model="appListSelection" label="Application"></v-select>
        </v-col>
        <v-col cols="4">
          <v-select :items="rightsList" v-model="rightsListSelection" label="Privilege"></v-select>
        </v-col>
        <v-col cols="1">
          <v-btn rounded color="success" @click="add()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container grid-list-xs>
      <v-row v-for="(approle,appname) in userApplication" :key="appname">
        <v-col cols="4">{{appname}}</v-col>
        <v-col cols="4">{{approle}}</v-col>
        <v-col>
          <v-btn icon dense color="error" cols="1" @click="deletePrivilege(appname)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
<v-btn color="info" @click="applyPrivilege()">Apply</v-btn>
  </div>
</template>

<script>
import { userstore } from "./userstore";
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
      userApplication:{...this.value.userApplication},
      login:this.value.login,
      appListSelection: null,
      rightsListSelection: "Viewer",
      activeRow: false,
      debug: ""
    };
  },
  watch: {
    value(newValue) {
      this.userApplication={...newValue.userApplication}
    }
  },
  methods: {
    add(){
      this.$set(this.userApplication,this.appListSelection,this.rightsListSelection)
    },
    Leave() {
      this.$emit("leave");
 
    },
    deletePrivilege(ItemApp) {
      this.$delete(this.userApplication,ItemApp)

    },
    applyPrivilege() {
      userstore.updatePrivilege(this.login,{...this.userApplication})
    },
    
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
