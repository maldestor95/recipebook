<template>
    <div>
      <!-- <v-container block class=""> -->

      <v-card flat class="py-0 py-md-1 d-flex menu justify-space-around ">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-chip color="primary" dark v-bind="attrs" v-on="on">
              <v-icon small>mdi-book-open-variant</v-icon>
            </v-chip>
          </template>
          <v-list>
            <v-list-item @click="actionState='recherche'">
              <v-list-item-title>changer de recette</v-list-item-title>
            </v-list-item>
            <v-list-item @click="actionState='editRecette'">
              <v-list-item-title>Editer recette</v-list-item-title>
            </v-list-item>
            <v-list-item @click="actionState='nouvelleRecette'">
              <v-list-item-title>Nouvelle recette</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-text-field v-if="actionState=='recherche'"
          name="searchRecipe" v-model="searchRecipe" 
          clearable 
          class=" py-0 my-0 recherche blue lighten-2"
          label="saisir le nom d'une recette" 
          single-line
          @focus="selectionVisible=true" autocomplete="off"
        ></v-text-field>
      </v-card>
      <!-- </v-container> -->

<p class="my-8 my-sm-0  "></p>
      <recherche-recette v-model="searchRecipe" :recettelist="recetteList" @getRecipe="actionState='voirRecette'"
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
      actionState:"recherche",
      recetteList:[],
      recette:{},
      searchRecipe:""
    };
  },
  mounted() {
    this.$store.dispatch('getRecettesList')
    .then(()=>{
      this.recetteList=store.state.recette.recetteList
    });
  },
  computed: {

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
  position:fixed;
  top:5px;
  z-index: 105;
  background-color: cadetblue;
}
.recherche {
  height: 25px!important;
}
</style>