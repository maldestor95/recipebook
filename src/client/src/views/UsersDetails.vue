<template>
  <div>

    <v-form>
      <v-text-field filled label="Address" v-model="details.address"></v-text-field>
      <v-text-field filled label="Email" v-model="details.email"></v-text-field>
      <v-text-field filled label="Phone" v-model="details.phone"></v-text-field>
      <v-btn rounded color="primary" dark @click="sendForm">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import { userstore } from "./userstore";
export default {
  props: {
    value: {
      type: Object,
      default() {
        return { login: null, details: { address: "", email: "", phone: "" } };
      }
    }
  },
  data() {
    return {
      details: {
        address: this.value.details.address ? this.value.details.address : null,
        email: this.value.details.email ? this.value.details.email : null,
        phone: this.value.details.phone ? this.value.details.phone : null
      }
    };
  },
  watch: {
      value(newValue) {
          this.details=newValue.details
          
      }
  },
  methods: {
    sendForm() {
      userstore.updateDetails(this.value.login, {
        address: this.details.address,
        email: this.details.email,
        phone: this.details.phone
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>