<template>
  <div>
    <v-text-field
      name="searchRecipe"
      v-model="searchRecipe"
      clearable
      outlined
      label="saisir le nom d'une recette"
    ></v-text-field>

    <v-card
      v-for="recette in selectionList"
      :key="recette.id"
      @click="$emit('getRecipe',recette)"
    >{{ recette }}</v-card>
  </div>
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
    }
  },
  data() {
    return {
      searchRecipe: ""
    };
  },
  computed: {
    selectionList() {
      let mapList = this.recettelist.map(x => x.nom);
      if (this.searchRecipe) {
        let r = this.searchRecipe
          .split("")
          .map(x => x.toUpperCase() + ".*")
          .join("");
        const regex = new RegExp(r);
        let ff = mapList.filter(m => regex.test(m.toUpperCase()));
        return ff;
      }
      else
      {
      return mapList
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>