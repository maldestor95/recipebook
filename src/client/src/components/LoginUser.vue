<template>
  <v-dialog v-model="dialog" persistent max-width="600" @keydown.esc="dialog = false">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="blue lighten-1 white--text">
        <span>
          <v-icon small>
            {{
            value? "mdi-logout" : "mdi-login"
            }}
          </v-icon>
        </span>
        <v-spacer></v-spacer>
        <span color="white">{{value ? " logout" : " login"}}</span>
      </v-btn>
    </template>

    <!-- logout -->
    <v-card v-if="value" raised>
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
    </v-card>

    <!-- login -->
    <v-card v-if="!value" raised>
      <v-container>
        <h1 class="text-center"> Malestor95 </h1>
      <p class="text-center">Login</p>

      <v-text-field v-model="username" name="username" outlined label="Username or email address"></v-text-field>
      <v-text-field v-model="password" name="password" outlined label="password"></v-text-field>

        <v-row>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" @click="login" class="d-flex-inline justify-start">Sign in</v-btn>
          <v-spacer></v-spacer>
          <v-btn raised rounded color="primary" @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { store } from "../store.js";

export default {
  props: {
    logged: {
      type: Boolean,
      default: true
    },
    value:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      storeState: store.state,
      username: "me",
      password: "tt",
      dialog: this.value,
      debug: "none"
    };
  },
  computed: {},
  methods: {
    logout() {
      store.logout();
      this.$router.push("about");
      this.dialog = false;
      this.$emit('input',false)
    },
    login() {
      store.login(this.username, this.password);
      this.dialog = false;
      this.$emit('input',true)
    },
    escapeform() {
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
