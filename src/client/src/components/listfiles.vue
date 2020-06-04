<template>
  <div>
    <v-text-field label="label" name="name" textarea v-model="path"></v-text-field>
    <v-btn color="info" @click="dir()">Dir</v-btn>
    <ul>
      <li v-for="item in listfiles" :key="item.id">{{ item.Key }}</li>
    </ul>
    {{debug}}
  </div>
</template>

<script>
import * as axios from "axios";
export default {
  data() {
    return {
      listfiles: [],
      path: "pics",
      debug: {}
    };
  },
  methods: {
    dir() {
      axios.get(`/dir/${this.path}`).then(x => {
        this.listfiles = x.data.Contents;//.map(k => k.Key);
        this.debug = x.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>