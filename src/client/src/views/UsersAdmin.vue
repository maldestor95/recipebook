<template>
  <div>
     <v-text-field rounded label="Login" v-model="value.login"></v-text-field>

     <v-btn rounded color="primary" dark @click="createUser" v-if="!edit">Create User</v-btn>

  </div>
</template>

<script>
import {userstore} from './userstore'

export default {
  props: {
    value: { type: Object ,default(){return{login:null}}},
    edit:{type:Boolean,default:false}
  },
  data() {
    return {
      userStoreState: userstore.state,
    };
  },
  methods: {

    createUser(){
      userstore.createUser(this.value.login)
      this.$emit('input',{login:this.value.login})
      this.$emit("leave");
    }
 
  }
};
</script>

<style lang="scss" scoped>
</style>