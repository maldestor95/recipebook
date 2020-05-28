


<template>
  <div>
    <h1>Feature Bouteille</h1>
    <doclist v-model="list" type="text" :dataFormat="dataFormat"></doclist>
  </div>
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
          
          { text: "Quantité achetée", value: "data.qtyBought", sortable: false },
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
          { text: "Id", value: "id" }
        ]
      },
      dataFormat: {
        nom: "Nom",
        region : "Région (Alsace, Bourgogne, Bordeaux",
        type: "Type de vin (rouge, blanc ...)",
        qtyBought: "Quantité achetée",
        millesime: "Millésime",
        bestBefore: "A consommer avant",
        bestAfter: "A consommer après",
        notes: "notes"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
