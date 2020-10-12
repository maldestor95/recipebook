<template>
  <v-card  flat class="d-md-flex pa-2 justify-space-between " max-width="1024">

    <h1 class="text-center">
      {{recette.nom}}
    </h1>
    <div class="d-flex justify-space-around justify-md-space-between align-center">
      <h2>
      <v-icon >mdi-account-group-outline</v-icon>
      <span>{{recette.nbPersonnes}} pers</span>
      </h2>
      <h2>
      <v-icon>mdi-clock-outline</v-icon>
      <span>{{recette.temps}} minutes</span>
      </h2>
    </div>
  </v-card>
</template>

<script>
import {store} from "../../store"
export default {
  computed: {
    recette() {
      return store.state.recette.recette
    }
  },
};
</script>

<style lang="scss" scoped>
h2{
  color:inherit;
  font-size: 1em;
  margin-right: 1em;
  }
h1 {
  color:inherit;
    font-size: 1.3em;
}
      .v-icon {
        margin-right: 5px;
      }  
</style>