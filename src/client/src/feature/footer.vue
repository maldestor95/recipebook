<template>
<div>

  <v-footer class='black white--text ' padless>
    <v-container>

      <v-row justify="center">
        <cog @click.native="gohome()" class='cog'></cog>
      </v-row>

      <v-row class="d-flex flex-column flex-sm-row align-center">
        <v-spacer></v-spacer>
        <a @click="goto('politiqueCookie')">Politique de Cookie</a>
        <v-spacer></v-spacer>
        <a @click="goto('politiqueConfidentialite')">Politique de confidentialité</a>
        <v-spacer></v-spacer>
        <a @click="goto('politiqueLegale')">Mentions légales</a>
        <v-spacer></v-spacer>

      </v-row>
      <v-row justify="center">
        <a href='https://www.linkedin.com/in/ldeparis/' target="_blank">
          <v-icon class='white--text'>mdi-linkedin</v-icon>
        </a>
        <a href='https://github.com/maldestor95' target="_blank">
          <v-icon class='white--text'>mdi-github</v-icon>
        </a>
      </v-row>
      <v-row justify="center">
        <span>Copyright  © 2019-{{new Date().getFullYear()}}</span>
      </v-row>

    </v-container>
  </v-footer>
  </div>

</template>

<script>
import cog from "../components/cog"
    export default {
        components: {
          cog,
        },
        methods: {
          next(link) {
            window.open(link)
          }
          ,
          gohome(){
            if (this.$router.currentRoute.name!='about') this.$router.push("about");
          },
          goto(path){
           if (`${this.$router.currentRoute.name}`!=path) this.$router.push(path);
          } 
          
        },
    }
</script>

<style lang="scss" scoped>
a {
  color :inherit;
  text-decoration: none;
}

.row {
  padding-bottom: 10px;
}
</style>      