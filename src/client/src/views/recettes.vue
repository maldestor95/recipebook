<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-icon color="error" large v-if="!saved">mdi-content-save-alert</v-icon>
        <v-icon color="success" large v-if="saved">mdi-content-save</v-icon>
        <v-switch label="Edit" v-model="editable" @change="saved=false; editable=true" v-if="saved"></v-switch>
        <v-btn color="info" @click="saved=true;editable=false" v-if="!saved">Save</v-btn>
        <v-btn color="success" @click="newRecette()">Nouvelle recette</v-btn>
        {{recette.id}}}
        <v-btn color="success" @click="updateRecette()" v-if="!saved">update recette</v-btn>
      </v-row>
      <v-row>
        <v-autocomplete
          :items="recetteListNames"
          color="white"
          item-text="name"
          v-model="selectedRecette"
          @keydown.enter="getRecette(selectedRecette)"
          @change="getRecette(selectedRecette)"
        ></v-autocomplete>
        <v-btn color="success" @click="getRecette(selectedRecette)">get recette</v-btn>
      </v-row>
    </v-container>

    <!-- // TODO fuction save to implement -->
    <v-row >
      <v-col cols="8">
        <v-text-field label="Nom" id="id" v-model="recette.nom" :rules="[rules.required]"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field label="Temps" id="id" v-model="recette.temps" :rules="[rules.required]"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field
          label="nombre de personnes"
          id="id"
          v-model="recette.nbPersonnes"
          :rules="[rules.number]"
        ></v-text-field>
      </v-col>
    </v-row>
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
import uuid from "uuid";
import qs from "qs";
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
      debug: "",
      recetteList: [{"nom":"ratatouille","id":"5512af64-2f2c-4680-9768-3d8d36e051a3"}],
      selectedRecette: "ratatouille",
      rules: {
        required: value => value.length > 0 || "Required.",
        number: value => value > 0 || "Minimum 1 pers"
      }
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
    axios.get('/recettes')
        .then(data => {
          this.recetteList=data.data;
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
    getRecette(recette) {
      let recetteId=this.recetteList.filter(x=>x.nom==recette)[0].id
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
      let _this=this
      axios
        .put("/recette/" + this.recette.id, qs.stringify(this.recette))
        .then(data => {
          this.debug=data
          if (_this.recetteList.map(x=>x.id==_this.recette.id).length==0){
            _this.recetteList.push([{"nom":_this.recetteList.nom,"id":_this.recette.id}])
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
    recetteListNames(){
      return this.recetteList.map(x=>x.nom)
    },
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