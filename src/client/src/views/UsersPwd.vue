<template>
  <div>

    
    <v-form>
      <h3>Old Password: {{oldPwd}}</h3>
      <v-text-field filled label="New Password" v-model="pwd"></v-text-field>
      <v-btn rounded color="primary"  @click="changePwd" :disabled="disableChangeBtn">Change Password</v-btn>
    </v-form>
  </div>
</template>

<script>

import {userstore} from './userstore'

export default {
  props: {
    value: {  type: Object ,
                default(){return {'login':'none',"pwd":null}}
    }
  },
  data() {
    return {
      oldPwd:this.value.pwd,
      pwd:""
    };
  },
  watch: {
    value(newValue) {
      this.oldPwd=newValue.pwd
    }
  },
  computed: {
    disableChangeBtn(){
      return Boolean((this.pwd=='') | (this.pwd==this.oldPwd))
    }
  },
  methods: {
    changePwd() {
      userstore.updatePwd(this.value.login,this.pwd)
      this.oldPwd=this.pwd
      
      
    }
  }
};
</script>

<style lang="scss" scoped>
</style>