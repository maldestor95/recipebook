
<template>
    <section id="ViewRecette" class="px-2">
        <recette-header></recette-header>
        <ingredients></ingredients>
        <recette-preparation></recette-preparation>
    </section>
</template>

<script>
import recetteHeader from "./recettesheader"
import ingredients from "./ingredients"
import recettePreparation from "./recettepreparation"
export default {
    components: {
        recetteHeader,
        // eslint-disable-next-line vue/no-unused-components
        ingredients,recettePreparation
    }
}
</script>

<style lang="scss" scoped>
</style>