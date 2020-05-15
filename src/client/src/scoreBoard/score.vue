<template>
  <div>
    <v-card>
      <v-container style="padding-top:0px">
        <v-row justify="center"></v-row>
        <v-row justify="center" class="btnScore">
          <v-btn large outlined rounded color="success" @click="updateScore(10)">+10</v-btn>
          <v-btn large outlined rounded color="success" @click="updateScore(5)">+5</v-btn>
          <v-btn large outlined rounded color="success" @click="updateScore(1)">+1</v-btn>
        </v-row>
        <v-row
          justify="center"
          :class="[currentScore()>0?'positive':'negative','score']"
        >{{value.filter(x=>x.name==name)[0].currentScore}}</v-row>
        <v-row justify="center" class="btnScore">
          <v-btn large outlined rounded color="error" @click="updateScore(-10)">-10</v-btn>
          <v-btn large outlined rounded color="error" @click="updateScore(-5)">-5</v-btn>
          <v-btn large outlined rounded color="error" @click="updateScore(-1)">-1</v-btn>
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
    // edit: { type: Boolean, default: false },
    value: {
      type: Array,
      default: () => {
        return [{ name: "test", currentScore: 0 }];
      }
    }
  },
  data() {
    return {
      // newName: "",
      // enterNewName: false
    };
  },
  computed: {},
  methods: {
    currentScore() {
      let t = this.value.filter(x => x.name == this.name)[0].currentScore;
      return t;
    },

    updateScore(newValue = 0) {
      scoreStore.updateRound({ score: newValue, name: this.name });
      // this.value=scoreStore.getPlayer()
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
.btnScore {
  padding-top: 10px;
  @media only screen and (max-width: 600px)  {
    padding-left: 0px;
    padding-right: 0px;
  .v-btn {
    margin: 0px;
    padding: 0px;
  }
  }
  @media screen and (max-width:740px) and (orientation:landscape ){
    padding-top:0px;
    padding-left: 0px;
    padding-right: 0px;
  .v-btn {
    margin: 0px;
    padding: 0px;
  }
  }
}
.container {
  @media screen and (max-width:740px) and (orientation:landscape ){
  padding-bottom: 0px;
  }
}
.score {
  font-weight: bold;
  font-size: x-large;
  @media only screen and (max-width: 600px) {
    font-size: large;
  }
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
  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 80%;
    }
  }
}


</style>