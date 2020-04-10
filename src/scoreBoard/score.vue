<template>
  <div>
    <v-card >
      <v-container style="padding-top:0px">
        <v-row justify="center">
          <v-col>
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
      default: "test"
    },
    edit: { type: Boolean, default: false },
    value: { type: Array ,default:()=>{return [{name:'test',currentScore:0}]}},
  },
  data() {
    return {
      newName: "",
      enterNewName: false
    };
  },
  computed: {
    },
  methods: {
        currentScore() {
          let t = this.value.filter(x => x.name == this.name)[0].currentScore
          return t
          },

    updateScore(newValue = 0) {
      scoreStore.updateRound({ score: newValue, name: this.name });
      // this.value=scoreStore.getPlayer()
    },
    renamePlayer(OldName, newName) {
      // TODO validation of NewName
      scoreStore.renamePlayer(OldName, newName);
      this.enterNewName = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-col {
  padding: 0;
  margin: 0;
  border: 2px;
  border-color: lightgreen;
  background-color: lightgreen;
}
.score{

  font-weight: 700;
}
.negative {
  color: red;
}
.positive {
  color: green;
  
}

h1 {
  font-size: 100%;
  align-content: center;

}
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 80%;
    
  }
}
</style>