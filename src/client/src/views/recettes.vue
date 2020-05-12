<template>
  <div>
    <!-- {{isAutorised}}
    <v-btn color="success" v-if="checkAuth('Recettes','Editor')">checkAuth "Recettes":"Editor"</v-btn>
    <v-btn color="success" v-if="checkAuth('Recettes','Viewer')">checkAuth "Recettes":"Viewer"</v-btn>
    <v-btn color="success" v-if="checkAuth('Recettes','Manager')">checkAuth "Recettes":"Manager"</v-btn>
    <v-btn color="success" @click="getAuth()">get Auth </v-btn>
    {{auth}}

    <v-btn color="success" @click="newRecette() " v-if="checkAuth('Recettes','Editor')">new Recette si  "Recettes":"Editor"</v-btn>-->

    <v-container fluid>
      <v-row v-if="checkAuth('Recettes','Editor')">
      <!-- <v-row > -->
        <v-btn color="success" @click="newRecette() " v-if="!editable">Nouvelle recette</v-btn>
        <v-btn color="success" @click="editable=true" v-if="!editable">Editer</v-btn>
        <v-btn
          color="success"
          @click="updateRecette()"
          v-if="editable"
          :loading="updateLoading"
        >update recette</v-btn>
        <v-btn color="success" @click="editable=false" v-if="editable">cancel</v-btn>
      </v-row>
      <v-row>
        <recetteindex
          :recettelist="recetteList"
          @getRecipe="getRecette($event)"
          :loading="getLoading"
        ></recetteindex>
      </v-row>

      <v-row justify="center" align="end">
        <v-col cols="12">
          <recette-header :editable="editable" v-model="recette" @edit="editable=true"></recette-header>
        </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="pa-0 ma-0">
          <h1 class="d-flex justify-center">INGREDIENTS</h1>
          <ingredients
            v-model="recette.ingredients"
            :editable="editable"
            @updateIngredientList="updateIngredientList($event)"
          ></ingredients>
        </v-col>
        <v-col class="px-0">
          <h1 class="d-flex justify-center">PREPARATION</h1>
          <preparation v-model="recette.processDescription" :editable="editable"></preparation>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import uuid from "uuid";
import axios from "axios";
import qs from "qs";
import ingredients from "./ingredients";
import recetteindex from "./recettelist";
import preparation from "./recettepreparation";
import recetteHeader from "./recettesheader";
import mixinAuth from "../mixins/mixin_auth";
export default {
  mixins: [mixinAuth],
  components: { ingredients, recetteindex, preparation, recetteHeader },
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
        id: uuid.v4(),
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