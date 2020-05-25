<template>
  <div>
    {{err}}
    {{value}}
    -----
    {{selected}}

    <v-data-table
      :headers="value.headers"
      :items="docList"
      class="elevation-1"
      item-key="id"
      @click:row="selected=$event"
      :loading="listLoading"
    ></v-data-table>
    <v-btn
      color="info"
      @click="newDoc=true;selected=blankDoc"
      v-if="newDoc==false"
    >New</v-btn>
    <v-btn
      color="info"
      @click="newDoc=false;selected=blankDoc"
      v-if="newDoc==true | selected!=blankDoc"
    >Cancel</v-btn>
    <docForm
      v-if="selected!=blankDoc | newDoc "
      v-model="selected"
      :editable="newDoc"
      @delete="delDoc($event)"
      @add="addDoc($event)"
    ></docForm>
  </div>
</template>

<script>
import docForm from "./docform";
import docaxios from "../mixins/mixin_doc";

export default {
  mixins: [docaxios],
  components: {
    docForm
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          categorie: "fournisseur",
          headers: [
            {
              text: "Nom",
              align: "start",
              sortable: false,
              value: "data.adresse.nom"
            },
            { text: "Société", value: "data.adresse.societe" },
            { text: "id", value: "id" }
          ]
        };
      }
    }
  },
  data() {
    return {
      docList: [
        {
          categorie: this.value.categorie,
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
        }
      ],
      listLoading: true,
      err: null,
      newDoc: false,
      blankDoc: {
        categorie: this.value.categorie,
        id: "",
        data: {
          adresse: {
            adresse: "",
            complementAdresse: "",
            notes: "",
            nom: "",
            prenom: "",
            societe: ""
          }
        }
      },
      selected: {}
    };
  },
  mounted() {
    this.selected = this.blankDoc;
    this.loadList();
  },
  methods: {
    loadList() {
      this.getAllDoc(this.value.categorie)
        .then(data => {
          this.docList = data;
          this.listLoading = false;
        })
        .catch(err => (this.err = err));
    },
    addDoc(evt) {
      this.$set(this, "docList", [...this.docList, evt]);
    },
    delDoc(evt) {
      this.$set(
        this,
        "docList",
        this.docList.filter(x => x.id != evt.id)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>