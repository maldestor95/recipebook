<template>
  <div>
    <v-data-table
      :headers="value.headers"
      :items="docList"
      class="elevation-1"
      item-key="id"
      @click:row="rowClick($event)"
      :loading="listLoading"
    ></v-data-table>
    <v-btn color="info" @click="newDoc()" v-if="!docFormEditable">New</v-btn>

    <v-btn color="info" @click="cancel()" v-if="docFormEditable">Cancel</v-btn>

    <v-btn color="info" @click="editDocForm()" v-if="!docFormEditable&selected.id!=''">edit</v-btn>

    <v-btn color="info" @click="delDocForm()" v-if="!docFormEditable&selected!={}">delete</v-btn>

    <v-btn color="info" @click="saveDocForm()" v-if="docFormEditable">save</v-btn>

    <docForm
      v-model="selected"
      :editable="docFormEditable"
      :dataFormat="dataFormat"
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
    },
    dataFormat: {
      type: Object,
      default: () => {
        return {};
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
      loading: false,
      err: null,
      editable: false,
      docFormEditable: false,
      beforechange: {},
      selected: {}
    };
  },
  mounted() {
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
    addDocItem(evt) {
      this.$set(this, "docList", [...this.docList, evt]);
    },
    delDocItem(evt) {
      this.$set(
        this,
        "docList",
        this.docList.filter(x => x.id != evt.id)
      );
    },
    rowClick(evt) {
      this.selected = evt;
      this.docFormEditable = false;
    },
    editDocForm() {
      this.docFormEditable = true;
      this.beforechange = JSON.stringify(Object.assign({}, this.selected));
    },
    saveDocForm() {      
      this.loading = true;
      if (this.selected.id != "") {
        this.putDoc(
          this.selected.categorie,
          this.selected.id,
          this.selected.data
        )
          .then(() => {
            this.loading = false;
            this.docFormEditable = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.postDoc(this.selected.categorie, this.selected.data)
          .then(res => {
            this.selected=res
            this.docList.push(res)
            this.loading = false;
            this.docFormEditable = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    delDocForm() {
      this.loading = true;
      this.delDoc(this.selected.categorie, this.selected.id)
        .then(() => {
          this.loading = false;
          this.delDocItem(this.selected);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.docFormEditable = false;
      if (Object.keys(this.beforechange).length==0){
        this.$set(this, "selected", {});
      }
      else {
        this.$set(this, "selected", JSON.parse(this.beforechange));
      }
      let originList = this.docList.map(x => {
        if (x.id!=""){
          if (x.id == this.selected.id & x.id!="") {
            return JSON.parse(this.beforechange)
        }
          return x
        }
      });
      this.$set(this, "docList", originList.filter(x=>x!=null));
    },
    newDoc() {
      this.docFormEditable = true;

      let nnDoc = {
        id: "",
        data: this.emptyObject(JSON.parse(JSON.stringify(this.dataFormat))),
        categorie: this.value.categorie
      };
      this.$set(this, "selected", nnDoc);
    },
    /**
     * change all values of object to empty string
     * @param {Object} obj  - object {G1:{h1:'t1',h2:'t2'}, G2:'t3}
     */
    emptyObject(obj) {
      if (typeof obj === "object") {
        let arr = Object.keys(obj).map(k => {
          let t = Object.create({});
          t[k] = this.emptyObject(obj[k]);
          return t;
        });
        arr = arr.reduce((a, b) => {
          return { ...a, ...b };
        });
        return arr;
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>