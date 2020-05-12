<template>
  <v-card outlined >
    <v-container>
      <v-row>
        <v-text-field
          :flat="!editable"
          :solo="!editable"
          :outlined="editable"
          :dense="!editable"
          label="Nom"
          id="id"
          v-model="value.nom"
          :rules="[rules.required]"
        >

        </v-text-field>
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
            v-model="value.temps"
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
            v-model="value.nbPersonnes"
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
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return { nom: "toto", temps: "10min", nbPerssones: "1000" };
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        required: value => value.length > 0 || "Required.",
        number: value => value > 0 || "Minimum 1 pers"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>