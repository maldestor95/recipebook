<template>
  <div>
    {{err}}
    <v-list>
      <v-list-item v-for="item in fournisseurList" :key="item.id">
        {{ item.data.adresse.societe }} - {{ item.data.adresse.nom }}
      </v-list-item>

    </v-list>
    <v-data-table
      :headers="headers"
      :items="fournisseurList"
      class="elevation-1"
      item-key="id"
      @click:row="selected=$event"
      :loading="listLoading"
    ></v-data-table>
    <v-btn color="info" @click="newFournisseur=true;selected=blankFournisseur" v-if="newFournisseur==false">New</v-btn>
    <v-btn color="info" @click="newFournisseur=false;selected=blankFournisseur" v-if="newFournisseur==true | selected!=blankFournisseur">Cancel</v-btn>
    <fournisseur
      v-if="selected!=blankFournisseur | newFournisseur "
      v-model="selected"
      :editable="newFournisseur"
      @delete="delFournisseur($event)"
      @add="addFournisseur($event)"
    ></fournisseur>
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
          value: "data.adresse.nom"
        },
        { text: "Société", value: "data.adresse.societe" },
        { text: "id", value: "id" }
      ],
      fournisseurList: [
        {
        "categorie": "fournisseur",
        "id": "fc4e6020-e1b3-4069-878e-81c1af5a4442",
        "data": {
            "adresse": {
                "adresse": "40 rue de Paris",
                "complementAdresse": "59000 LILLE",
                "notes": "NOTES",
                "nom": "yes",
                "prenom": "PRENOM",
                "societe": "SOCIETE3"
            }
        },
    },
      ],
        listLoading:true,
      err:null,
      newFournisseur:false,
      blankFournisseur:
        {
            "categorie": "fournisseur",
        "id": "",
        "data": {
            "adresse": {
                "adresse": "",
                "complementAdresse": "",
                "notes": "",
                "nom": "",
                "prenom": "",
                "societe": ""
            }
        }
        },
        selected:{}
    };
  },
  mounted () {
      this.selected=this.blankFournisseur
      this.loadFournisseurList();
  },
  methods: {
    loadFournisseurList() {
      this.getAllDoc("fournisseur")
      .then(data=>{
          this.fournisseurList=data;
          this.listLoading=false
          })
      .catch(err=>this.err=err)
    },
    addFournisseur(evt){
      this.$set(this,'fournisseurList',[...this.fournisseurList,evt])
      },
    delFournisseur(evt){

      this.$set(this, 'fournisseurList',this.fournisseurList.filter(x=>x.id!=evt.id))
    }
    
  }
};
</script>

<style lang="scss" scoped>
</style>