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

        <textfield v-model="searchRecipe" @input="updateSearchString(searchRecipe)"/>
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
                searchRecipe:""
            }
        },
        methods: {
            changeActionState(newActionState) {
                store.commit('changeRecetteActionState',newActionState)
            },
            updateSearchString(searchString) {
                store.commit('updateRecetteSearchString',searchString)
            }
        },
        computed: {
            actionState() {
                return store.state.recette.actionState
            }
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