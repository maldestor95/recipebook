<template>
  <div id="supplier">
    <adresse v-model="value.data" :editable="editableComputed"></adresse>
    <v-btn color="info" @click="saveSupplier()" v-if="editableComputed" :loading="loading">save</v-btn>
    <v-btn color="info" @click="editSupplier()" v-if="!editableComputed">edit</v-btn>
    <v-btn color="info" @click="delSupplier()">delete</v-btn>
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
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          categorie: "fournisseur",
          id: "fc4e6020-e1b3-4069-878e-81c1af5a4442",
          data: {
            adresse: {
              adresse: "40 rue de Paris",
              complementAdresse: "59000 LILLE",
              notes: "NOTES",
              nom: "yes",
              prenom: "PRENOM",
              societe: "SOCIETE3"
            }
          }
        };
      }
    },
    editable: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: false,
      editableComputed: this.editable
    };
  },
  methods: {
    editSupplier() {
      this.editableComputed = true;
    },
    saveSupplier() {
      this.editableComputed = false;
      this.loading = true;
      if (this.value.id != "") {
        this.putDoc("fournisseur", this.value.id, this.value.data)
          .then(() => {
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.postDoc("fournisseur", this.value.data)
          .then(() => {
            this.loading = false;
            this.$emit('add',this.value)
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    delSupplier() {
      this.loading = true;
      this.delDoc("fournisseur", this.value.id)
        .then(() => {
          this.loading = false;
          this.$emit('delete',this.value)
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>