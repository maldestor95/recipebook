<template>
    <v-container>
        <v-tabs v-model="tab">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab>Edit</v-tab>
            <v-tab>Preview</v-tab>
            <v-tab>Valid</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-form>
                    
                    <v-card class="px-1 " >
                        <v-text-field
                            name="titre"
                            v-model="recette.nom"
                            dense
                        ></v-text-field>
                        <v-text-field
                            name="temps"
                            v-model="recette.temps"
                            type="number"
                            prepend-icon="mdi-clock-outline"
                            dense
                        >
                        <template v-slot:append>minutes</template>
                        </v-text-field>
                        <v-text-field
                            name="nbPersonnes"
                            v-model="recette.nbPersonnes"
                            prepend-icon="mdi-account-group-outline"
                            dense
                        >
                         <template v-slot:append>personnes</template>
                        </v-text-field>
                    </v-card>    
                </v-form>

                    <h2>Ingredients</h2>
                    <v-card class="px-1 " >
                        <ingredient-edit v-model="recette.ingredients"></ingredient-edit>
                    </v-card>    
                    
                    <h2>Description</h2>
                   <v-card class="px-1 " >
                        <v-textarea v-model="recette.processDescription"></v-textarea>
                   </v-card>   
            </v-tab-item>
            <v-tab-item>
                <recette-header v-model="recette"></recette-header>
                <ingredients v-model="recette.ingredients"></ingredients>
                <recette-preparation v-model="recette.processDescription"></recette-preparation>
            </v-tab-item>
            <v-tab-item>
                Valider
            </v-tab-item>
        </v-tabs-items>
  
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import {store} from "../../store/index" 
import ingredientEdit from "./ingredientedit"
import recetteHeader from "./recettesheader"
import ingredients from "./ingredients"
import recettePreparation from "./recettepreparation"
    export default {
        components: {
            ingredientEdit,
            recetteHeader,ingredients,recettePreparation
        },
        data() {
            return {
                description: "",
                tab:null,
                recette:store.state.recette.editRecette
            }
        },
        computed: mapState({
            actionState:state=>state.recette.actionState
        })
    }
</script>

<style lang="scss" scoped>
h2{
  color:inherit;
  font-size: 1em;
  margin-right: 1em;
  }
h1 {
  color:inherit;
    font-size: 1.3em;
}
      .v-icon {
        margin-right: 5px;
      }  
</style>