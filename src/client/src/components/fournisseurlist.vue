<template>
  <div>{{err}}
      {{fournisseurList}}
    <v-btn color="info" @click="loadFournisseurList()">Load</v-btn>
    <v-data-table :headers="headers" :items="fournisseurList" class="elevation-1"></v-data-table>
    <fournisseur></fournisseur>
  </div>
</template>

<script>
import fournisseur from "./fournisseur";
import docaxios from "../mixins/mixin_doc";

export default {
  mixins: [docaxios],
  components: {
    fournisseur
  },
  data() {
    return {
      headers: [
        {
          text: "Nom",
          align: "start",
          sortable: false,
          value: "adresse.nom"
        },
        { text: "Société", value: "adresse.societe" },
        { text: "id", value: "id" }
      ],
      fournisseurList: [
        {
          adresse: {
            nom: "NOM",
            prenom: "PRENOM",
            societe: "SOCIETE",
            adresse: "40 rue de Paris",
            complementAdresse: "59000 LILLE",
            notes: "NOTES"
          },
          id: "123"
        }
      ],
      err:null
    };
  },
  methods: {
    loadFournisseurList() {
      this.getAllDoc("fournisseur")
      .then(data=>this.fournisseurList=data)
      .catch(err=>this.err=err)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>