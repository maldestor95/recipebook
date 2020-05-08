<template>
  <div>
    <v-icon color="error" large v-if="!saved">mdi-content-save-alert</v-icon>
    <v-icon color="success" large v-if="saved">mdi-content-save</v-icon>
    <v-switch label="Edit" v-model="editable" @change="saved=false; editable=true" v-if="saved"></v-switch>
    <v-btn color="info" @click="saved=true;editable=false" v-if="!saved">Save</v-btn> 
    <!-- // TODO fuction save to implement -->
<p>

    Recettes
    Titre: {{recette.titre}}
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
  </div>
</template>

<script>
import marked from "marked";
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
        id: "1",
        nbPersonnes: 2,
        titre: "ratatouille",
        temps: "60min",
        processDescription: "# T1",
        ingredients: [
          { nom: "tomates", qty: 2 },
          { nom: "ail", qty: 1 },
          { nom: "poivrons", qty: 2 }
        ]
      },
      definitions: {
        ingredients: [
          "tomates",
          "champignons",
          "ail",
          "poivrons",
          "oeuf",
          "paprika"
        ]
      },
      newIngredients: {
        nom: "",
        qty: 0
      }
    };
  },
  methods: {
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