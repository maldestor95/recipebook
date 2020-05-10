<template>
  <div>
    <recetteindex :recettelist="recetteList" @getRecipe="getRecette($event)"></recetteindex>
    <v-container grid-list-xs>
      <v-card max-width="1200">
        <!-- <v-icon color="error" large v-if="!saved">mdi-content-save-alert</v-icon>
        <v-icon color="success" large v-if="saved">mdi-content-save</v-icon> -->
        <v-switch label="Edit" v-model="editable" ></v-switch>
        <!-- <v-btn color="info" @click="saved=true;editable=false" v-if="!saved">Save</v-btn> -->
        <v-btn color="success" @click="newRecette() " v-if="!editable">Nouvelle recette</v-btn>
        {{recette.id}}}
        <v-btn color="success" @click="updateRecette()" v-if="editable" >update recette</v-btn>
      </v-card>
      <v-card max-width="500">
        <v-container>
          <v-row>
            <v-autocomplete
              :items="recetteListNames"
              color="white"
              item-text="name"
              v-model="selectedRecette"
              @keydown.enter="getRecette(selectedRecette)"
              @change="getRecette(selectedRecette)"
            >
              <template slot="prepend">
                <v-icon>mdi-file-document</v-icon>
              </template>
              <template slot="append">
                <v-btn color="success" @click="getRecette(selectedRecette)">voir</v-btn>
              </template>
            </v-autocomplete>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :flat="!editable"
                :solo="!editable"
                :outlined="editable"
                :dense="!editable"
                label="Temps"
                id="id"
                v-model="recette.temps"
                :rules="[rules.required]"
              >
                <template slot="prepend">
                  <v-icon>mdi-clock-outline</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :flat="!editable"
                :solo="!editable"
                :outlined="editable"
                :dense="!editable"
                label="nombre de personnes"
                id="id"
                v-model="recette.nbPersonnes"
                :rules="[rules.number]"
              >
                <template slot="prepend">
                  <v-icon>mdi-account-group-outline</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
    <h1>
        ingredients
      </h1>
<ingredients  v-model="this.recette.ingredients" :editable="editable" @updateIngredientList="updateIngredientList($event)"></ingredients>
    <h1>
      Préparation

    </h1>
        <v-col cols="4" v-if="editable">
          <v-textarea
            outlined
            filled
            auto-grow
            :value="recette.processDescription"
            v-model="recette.processDescription"
          ></v-textarea>
        </v-col>
        <v-col :cols="editable?4:8">
          <span v-html="processDescriptionMarked"></span>
        </v-col>
    {{debug}}
    <v-spacer></v-spacer>
  
  </div>
</template>

<script>
import marked from "marked";
import uuid from "uuid";
import axios from "axios";
import qs from "qs";
import ingredients from './ingredients'
import recetteindex from './recettelist'
export default {
  components: {ingredients,recetteindex },
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
      rules: {
        required: value => value.length > 0 || "Required.",
        number: value => value > 0 || "Minimum 1 pers"
      },
      searchRecipe:""
    };
  },
  mounted() {

    axios
      .get("/recettes")
      .then(data => {
        this.recetteList = data.data;
      })
      .catch(err => {
        this.debug = err;
      });
  },
  methods: {
    
    getRecette(recette) {
      let recetteId = this.recetteList.filter(x => x.nom == recette)[0].id;
      axios
        .get("/recette/" + recetteId)
        .then(data => {
          this.recette = data.data;
        })
        .catch(err => {
          this.debug = err;
        });
    },
    updateRecette() {
      let _this = this;
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
        })
        .catch(err => {
          this.debug = err;
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
    },
    updateIngredientList(event){
      this.debug=event
      this.$set(this.recette,'ingredients',event)
    }

  },
  computed: {
    recetteListNames() {
      return this.recetteList.map(x => x.nom);
    },
    processDescriptionMarked() {
      return marked(this.recette.processDescription);
    },
    alreadyChoosen() {
      return this.recette.ingredients.map(x => x.nom);
    },
    
  }
};
</script>

<style lang="scss" scoped>
</style>