<template>
  <div  class="px-3">
      
      <v-row>
        <v-col class="titre  ">Ingrédients</v-col>
        <v-col class= "titre  ">Quantité</v-col>
      </v-row>
      <v-row v-for="ingredient in value" :key="ingredient.id" class="ingredient">
        <v-col class=" py-0">{{ ingredient.nom }}</v-col>
        <v-col class=" py-0">{{ ingredient.qty }}</v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: ()=>[
        {nom:'nom ing1',qty:'qty1'},
        {nom:'nom ing2',qty:'qty2'}
      ]
    },
  },
  
  data() {
    return {
     
  }}
};
</script>

<style lang="scss" scoped>
.titre {
  font-style: italic;
  font-weight: bold;
  text-align: start;
  padding-bottom: 0px;
}
.ingredient {
  border-bottom: solid black ;
  border-bottom-width: 0.1em;
}
.ingredient:last-of-type {
  border: none;
}
</style>