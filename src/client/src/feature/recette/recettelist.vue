<template>
  <v-card :loading="loading" width="320">
    
    <v-text-field
      name="searchRecipe"
      v-model="searchRecipe"
      clearable
      dense
      label="saisir le nom d'une recette"
      @focus="selectionVisible=true"
    ></v-text-field>

    <div v-if="selectionVisible">
      <v-card
        v-for="recette in selectionList"
        :key="recette.id"
        @click="$emit('getRecipe',recette); searchRecipe=recette; selectionVisible=false"
      >{{ recette }}
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    recettelist: {
      type: Array,
      default: () => {
        return [
          { nom: "ratatouille", id: "5512af64-2f2c-4680-9768-3d8d36e051a3" }
        ];
      }
    },
    value: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchRecipe: "",
      selectionVisible: false
    };
  },
  computed: {
    selectionList() {
      let mapList = this.recettelist.map(x => x.nom).sort();
      if (this.searchRecipe) {
        let r = this.searchRecipe
          .split("")
          .map(x => x.toUpperCase() + ".*")
          .join("");
        const regex = new RegExp(r);
        let ff = mapList.filter(m => regex.test(m.toUpperCase()));
        return ff;
      } else {
        return mapList;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>