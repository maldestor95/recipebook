<template>
  <div>
    <h1>login</h1>
<v-form>
  <v-text-field filled label="username" v-model="username"></v-text-field>
  <v-text-field
    label="password"
    v-model="password"
  ></v-text-field>
  <v-btn color="success" @click="login">Login</v-btn>
</v-form>
<v-container grid-list-md>
  <v-row>
    username: -{{stateUsername}}-
  </v-row>
  <v-row>
    applicationPrivilege: -{{applicationPrivilege}}-
  </v-row>
</v-container>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      username:null,
      password:null
    }
  },
  methods: {
    login() {
      store.state.username=this.username
      this.$router.push('/expenses')
    }
  },
  computed: {
    stateUsername() {
      return store.state.username==undefined?"none" : store.state.username
    },
    applicationPrivilege(){
      return store.state.applicationPrivilege==undefined?"none" : store.state.applicationPrivilege

    }
  },
};
</script>

<style lang="scss" scoped>
</style>