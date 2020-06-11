<template>
  <div id="supplier">
    <div v-for="(elt,eltname) in dataFormat" :key="elt.id">
      <div v-if="typeof(elt)==='object'">
        <div v-for="(item,name) in elt" :key="item.id">
          <v-text-field
            :label="name"
            v-model="dataIn.data[eltname][name]"
            v-if="isDefined(eltname,name)"
            :disabled="!editable"
          ></v-text-field>
        </div>
      </div>
      <div v-else>
        <v-text-field
          :label="elt"
          v-model="dataIn.data[eltname]"
          :disabled="!editable"
          v-if="dataIn.data"
        ></v-text-field>        
      </div>
    </div>
        <img-upload @saveModifiedCanvas="uploadImgToS3" :pictureName="dataIn.id" v-if="editable"></img-upload>
{{dataIn}}


  </div>
</template>

<script>

import imgUpload from "./imgupload";
import docaxios from "../mixins/mixin_doc";

export default {
  mixins: [docaxios],
  components: {
    imgUpload
  },
  model: {
    prop: "dataIn",
    event: "change"
  },
  props: {
    dataIn: {
      type: Object,
      default: () => {
        return {id:""};
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
    uploadImgToS3(){
      // let fname=this.data.id+'./jpg'
// this.postFileToS3(this.data.categorie, this.data.id, mydata,fname) 
    }
    
  }
};
</script>

<style lang="scss" scoped>
</style>