<template>
  <div>
    <v-tabs v-model="
    value" color="primary" slider-color="primary">
      <v-tab :createUser="isDisabled">Application</v-tab>
      <v-tab :createUser="isDisabled">Details</v-tab>
      <v-tab :createUser="isDisabled">Pwd</v-tab>
      <v-tab>Administration</v-tab>
    </v-tabs>

    <v-tabs-items v-model="value">
      <v-tab-item>
        <!-- TODO  updateApplication-->
        <users-app
          v-model="details"
          :appList="appList"
          :rightsList="rightsList"
          @change="updateApp"
          @leave="leave"
        ></users-app>
      </v-tab-item>

      <v-tab-item>
        <users-details :details="details" @change="updateDetails" @leave="leave" ></users-details>
      </v-tab-item>

      <v-tab-item>
        <users-pwd :details="details" @change="updatePwd" @leave="leave" ></users-pwd>
      </v-tab-item>

      <v-tab-item>
        <users-admin :details="details" @leave="leave" ></users-admin>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import usersDetails from "./UsersDetails";
import usersPwd from "./UsersPwd";
import usersApp from "./UsersApp";
import usersAdmin from "./UsersAdmin";
import axios from "axios";
import qs from "qs";

export default {
  components: { usersDetails, usersPwd, usersApp, usersAdmin },
  props: {
    userEditDialog: {
      type: Boolean,
      default: false
    },
    details: {
      type: Object
    },
    appList: {
      type: Array,
      default() {
        return [];
      }
    },
    rightsList: {
      type: Array,
      default() {
        return [];
      }
    },
    createUser: {
      type: Boolean,
      default: false
    },
    value: { type: Number, default: 0 }
  },
  data() {
    return {
      isDisabled: false,
      activeTabs: ""
    };
  },
  methods: {
    updateDetails() {
      const user = this.details.login;

      let data = {
        details: {
          address: this.details.address,
          email: this.details.email,
          phone: this.details.phone
        },
        version: this.details.version
      };
      axios
        .put(`/API/users/${user}/details`, qs.stringify(data))
        .then(res => {
          if (res) {
            this.msg = JSON.stringify(`Update details of ${user}`);
            this.showMsg = true;
            this.scan();
          }
        })
        .catch(err => {
          if (err) {
            this.msg = JSON.stringify(err);
            this.showMsg = true;
          }
        });
    },
    updatePwd() {
      const user = this.details.login;
      let data = {
        details: {
          address: this.details.address,
          email: this.details.email,
          phone: this.details.phone
        },
        version: this.details.version
      };
      axios
        .put(`/API/users/${user}/details`, qs.stringify(data))
        .then(res => {
          if (res) {
            this.msg = JSON.stringify(`Update details of ${user}`);
            this.showMsg = true;
            this.scan();
          }
        })
        .catch(err => {
          if (err) {
            this.msg = JSON.stringify(err);
            this.showMsg = true;
          }
        });
    },
    updateApp() {},
    leave() {
      this.$emit("leave");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>