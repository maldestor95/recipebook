<template>
  <v-card outlined class="pa-0 ma-0">
    <v-container>
      <v-row v-for="t in ingredients" :key="t.nom" dense class="pa-0 ma-0">
        <v-row v-if="editable">
          <v-col class="pa-0 ma-0">
            <v-combobox
              :items="[...ingredientList]"
              color="white"
              item-text="name"
              v-model="t.nom"
              :readonly="!editable"
              solo
              :flat="!editable"
              dense
              @keydown.shift.enter="addIngredient()"
              @click:clear="removeIngredient(t.nom)"
              :clearable="editable"
              :search-input.sync="t.search"
              v-if="editable"
              class="pa-0 ma-0"
            >
              <template slot="append" >
                <v-icon v-if="editable & t.nom.length==0" @click="removeIngredient(t.nom)">mdi-minus-circle</v-icon>
              </template>
              <template v-slot:no-data>
                <v-list-item @click="addKeyIngredient(t.search)">
                  <span class="subheading">Create</span>
                  <v-chip :color="`grey lighten-3`" label small>{{ t.search }}</v-chip>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
          <v-col class="py-0 ma-0">
            <v-text-field
              v-model="t.qty"
              :solo="!editable"
              :flat="!editable"
              :readonly="!editable"
              dense
              v-if="editable"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else gutters>
          <v-col>
            <p>{{t.nom}}</p>
          </v-col>
          <v-col>
            <p>{{t.qty}}</p>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
      <v-icon @click="addIngredient()" v-if="editable">mdi-plus-circle</v-icon>
  </v-card>
</template>

<script>
import axios from "axios";
// import qs from "qs";

export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      debug: "",
      newKeyIngredient: "",
      definitions: {
        ingredients: ["tomates", "champignons", "ail"]
      },
      ingredients: this.value.map(x => {
        return { ...x, search: null };
      }),
      search: null
    };
  },
  watch: {
    value(newValue) {
      this.ingredients = newValue;
    }
  },
  methods: {
    removeIngredient(nom) {
      this.ingredients = this.ingredients.filter(x => x.nom != nom);
    },

    addKeyIngredient(newIngredient) {
      axios
        .put("/ingredients", { ingredient: newIngredient })
        .then(() => {
          this.definitions.ingredients.push(newIngredient);
        })
        .catch(err => {
          this.debug = err;
        });
    },
    addIngredient() {
      this.ingredients.push({ nom: "", qty: "" });
    }
  },
  computed: {
    ingredientList() {
      let a = this.value.map(x => x.nom);
      let t = this.definitions.ingredients.filter(i => {
        return !a.includes(i);
      });
      return t;
    }
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
  }
};
</script>

<style lang="scss" scoped>
p {
  height: 8px;
}
</style>