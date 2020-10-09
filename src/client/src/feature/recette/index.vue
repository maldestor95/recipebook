<template>
    <div>
            <search-recette
                :recettelist="recetteList"
                @getRecipe="getRecette($event)"
                :loading="getLoading">
            </search-recette>
            <recherche-recette></recherche-recette>
            <carousel-recette></carousel-recette>
            <view-recette></view-recette>
            <edit-recette></edit-recette>

    </div>
</template>

<script>
import searchRecette from "./recettelist"
import axios from "axios";
import qs from "qs";
import ingredients from "./ingredients";
import preparation from "./recettepreparation";
import recetteHeader from "./recettesheader";

import carouselRecette from './carousel'
import editRecette from './edit'
import viewRecette from './view'
import rechercheRecette from './recherche'
    export default {
        components: {
            // eslint-disable-next-line vue/no-unused-components
            searchRecette, ingredients, preparation, recetteHeader,
            carouselRecette,editRecette,viewRecette,rechercheRecette
            
            },
  data() {
    return {
      saved: false,
      editable: false,
      ingredientsHeaders: [
        { text: "nom", value: "nom", sortable: true },
        { text: "quantité", value: "qty" }
      ],
      recette: {
        id: "5512af64-2f2c-4680-9768-3d8d36e051a3",
        nbPersonnes: 2,
        nom: "ratatouille",
        temps: "60min",
        processDescription: "# T1",
        ingredients: [
          { nom: "tomates", qty: 2 },
          { nom: "ail", qty: 1 },
          { nom: "poivrons", qty: 2 }
        ]
      },
      definitions: {
        ingredients: ["tomates", "champignons", "ail"]
      },
      newIngredients: {
        nom: "",
        qty: 0
      },
      newKeyIngredient: "",
      debug: "",
      recetteList: [
        { nom: "ratatouille", id: "5512af64-2f2c-4680-9768-3d8d36e051a3" }
      ],
      selectedRecette: "ratatouille",

      searchRecipe: "",
      updateLoading: false,
      getLoading: false
    };
  },
  mounted() {
    axios
      .get("/recettes")
      .then(data => {
        this.recetteList = data.data;
        let rand = Math.floor(Math.random() * this.recetteList.length);
        this.getRecette(this.recetteList[rand].nom);
      })
      .catch(err => {
        this.debug = err;
      });
  },
  methods: {
    getRecette(recette) {
      this.getLoading = true;
      let recetteId = this.recetteList.filter(x => x.nom == recette)[0].id;
      axios
        .get("/recette/" + recetteId)
        .then(data => {
          this.recette = data.data;
          this.getLoading = false;
        })
        .catch(err => {
          this.debug = err;
          this.getLoading = false;
        });
    },
    updateRecette() {
      let _this = this;
      this.updateLoading = true;
      this.recette.ingredients = this.recette.ingredients
        .filter(x => x.nom.length > 0)
        .map(x => {
          return { nom: x.nom, qty: x.qty };
        });
      axios
        .put("/recette/" + this.recette.id, qs.stringify(this.recette))
        .then(data => {
          this.debug = data;
          if (
            _this.recetteList.map(x => x.id == _this.recette.id).length == 0
          ) {
            _this.recetteList.push([
              { nom: _this.recetteList.nom, id: _this.recette.id }
            ]);
          }
          this.updateLoading = false;
          this.editable = false;
        })
        .catch(err => {
          this.debug = err;
          this.updateLoading = false;
        });
    },
    newRecette() {
      this.recette = {
        id: this.$uuid.v4(),
        nbPersonnes: 1,
        nom: "",
        temps: "",
        processDescription: "",
        ingredients: []
      };
      this.editable = true;
    },
    updateIngredientList(event) {
      this.debug = event;
      this.$set(this.recette, "ingredients", event);
    }
  },
  computed: {
    recetteListNames() {
      return this.recetteList.map(x => x.nom);
    },
    alreadyChoosen() {
      return this.recette.ingredients.map(x => x.nom);
    }
  }
};
</script>

<style lang="scss" scoped>
#recette {
  color: red;
  border: red;
  border-style: solid;
}
</style>