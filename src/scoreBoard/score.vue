<template>
  <div>
    <v-card class="pa-0 ma-0">
      <v-container grid-list-xs>
        <v-row justify="center">
          <v-col cols="6">
            <h1>{{name}}</h1>
            <v-row v-if="edit">
            <v-icon @click="enterNewName=true">mdi-pen</v-icon>

            </v-row>
<v-row v-if="enterNewName">

            <v-text-field
              name="new Name"
              label="new Name"
              v-model="newName"
            ></v-text-field>
            <v-btn color="success" @click="renamePlayer(name,newName)">done</v-btn>
</v-row>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn small outlined rounded color="success" @click="updateScore(10)">+10</v-btn>
          <v-btn small outlined rounded color="success" @click="updateScore(5)">+5</v-btn>
          <v-btn small outlined rounded color="success" @click="updateScore(1)">+1</v-btn>
        </v-row>
        <v-row justify="center">{{value.filter(x=>x.name==name)[0].currentScore}}</v-row>
        <v-row justify="center">
          <v-btn small outlined rounded color="error" @click="updateScore(-10)">-10</v-btn>
          <v-btn small outlined rounded color="error" @click="updateScore(-5)">-5</v-btn>
          <v-btn small outlined rounded color="error" @click="updateScore(-1)">-1</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { scoreStore } from "./scoreStore";
export default {
  props: {
    name: {
      type: String,
      default: "user Name"
    },
    edit: { type: Boolean, default: false },
    value: { type: Array }
  },
  data() {
    return {
      newName:"",
      enterNewName:false
    }
  },
  methods: {
    updateScore(newValue = 0) {
      scoreStore.updateRound({ score: newValue, name: this.name });
      // this.value=scoreStore.getPlayer()
    },
    renamePlayer(OldName, newName) {
      // TODO validation of NewName
      scoreStore.renamePlayer(OldName, newName);
      this.enterNewName=false
    }
  }
};
</script>

<style lang="scss" scoped>
.v-row {
  padding: 0;
  margin: 0;
}
h1 {
  font-size: 100%;
  align-content: center;
}
</style>