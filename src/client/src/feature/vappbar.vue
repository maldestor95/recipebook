<template>
    <!-- <v-app-bar fixed color="blue" text-color="white">
         -->
         <div>
        <cog @click.native="$emit('togglenavdrawer')"></cog>
      <v-spacer></v-spacer>
      <recette-menu v-if="currentRouteName=='recettes'"></recette-menu>
      <v-spacer></v-spacer>
      <login-user v-model="value"></login-user>
    <!-- </v-app-bar> -->
         </div>
</template>

<script>
import cog from "../components/cog"
import loginUser from '../components/LoginUser'
import recetteMenu from '../feature/recette/navmenu'
    export default {
        props: {
            value: {
                type: Boolean,
                default:false
                } 
        },
    components: {
        cog,loginUser,recetteMenu
    },    
    computed: {
        currentRouteName() {
            return this.$route.name
        }
    },    
    }
</script>

<style lang="scss" scoped>

</style>