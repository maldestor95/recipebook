


<template>


    <doclist v-model="list" type="text" :dataFormat="dataFormat">
      <template v-slot:title>Feature Bouteille</template>
    </doclist>

</template>

<script>
import doclist from "../components/doclist";
export default {
  components: {
    doclist
  },
  data() {
    return {
      list: {
        categorie: "vin",
        headers: [
          {
            text: "Nom",
            align: "start",
            sortable: true,
            value: "data.nom"
          },
          { text: "type", value: "data.type", sortable: true },
          { text: "Région", value: "data.region", sortable: true },

          {
            text: "Quantité achetée",
            value: "data.qtyBought",
            sortable: false
          },
          { text: "Millesime", value: "data.millesime", sortable: true },
          {
            text: "A consommer avant",
            value: "data.bestBefore",
            sortable: true
          },
          {
            text: "A consommer après",
            value: "data.bestAfter",
            sortable: true
          },
          { test: "notes", value: "data.notes", sortable: false },
          
          {text: "Prix", value:"data.prix"},
          {text: "Vigneron", value:"data.vigneron"}
          
        ]
      },
      dataFormat: {
        nom: "Nom",
        vigneron:"Vigneron",
        region: "Région (Alsace, Bourgogne, Bordeaux",
        type: "Type de vin (rouge, blanc ...)",
        qtyBought: "Quantité achetée",
        millesime: "Millésime",
        bestBefore: "A consommer avant",
        bestAfter: "A consommer après",
        notes: "notes",
        prix: "prix TTC",
        image: 'Image'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
