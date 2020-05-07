<template>
  <div>
    Recettes
    Titre: {{titre}}
    Temps: {{temps}}
    nombre de personnes : {{nbPersonnes}}
    <v-data-table
      id="ingredients"
      :headers="ingredientsHeaders"
      :items="ingredients"
      class="elevation-1"
    ></v-data-table>préparation

    {{processDescription}}
    <v-btn color="success" @click="convert()">convert</v-btn>
    <span v-html="processDescriptionMarked"></span>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  data() {
    return {
      ingredientsHeaders: [
        { text: "nom", value: "nom" },
        { text: "quantité", value: "qty" }
      ],
      ingredients: [
        { nom: "tomates", qty: "2" },
        { nom: "ail", qty: "1" },
        { nom: "poivrons", qty: "2" }
      ],
      nbPersonnes: 2,
      titre: "ratatouille",
      temps: "60min",
      processDescription:"# T1",
      processDescriptionMarked:""
    };
  },
  methods: {
      convert() {
          this.processDescriptionMarked=marked(this.processDescription)
      }
  },

};
</script>

<style lang="scss" scoped>
</style>