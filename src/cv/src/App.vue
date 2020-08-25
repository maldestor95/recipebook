<template>
  <v-app class='background'>

    <cv class='background'></cv>
    <p/>
    <p>
      <v-footer class='teal darken-3 menuFont--text ' absolute>
        <a href='../'>Site Personnel</a>
        <v-spacer></v-spacer>
        <v-icon class='menuFont--text'>mdi-copyright</v-icon>L.Deparis
      </v-footer>
    </p>
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

<style scoped lang="scss">
.bordertop {
  border: red 10px solid;
}
a.hover {
  color: $menuFont;
}
</style>
