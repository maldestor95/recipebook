<template>
   <section id="searchRecipe">
    
    <v-text-field
      name="searchRecipe"
      v-model="searchRecipe"
      clearable
      dense
      label="saisir le nom d'une recette"
      @focus="selectionVisible=true"
    ></v-text-field>

<v-container class="d-flex flex-wrap">
  
      <v-card
        v-for="recette in selectionList"
        :key="recette.id"
        @click="$emit('getrecipe',recette); searchRecipe=recette; selectionVisible=false"
        class="recettesummary"
        >{{ recette }}
      </v-card>

</v-container>
      {{selectionList}}
    
  </section>
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
      selectionVisible: false,
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: ['foo', 'bar'],
      valuevv: null,
    };
  },
  computed: {
    selectionList() {
      let mapList = this.recettelist.map(x => this.cleanUpSpecialChars(x.nom)).sort();
      if (this.searchRecipe) {
        let r = this.cleanUpSpecialChars(this.searchRecipe)
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
  },
  methods: {
    cleanUpSpecialChars(str) {
      str = str.replace(/é|è|ê/g, "e");
      str = str.replace(/à|â|Â/g, "a");
      str = str.replace(/ô/g, "o");
      str = str.replace(/ù/g, "ù");
      str = str.replace(/ï/g, "i");
      return str;
    }
  },
};
</script>

<style lang="scss" scoped>
.recettesummary {
  background-color: beige;
  width: 300px;
}
</style>