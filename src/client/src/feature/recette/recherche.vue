<template>
<section id="searchRecipe" class="py-0">

    <v-row >
        <v-card v-for="recette in updateSelectionList()" :key="recette.id" class="d-flex flex-wrap recettesummary"
          @click="getRecette(recette.id) " >{{ recette.nom }}
        </v-card>
    </v-row>

</section>
</template>

<script>
  import {
    store
  } from "../../store/index"
export default {
  mounted () {
    this.$store.dispatch('getRecettesList');
  },
  props: {
    value: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      selectionVisible: false,
      localSearchString:"",
      sList:[]
};
  },
watch: {
  searchString(newValue) {
    if (newValue=="") this.sList=this.orderedRecipeList
    this.localSearchString=newValue
    this.updateSelectionList()
  }
},

  computed: {
    searchString(){return store.state.recette.searchString},
    orderedRecipeList(){
      const capitalise=(nom)=>nom.charAt(0).toUpperCase() + nom.substring(1)
      const recipeList=this.recettelist.map(x=>{return {nom:capitalise(x.nom),id:x.id}})
      
      const orderedRecipeByName=this.recettelist.map(x=>capitalise(x.nom)).sort()
      const orderedRecipeList=orderedRecipeByName.map(name=> recipeList.filter(x=>x.nom==name)[0])
      
      return orderedRecipeList
    },
    recettelist(){
      return store.state.recette.recetteList
    }

  },
  methods: {
    cleanUpSpecialChars(str) {
      if (str==null) return ""
      str = str.replace(/é|è|ê/g, "e");
      str = str.replace(/à|â|Â/g, "a");
      str = str.replace(/ô/g, "o");
      str = str.replace(/ù/g, "ù");
      str = str.replace(/ï/g, "i");
      return str;
    },
    getRecette(recetteId){
            this.$store.dispatch('getRecette',recetteId)
            .then(()=>{ this.recette=store.state.recette.recette
                        this.$store.commit('changeRecetteActionState','voirRecette')
            });
        },
    updateSelectionList() {
      const searchString= this.localSearchString.length==0?"":this.localSearchString
      let r = this.cleanUpSpecialChars(searchString)
          .split("")
          .map(x => x.toUpperCase() + ".*")
          .join("");
        const regex = new RegExp(r);

      return this.orderedRecipeList.filter(recipe=> regex.test(recipe.nom.toUpperCase()))
    }

  }
};
</script>

<style lang="scss" scoped>
.recettesummary {
  width: 340px;
  margin: 5px 5px 5px;
}
.searchRecipe {
  margin-left: 70px;
  margin-top: 15px;
}

</style>