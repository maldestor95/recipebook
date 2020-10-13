<template>
    <div>
<h2>Carousel</h2>
<textfield class="test"></textfield>


    </div>
</template>

<script>
  import {
    store
  } from "../../store/index"
  import textfield from "../../components/textfield.vue"
    export default {
        components: {
            textfield,
        },
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
.test {
background-color: beige;
}
</style>