<template>
  <div id="supplier">
    <!-- <adresse v-model="value.data" :editable="editableComputed"></adresse> -->
    <p>Value - {{dataIn}}</p>

    <v-btn color="info" @click="newDoc()" v-if="!editableComputed">New</v-btn>

    <v-btn color="info" @click="cancel()" v-if="editableComputed">Cancel</v-btn>

    <v-btn color="info" @click="editDocForm()" v-if="!editableComputed">edit</v-btn>

    <v-btn color="info" @click="delDocForm()" v-if="!editableComputed">delete</v-btn>
    {{dataIn.id}}
    <p>datain.data - {{dataIn.data}}</p>
    <div v-for="(elt,eltname) in dataFormat" :key="elt.id">
      <div v-if="typeof(elt)==='object'">
        <!-- <p>Elt- {{elt}}</p> -->
        <div v-for="(item,name) in elt" :key="item.id">
          <v-text-field
            :label="name"
            v-model="dataIn.data[eltname][name]"
            v-if="isDefined(eltname,name)"
            :disabled="!editableComputed"
          ></v-text-field>
        </div>
      </div>
      <div v-else>
        <v-text-field
          :label="name"
          v-for="(item,name) in elt"
          :key="item.id"
          v-model="dataIn.data[name]"
        ></v-text-field>
      </div>
    </div>
    <p>
      Data -
      {{data}}
    </p>
    <!-- v-model="data[eltname][name]" -->
    <p>
      DataFormat -
      {{dataFormat}}
    </p>
    <v-btn color="info" @click="saveDocForm()" v-if="editableComputed" :loading="loading">save</v-btn>
    {{beforechange}}
  </div>
</template>

<script>
// import adresse from "./addresse";
import docaxios from "../mixins/mixin_doc";

export default {
  mixins: [docaxios],
  components: {
    // adresse
  },
  model: {
    prop: "dataIn",
    event: "change"
  },
  props: {
    dataIn: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dataFormat: {
      type: Object,
      default: () => {
        return {};
      }
    },
    editable: { type: Boolean, default: false }
  },
  data() {
    return {
      data: { ...this.dataIn.data },
      loading: false,
      editableComputed: this.editable,
      blankDoc: {
        categorie: this.dataIn.categorie,
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
      beforechange: {}
    };
  },
  watch: {
    dataIn(newValue) {
      this.data = Object.assign({}, newValue.data);
    }
  },
  computed: {},
  methods: {
    isDefined(eltname, name) {
      try {
        return this.data[eltname][name].length > -1;
      } catch (error) {
        return false;
      }
    },
    editDocForm() {
      this.editableComputed = true;
      this.beforechange = JSON.stringify(Object.assign({}, this.dataIn.data));
    },
    saveDocForm() {
      this.editableComputed = false;
      this.loading = true;
      if (this.dataIn.id != "") {
        this.putDoc(this.dataIn.categorie, this.dataIn.id, this.dataIn.data)
          .then(() => {
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.postDoc(this.dataIn.categorie, this.dataIn.data)
          .then((res) => {
            this.loading = false;
            this.$emit("add", res);
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    delDocForm() {
      this.loading = true;
      this.delDoc(this.dataIn.categorie, this.dataIn.id)
        .then(() => {
          this.loading = false;
          this.$emit("delete", this.dataIn);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.editableComputed = false;
      this.dataIn.data = JSON.parse(this.beforechange);
    },
    newDoc() {
      if (Object.keys(this.dataIn).includes('id') > 0) {
        this.beforechange = JSON.stringify(Object.assign({}, this.dataIn.data));
      }
      this.editableComputed = true;
      this.$set(this.dataIn,'data', JSON.parse(JSON.stringify(this.dataFormat)))
      this.$set(this.dataIn,'id',"")
      this.$set(this.dataIn,'data',this.emptyObject(this.dataIn.data));
    },
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
      /*
      datain.data - 
      { "adresse": { "adresse": "", "complementAdresse": "", "notes": "", "nom": "test", "prenom": "incroyable", "societe": "" } }
      { "adresse": { "societe": "", "nom": "", "prenom": "", "notes": "" } }
      - { "adresse": { "adresse": "", "complementAdresse": "", "notes": "", "nom": "toto", "prenom": "", "societe": "" } }
      */
    }
  }
};
</script>

<style lang="scss" scoped>
</style>