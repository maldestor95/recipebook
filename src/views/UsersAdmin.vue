<template>
  <div>
    <v-alert type="success" dense v-if="errmsg==null&msg!=null">{{msg}}</v-alert>
    <v-alert type="error" dense v-if="errmsg!=null">{{errmsg}}</v-alert>

    <v-text-field rounded label="Login" v-model="details.login"></v-text-field>

    <v-btn
      rounded
      color="primary"
      dark
      @click="deleteUser"
      v-if="details.login"
    >Delete User {{details.login}}</v-btn>

    <v-btn rounded color="primary" dark @click="createUser" v-if="!(errmsg==null&msg!=null)">Create User</v-btn>

    <v-btn rounded color="green" dark @click="Leave" @keyup.esc="Leave">
      <div v-if="errmsg==null&msg!=null">Leave</div>
      <div v-else>Cancel</div>
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  props: {
    details: { type: Object },
    value: { type: Object },
  },
  data() {
    return {
      msg: null,
      errmsg: null
    };
  },
  methods: {
    deleteUser() {
      const user = this.details.login;
      axios
        .delete(`/users/${user}`)
        .then(res => {
          if (res.data.err) {
            this.errmsg = JSON.stringify(res.data.err.message);
          } else {
            this.msg = "succesfully Delete User :" + user + " ";
            this.errmsg = null;
            this.ToDelete = false;
          }
        })
        .catch(err => {
          if (err) {
            this.errmsg = "unable to connect to server " + JSON.stringify(err);
          }
        });
    },
    createUser() {
      const user = this.details.login;
      let data = {
        login: user
      };
      axios
        .post(`/users`, qs.stringify(data))
        .then(res => {
          if (res.data.err) {
            this.errmsg = JSON.stringify(res.data.err.message);
          } else {
            this.msg = "succesfully create User :" + user + " ";
            this.errmsg = null;
            this.ToDelete = false;
          }
        })
        .catch(err => {
          if (err) {
            this.msg = "unable to connect to server " + JSON.stringify(err);
          }
        });
    },
    Leave() {
      this.ToDelete = true;
      this.errmsg = null;
      this.msg = null;
      this.$emit("leave");
    }

    //TODO ongoing
  }
};
</script>

<style lang="scss" scoped>
</style>