<template>
  <div>
    <h1>User Pwd</h1>
    <v-alert type="primary" dense>{{msg}}</v-alert>
    <v-form>
      <h3>Old Password: {{oldpwd}}</h3>
      <v-text-field filled label="New Password" v-model="details.pwd"></v-text-field>
      <v-btn rounded color="primary" dark @click="updatePwd">Change Password</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  props: {
    details: { type: Object }
  },
  data() {
    return {
      Ddetails: this.details,
      oldpwd: this.details.pwd,
      msg:"debug message"
    };
  },
  methods: {
    updatePwd() {
      const user = this.details.login;
      let data = {
          pwd: this.details.pwd,
        version: this.details.version
      };
      axios
        .put(`/users/${user}/pwd`, qs.stringify(data))
        .then(res => {
          if (res.data.err) {
            this.msg = JSON.stringify(res.data.err.message);
          }
          else
          {
              this.msg="succesfuly Pwd update of "+user+" " 
          }
        })
        .catch(err => {
            if (err) {
            this.msg = "unable to connect to server "+ JSON.stringify(err);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>