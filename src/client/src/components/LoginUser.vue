<template>
  <div>
    <!-- @click="$router.push('loginapp')" -->
    <v-dialog v-model="dialog" v-if="loginstate" max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn class="blue lighten-1 white--text" v-on="on">
          <span>
            <v-icon small>mdi-logout</v-icon>
          </span>
          <v-spacer></v-spacer>
          <span color="white">logout</span>
        </v-btn>
      </template>

      <msgbox cancel @cancel="dialog=false" @ok="logout" :cardWidth="300">
        <template v-slot:title >logout</template>
        Voulez-vous vous vraiment partir?
      </msgbox>
    </v-dialog>

    <v-dialog v-model="dialog" v-if="!loginstate" max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn class="blue lighten-1 white--text" v-on="on">
          <span>
            <v-icon small>"mdi-login"</v-icon>
          </span>
          <v-spacer></v-spacer>
          <span color="white">login</span>
        </v-btn>
      </template>
      <msgbox :cardWidth="400" cancel @cancel="dialog=false" @ok="login">
        <template v-slot:title>
          LOGIN
        </template>
          <form class="mx-5">
            <v-text-field v-model="username" name="username" outlined label="Username" autocomplete="username"></v-text-field>
            <v-text-field v-model="password" type="password" name="password" outlined label="password" autocomplete="current-password"></v-text-field>
          </form>
      </msgbox>
    </v-dialog>
  </div>
</template>

<script>
import msgbox from "./messagebox";
export default {
  components: { msgbox },
  props: {
    logged: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      username: "me",
      password: "tt"
    };
  },
  computed: {
    loginstate() {
      return this.$store.state.username != null;
    }
  },
  methods: {
    login() {
      this.$store.commit("login", { name: this.username, pwd: this.password });
      this.dialog = false;
    },
    logout() {
      this.$store.commit("logout");
      if (this.$router.currentRoute.name!='about') this.$router.push("about");
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.borderout {
  border-color: black;
  border-style: solid;
}

.form {
  background-color: fuchsia;
}
</style>
