<template>
  <v-app class='background'>
    <cv class='background'></cv>
  </v-app>
</template>

<script>
import cv from './components/cv'
// import cv from './components/cv3'

export default {
  name: 'App',

  components: {
    cv
  },

  data: () => ({
    //
  })
}

</script>
<style  lang="scss">
.v-application--wrap {background: #004D40;}
</style>
