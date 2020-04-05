<template>
  <div>
    <v-card >
      <v-container>
        <v-row no-gutters>
          <v-col v-for="item in players" :key="item.name" class="pa-0 ma-0">
            <score :name="item.name" @change="updateRound" v-model="players"></score>
            <v-row justify="center">{{scoreTotal(item.name)}}</v-row>
          </v-col>
        </v-row>
        <v-btn color="success" @click="AddRound()">Add Round</v-btn>
        <v-btn color="success" @click="refreshScore()">refresh Score</v-btn>
        <v-btn color="primary" @click="resetScore()">reset Score</v-btn>
        <h2>Vtable avec tous les round</h2>
        <v-data-table
          dense
          :headers="playerList"
          :items="playerScores"
          class="elevation-5"
          pagination.sync="pagination"
        ></v-data-table>
        <v-row>{{scoreB}}</v-row>
        <v-row>{{round}}</v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import score from "./score";
import { scoreStore } from "./scoreStore";

export default {
  components: {
    score
  },
  data() {
    return {
      scoreB: scoreStore.state.board,
      players: [
        { name: "ceri", currentScore: 0 },
        { name: "ludo", currentScore: 0 }
      ],
      playerList: [
        { text: "round", value: "round" },
        { text: "ceri", value: "ceri" },
        { text: "ludo", value: "ludo" }
      ],
      playerScores: [
        { round: 1, ceri: 0, ludo: 5 },
        { round: 2, ceri: 5, ludo: 5 },
        { round: 3, ceri: 10, ludo: 0 }
      ],
      round: {},
      initScore: 0,
      startValue: 0
    };
  },
  mounted() {
    let t = scoreStore.getScoreBoardCookie();
    if (t) {
      this.scoreB = { ...t };
    }
  },
  computed: {},
  methods: {
    scoreTotal(name) {
      let t = this.playerScores.map(x => {
        return x[name];
      });
      return t.reduce((a, b) => {
        return a + b;
      });
    },
    refreshScore() {
      this.scoreB = scoreStore.getScoreBoardCookie();
    },
    resetScore() {
      scoreStore.resetScore();
    },
    updateRound: function(evt) {
      let listOfPlayers = this.players.map(x => x.name);
      let currentRound = Object.keys(this.round);
      let ommittedValue = listOfPlayers.filter(x => !currentRound.includes(x));
      ommittedValue.forEach(element => {
        this.round[element] = 0;
      });

      this.round[evt.name] = evt.score;
    },
    AddRound() {
      let RoundNumber = Math.max(...this.playerScores.map(x => x.round)) + 1;
      this.playerScores.push({ ...{ round: RoundNumber }, ...this.round });
      this.players.forEach(x => (x.currentScore = 0));
      Object.keys(this.round).forEach(x => (this.round[x] = 0));
      this.startValue = 10;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>