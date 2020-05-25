<template>
  <div>
    <doclist v-model="list" type="text"></doclist>
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
        categorie: "fournisseur",
        headers: [
          {
            text: "Nom",
            align: "start",
            sortable: true,
            value: "data.adresse.nom"
          },
          { text: "Société", value: "data.adresse.societe" ,sortable: true},
          { text: "Prénom", value: "data.adresse.prenom" ,sortable: true},
          { text: "Notes", value: "data.adresse.notes",sortable: false },
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>