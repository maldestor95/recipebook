
<template>
    <section id="ViewRecette" class="px-2">
        <recette-header v-model="recette"></recette-header>
        <ingredients v-model="recette.ingredients"></ingredients>
        <recette-preparation v-model="recette.processDescription"></recette-preparation>
    </section>
</template>

<script>
import {store} from "../../store/index"
import recetteHeader from "./recettesheader"
import ingredients from "./ingredients"
import recettePreparation from "./recettepreparation"
export default {
    components: {
        recetteHeader,
        ingredients,recettePreparation
    },
    computed: {
        recette() {
            return store.state.recette.recette

        }
    },
}
</script>

<style lang="scss" scoped>
</style>