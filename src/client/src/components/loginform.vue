<template>
  <v-card raised>
    <v-container v-if="$store.state.username==null">
      <h1 class="text-center">Malestor95</h1>
      <p class="text-center">Login</p>

      <v-text-field v-model="username" name="username" outlined label="Username or email address"></v-text-field>
      <v-text-field v-model="password" name="password" outlined label="password"></v-text-field>

      <v-row>
        <v-spacer></v-spacer>
        <v-btn rounded color="primary" @click="login" class="d-flex-inline justify-start">Sign in</v-btn>
        <v-spacer></v-spacer>
        <v-btn raised rounded color="primary" @click="$emit('input',false)">Cancel</v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>

    <v-container v-if="$store.state.username!=null">
      <v-row no-gutters>
        <v-col md="12" align="center">
          <p>Are you sure you want to log out?</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md="6" align="center">
          <v-btn color="primary" @click="logout">Yes</v-btn>
        </v-col>
        <v-col md="6" align="center">
          <v-btn color="primary" @click="dialog = false">No</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  props: {

  },
  data() {
    return {
      username: "me",
      password: "tt",
      loginDialog: true
    };
  },
  methods: {
    login() {
      this.$store.commit('login',{name:this.username, pwd:this.password});
      this.loginDialog = false;
      this.$router.push("about");
    },
    logout() {
      this.$store.commit('logout')
      this.$router.push("about");
      this.loginDialog = true;
    },
    cancelLogout() {
      this.$router.push("about");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>