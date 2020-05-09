<template>
  <div>
    <v-icon color="error" large v-if="!saved">mdi-content-save-alert</v-icon>
    <v-icon color="success" large v-if="saved">mdi-content-save</v-icon>
    <v-switch label="Edit" v-model="editable" @change="saved=false; editable=true" v-if="saved"></v-switch>
    <v-btn color="info" @click="saved=true;editable=false" v-if="!saved">Save</v-btn>

    <v-card>
      <v-text-field
        v-model="recette.id"
        label="id"
        id="id"
      ></v-text-field>
      <v-btn color="success" @click="getRecette(recette.id)">get recette</v-btn>
      <v-btn color="success" @click="updateRecette()" v-if="!saved">update recette</v-btn>
    </v-card>
    <!-- // TODO fuction save to implement -->
    <p>
      Recettes
      Titre: {{recette.nom}}
      Temps: {{recette.temps}}
      nombre de personnes : {{recette.nbPersonnes}}
    </p>
    <v-data-table
      id="ingredients"
      :headers="ingredientsHeaders"
      :items="recette.ingredients"
      class="elevation-1"
      dense
    >
      <template v-slot:item.qty="t">
        <v-text-field v-model="t.item.qty" v-if="editable"></v-text-field>
        <span v-else>{{t.item.qty}}</span>
      </template>
      <template v-slot:item.nom="t">
        <v-autocomplete
          :items="[...ingredientList,t.item.nom]"
          color="white"
          item-text="name"
          v-model="t.item.nom"
          v-if="editable"
        ></v-autocomplete>
        <v-btn color="error" v-if="editable" @click="removeIngredient(t.item.nom)">
          <v-icon color="white">mdi-delete-circle</v-icon>
        </v-btn>
        <span v-else>{{t.item.nom}}</span>
      </template>
      <template v-slot:footer>
        <v-btn color="success" @click="addIngredient()" v-if="editable">Add</v-btn>
        <v-card v-if="editable">
          <v-text-field v-model="newKeyIngredient" label="newKeyIngredient" id="id"></v-text-field>
          <v-btn color="success" @click="addKeyIngredient()">Addname</v-btn>
          {{definitions.ingredients}}
        </v-card>
      </template>
    </v-data-table>
    <h1>préparation</h1>

    <v-container grid-list-xs>
      <v-row>
        <v-col cols="6" v-if="editable">
          <v-textarea
            outlined
            filled
            auto-grow
            :value="recette.processDescription"
            v-model="recette.processDescription"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <span v-html="processDescriptionMarked"></span>
        </v-col>
      </v-row>
    </v-container>
    {{debug}}
  </div>
</template>

<script>
import marked from "marked";
import axios from "axios";
import qs from 'qs';
export default {
  components: {},
  data() {
    return {
      saved: false,
      editable: true,
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
      debug: ""
    };
  },
  mounted() {
    axios
      .get("/ingredients")
      .then(data => {
        this.definitions.ingredients = data.data;
      })
      .catch(err => {
        this.debug = err;
      });
  },
  methods: {
    addKeyIngredient() {
      axios
        .put("/ingredients", { ingredient: this.newKeyIngredient })
        .then(() => {
          this.definitions.ingredients.push(this.newKeyIngredient);
        })
        .catch(err => {
          this.debug = err;
        });
    },
    getRecette(recetteId){
axios
        .get("/recette/"+recetteId)
        .then((data) => {
          this.recette=data.data
        })
        .catch(err => {
          this.debug = err;
        });
    },
    updateRecette(){
      axios
        .put("/recette/"+this.recette.id, qs.stringify(this.recette))
        .then((data) => {
          this.debug=data
        })
        .catch(err => {
          this.debug = err;
        });
    },
    addIngredient() {
      this.recette.ingredients.push({ nom: "", qty: 0 });
    },
    removeIngredient(nom) {
      this.recette.ingredients = this.recette.ingredients.filter(
        x => x.nom != nom
      );
    }
  },
  computed: {
    processDescriptionMarked() {
      return marked(this.recette.processDescription);
    },
    alreadyChoosen() {
      return this.recette.ingredients.map(x => x.nom);
    },
    ingredientList() {
      let a = this.recette.ingredients.map(x => x.nom);
      let t = this.definitions.ingredients.filter(i => {
        return !a.includes(i);
      });
      return t;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>