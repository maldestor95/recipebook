<template>
  <div>
    <h1>About</h1>
    <p>
      <router-link to="/Expenses">Go to Expenses</router-link>
    </p>
    <p>
      <router-link to="/users">Go to Users</router-link>
    </p>
    <p>
      <router-link to="scoreboard">ScoreBoard</router-link>
    </p>
    <p>
      {{sess}}
      <br>{{username}}

      <br>{{applicationPrivilege}}
      <br>
      <v-btn color="success" @click="getSess">getSess</v-btn>
    </p>
  </div>
</template>

<script>
// import {store} from '../store'

export default {
  data() {
    return {
      sess: 'session',
      username:'none',
      applicationPrivilege:{}
    }
  },
  methods: {
    getSess() {
      if (sessionStorage.getItem('sessionID')){
        this.sess= JSON.parse(sessionStorage.getItem('sessionID'))
        this.username=this.sess.username
        this.applicationPrivilege=this.sess.applicationPrivilege       
        }
      else{
        this.sess= 'none'
        this.username='none'
        this.applicationPrivilege='none'      

      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
