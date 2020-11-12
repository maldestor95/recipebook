<template>
    <div class="d-flex align-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-chip color="primary" dark v-bind="attrs" v-on="on">
              <v-icon >mdi-book-open-variant</v-icon>
            </v-chip>
          </template>
          <v-list>
            <v-list-item @click="changeActionState('recherche')">
              <v-list-item-title>changer de recette</v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeActionState('editRecette')">
              <v-list-item-title>Editer recette</v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeActionState('nouvelleRecette')">
              <v-list-item-title>Nouvelle recette</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <textfield 
          :disabled="disabled"
          v-model="searchRecipe" @input="updateSearchString(searchRecipe)" >
        </textfield>
       
    </div>
</template>

<script>
    import {store} from "../../store/index"
    import textfield from "../../components/textfield.vue"

    export default {

components: {
    textfield
},
        data() {
            return {
                searchRecipe:store.state.recette.searchString,
                disabled:false
            }
        },
        methods: {
            changeActionState(newActionState) {
                store.commit('changeRecetteActionState',newActionState)
            },
            updateSearchString(searchString) {
                store.commit('updateRecetteSearchString',searchString)
            },
            clearRecipeString(){
              this.searchRecipe=''
            }
        },
        computed: {
            actionState() {
                return store.state.recette.actionState
            },
            storeString(){
              if (store.state.recette.searchString=="") this.clearRecipeString()

              return store.state.recette.searchString
            }
        },
        watch: {
          searchRecipe(newValue) {
            if (newValue.length>0) {
              this.changeActionState('recherche')
              this.updateSearchString(newValue)
              }
          },
        },      
    }
</script>

<style lang="scss" scoped>
.textSearch {
    background-color: beige;
}
.v-input__slot {

    background-color: red;
}
.debug {
background-color: pink;}
</style>