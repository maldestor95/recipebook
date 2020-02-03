<template>
    <v-dialog v-model="dialog" persistent max-width="400">
    
        <template v-slot:activator="{ on }">
    
          <v-btn v-on="on" class="small primary light">
    
            <v-icon small>{{islogged==true?'mdi-logout':'mdi-login'}}</v-icon>
    
          </v-btn>
</template>

    <!-- logout -->
    <v-card v-if="islogged" >
      <v-row no-gutters>
        <v-col 
          md="12"
          align="center"
        >
          <p>Are you sure you want to log out?</p>
        </v-col>
      </v-row>
      <v-row  no-gutters>
        <v-col 
          md="6"
          align="center">
          <v-btn color="primary" @click="logout">Yes</v-btn>
        </v-col>
        <v-col md="6" align="center">
          <v-btn color="primary" @click="dialog=false">
            No
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <br>
      </v-row>
    </v-card>

    <!-- login -->
    <v-card v-if="!islogged">      
      <v-row no-gutters>
        <v-col align="center">
        <h1 >
            Login
        </h1>
        </v-col>
      </v-row>
      <v-row no-gutters dense>
        <v-col align="center" cols="10" offset="1">
          <v-text-field name="username" outlined label="Username or email address"></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col 
          align="center"
          md="4"
        >
          <p >forgot password?</p>
        </v-col>
        <v-col offset-md="2" md="4">
          <v-btn md-4 color="success">create new user</v-btn>
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col
          align="center"
          cols="10"
          offset="1"
        >

        <v-text-field name="password" outlined label="password"></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters dense>
        <v-col  align="center">
          <v-btn raised rounded md3 color="primary" @click="login">Login</v-btn>
        </v-col>
        <v-col>
        </v-col>
        <v-col>
          <v-btn raised rounded md3 color="primary" @click="dialog=false">Cancel</v-btn>
        </v-col>
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

