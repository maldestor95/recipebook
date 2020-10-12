<template>
    <div>
Carousel




<p>
    <v-text-field filled label="label" v-model="recetteRefId"></v-text-field>
<v-btn color="success" @click="getRecette(recetteRefId)">getRecette</v-btn>
</p>

<h2>Recette</h2>



    </div>
</template>

<script>
  import {
    store
  } from "../../store/index"
    export default {
    data() {
        return {
            recetteStore: store.state.recette,
            recetteRefId:"66f3a420-f899-4fd0-b981-54c1ca2ca1d7",
            recette:{}
        }
    },
    methods: {

        getRecette(recetteId){
            this.$store.dispatch('getRecette',recetteId)
            .then(()=>{this.recette=store.state.recette.recette

            });
        }
    },
    computed: {
        listNames() {
            return store.state.recette.recetteList.map(x => x.nom);
        },
        recetteList(){
            return store.state.recette.recetteList
        }
        
    },
    }
</script>

<style lang="scss" scoped>
p {
    background-color: bisque;
    margin-top: 10px;
    padding: 10px;
}
</style>