<template>
  <div id="supplier">

    <adresse v-model="fournisseur.adresse" :editable="editable"></adresse>
    <v-btn color="info" @click="save" v-if="editable">save</v-btn>
    <v-btn color="info" @click="edit" v-if="!editable">edit</v-btn>
    <v-btn color="info" @click="del" >delete</v-btn>
  </div>
</template>

<script>
import adresse from "./addresse";

export default {
  components: {
    adresse
  },
  data() {
    return {
      editable: false,
      fournisseur: {
        adresse: {
          nom: "NOM",
          prenom: "PRENOM",
          societe: "SOCIETE",
          adresse: "40 rue de Paris",
          complementAdresse: "59000 LILLE",
          notes: "NOTES"
        },
      }
    };
  },
  methods: {
      edit() {
          this.editable=true
      },
      save() {
          this.editable=false
          
      },
      del() {
          
      }
  },
};
</script>

<style lang="scss" scoped>
</style>