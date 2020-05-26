<template>
  <div>
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
          { text: "Id", value:"id"}
        ]
      },
        dataFormat: {
            adresse:{
                societe:"Societé",
                nom:"Nom",
                prenom:"Prenom",
                notes:"Notes",
                adresse:"Adresse",
                complementAdresse: "Complément adresse",
                phonenumber:"Téléphone"
            }
        }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>