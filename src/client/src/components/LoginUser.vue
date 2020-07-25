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
        <template v-slot:title>Malestor95 - LOGOUT</template>
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
      <msgbox :cardWidth="400">
        <template v-slot:title>
          Malestor95 - LOGIN
        </template>

        <v-text-field v-model="username" name="username" outlined label="Username"></v-text-field>
        <v-text-field v-model="password" type="password" name="password" outlined label="password"></v-text-field>

        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" @click="login" class="d-flex-inline justify-start">Sign in</v-btn>
          <v-spacer></v-spacer>
          <v-btn raised rounded color="primary" @click="dialog=false">Cancel</v-btn>
          <v-spacer></v-spacer>
        </template>
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
      this.$router.push("about");
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("about");
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
</style>
