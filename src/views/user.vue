<template>
  <div>
    <h1>login</h1>
    <v-form>
      <v-text-field filled label="username" v-model="username"></v-text-field>
      <v-text-field label="password" v-model="password"></v-text-field>
      <v-btn color="success" @click="login">Login</v-btn>
    </v-form>
    <v-container grid-list-md>
      <v-row>username: -{{stateUsername}}-</v-row>
      <v-row>applicationPrivilege: -{{applicationPrivilege}}-</v-row>
    </v-container>
  </div>
</template>

<script>
import { store } from "@/store";
export default {
  data() {
    return {
      storeState: store.state,
      username: null,
      password: null
    };
  },
  methods: {
    login() {
      this.storeState.username = this.username;
      this.$router.push("/expenses");
    }
  },
  computed: {
    stateUsername() {
      return this.storeState.username == undefined ? "none" : this.storeState.username;
    },
    applicationPrivilege() {
      return this.storeState.applicationPrivilege == undefined
        ? "none"
        : this.storeState.applicationPrivilege;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>