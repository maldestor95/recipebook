<template>
  <v-card grid-list-xs class="grey lighten-4" max-width="400">
      <v-form>
        <div v-for="item in fieldlist" :key="item.id">
          <v-text-field
            :label="item"
            :name="item"
            v-model="adresse[item]"
            @change="$emit('input',adresse)" 
            :disabled="!editable"           
          ></v-text-field>
        </div>
        <v-textarea
            label="notes"
            name="notes"
            v-model="adresse.notes"
            @change="$emit('input',adresse)"            
            :disabled="!editable"           
          ></v-textarea>
      </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    editable:{
      type:Boolean,
      default:false
    },
    adresse: {
      type: Object,
      default: () => {
        return {
          nom: "NOM",
          prenom: "PRENOM",
          societe: "SOCIETE",
          adresse: "40 rue de Paris",
          complementAdresse: "59000 LILLE",
          notes: "NOTES"
        };
      }
    }
  },
  computed: {
      fieldlist() {
          return Object.keys(this.adresse).filter(x=>x!='notes')
      }
  },
};
</script>


<style lang="scss" scoped>
.outlined {
    border-color: black;
    border-style: solid;
    ;
}
</style>