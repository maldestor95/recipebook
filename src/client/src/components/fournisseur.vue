<template>
  <div id="supplier">
    <adresse v-model="fournisseur.adresse" :editable="editable"></adresse>
    <v-btn color="info" @click="saveSupplier()" v-if="editable">save</v-btn>
    <v-btn color="info" @click="editSupplier()" v-if="!editable">edit</v-btn>
    <v-btn color="info" @click="delSupplier()">delete</v-btn>
    <v-btn color="info" @click="newSupplier()">new</v-btn>
  </div>
</template>

<script>
import adresse from "./addresse";
import docaxios from "../mixins/mixin_doc";

export default {
  mixins: [docaxios],
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
        }
      }
    };
  },
  methods: {
    editSupplier() {
      this.editable = true;
    },
    saveSupplier() {
      this.editable = false;
    },
    delSupplier() {},
    newSupplier() {
      this.$set(this, 'fournisseur', {
        adresse: {
          nom: "",
          prenom: "",
          societe: "",
          adresse: "",
          complementAdresse: "",
          notes: ""
        }
      });
      this.editable = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>