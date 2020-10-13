<template>
    <div>
      
      <recherche-recette v-model="searchRecipe" :recettelist="recetteList"
      v-if="actionState=='recherche'"
      class="px-3"
      >
      </recherche-recette>

      <!-- <carousel-recette></carousel-recette> -->

      <view-recette v-model="recette" v-if="actionState=='recherche'| actionState=='voirRecette'"></view-recette>

      <edit-recette v-if="actionState=='editRecette'|actionState=='nouvelleRecette'"></edit-recette>

    </div>
</template>

<script>
import {store} from "../../store/index"

import ingredients from "./ingredients";

import preparation from "./recettepreparation";
import recetteHeader from "./recettesheader";

import carouselRecette from './carousel'
import editRecette from './edit'
import viewRecette from './view'
import rechercheRecette from './recherche'
    export default {
        components: {
            // eslint-disable-next-line vue/no-unused-components
            ingredients, preparation, recetteHeader,
            // eslint-disable-next-line vue/no-unused-components
            carouselRecette,editRecette,viewRecette,rechercheRecette
            
            },
  data() {
    return {
      searchRecipe:store.state.recette.searchRecipe,
      recetteList:[],
      recette:{},
      
    };
  },

  mounted() {
    this.$store.dispatch('getRecettesList')
    .then(()=>{
      this.recetteList=store.state.recette.recetteList
    });
  },
  computed: {
    actionState(){ return store.state.recette.actionState}
  }
};
</script>

<style lang="scss" scoped>
#recette {
  color: red;
  border: red;
  border-style: solid;
}
.menu {
  // position:fixed;
  display: none;
  top:5px;
  z-index: 105;
  background-color: cadetblue;
}
.recherche {
  height: 25px!important;
}
</style>