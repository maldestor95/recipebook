<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="small primary light">
        <v-icon small>{{islogged==true?'mdi-logout':'mdi-login'}}</v-icon>
      </v-btn>
    </template>

    <!-- logout -->
    <v-card v-if="islogged" class="blue lighten-2">
      <v-row class="borderout">
        <v-col class="mb-12 borderout pink lighten-2">
          <p>Are you sure you want to log out?</p>
        </v-col>
      </v-row>
      <v-row class="red lighten-3" no-gutters>
        <v-col class="mb-3 borderout">
          <v-btn color="primary" @click="logout">confirm</v-btn>
        </v-col>
        <v-col class="mb-6 borderout">
          <v-btn color="primary" @click="dialog=false">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- login -->
    <v-card v-if="!islogged">
      <v-text-field name="username" outlined label="Username or email address"></v-text-field>
      <v-row>
        <v-col md6>
          <p>forgot password?</p>
        </v-col>
      </v-row>
      <v-row>
        <v-text-field name="password" outlined label="password"></v-text-field>
      </v-row>
      <v-row>
        <v-btn md3 color="success">create new user</v-btn>
        <v-btn md3 color="primary" @click="login">Login</v-btn>
        <v-btn sm6 color="primary" @click="dialog=false">
          <v-icon>mdi-cancel</v-icon>
        </v-btn>
      </v-row>
    </v-card>

    <!-- form new user -->
    <v-card></v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    logged: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      islogged: this.logged,
      dialog: false
    };
  },
  methods: {
    logout() {
      this.dialog = false;
      this.islogged = false;
    },
    login() {
      this.dialog = false;
      this.islogged = true;
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

