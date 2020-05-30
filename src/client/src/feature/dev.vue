<template>
  <div>
    <p>Page pour le développement de composants ou de Features</p>
    <v-container grid-list-xs>
        
    <msgbox @cancel="state='cancel';activate=false" @ok="state='ok';activate=false" cancel :cardWidth="400" v-model="activate">
      <template v-slot:title>custom Title</template>
      <template v-slot:header>
        <h1>Le titre de ma page</h1>
      </template>
      mon message
    </msgbox>
    </v-container>

<v-btn color="success" @click="activate=true">pop</v-btn>
    {{state}}
  </div>
</template>

<script>
import msgbox from "../components/messagebox";
export default {
  components: {
    msgbox
  },
  data() {
      return {
          state: 'none',
          activate:false
      }
  },
};
</script>

<style lang="scss" scoped>
</style>