<template>
  <div>
    <v-card>
      <v-container>
        <v-row no-gutters>
          <v-col v-for="item in players" :key="item.name" class="pa-0 ma-0">
            <score :name="item.name" v-model="players" :edit='configureBoard'></score>
            <v-row justify="center">{{scoreTotal(item.name)}}</v-row>
            <v-chip color="primary" @click="removePlayer(item.name)" v-if="configureBoard">-</v-chip>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="3">
            <v-btn color="success" @click="AddRound()">Add Round</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" @click="resetScore()">reset Score</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" @click="configureBoard=!configureBoard">configure Board</v-btn>
          </v-col>

          <v-col cols="3">
            <v-btn color="primary" @click="refresh()">refresh</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="configureBoard">
            <v-text-field name="newName" label="new name" v-model="newName"></v-text-field>
            <v-chip color="primary" @click="addPlayer(newName)">+</v-chip>
        </v-row>
        <v-row justify="center" class="pt-5">
          <v-col cols="12">
            <v-data-table
              dense
              :headers="playerList"
              :items="playerScores"
              class="elevation-5"
              pagination.sync="pagination"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    players {{players}}
    <br />
    playerScores{{playerScores}}
    <br />
    round {{round}}
  </div>
</template>

<script>
import score from "./score";
import { scoreStore } from "./scoreStore.js";

export default {
  components: {
    score
  },
  data() {
    return {
      configureBoard:false,
      scoreStoreState: scoreStore.State,
      players: scoreStore.state.players,
      playerList: scoreStore.state.playerList,
      playerScores: scoreStore.state.playerScores,
      round: scoreStore.state.round,
      newName: "new"
    };
  },
  mounted() {
    //FIXME
    scoreStore.initFromCookies();
    this.refresh();
  },
  methods: {
    scoreTotal(name) {
      let t = this.playerScores.map(x => {
        return x[name];
      });
      t = t.filter(x => typeof x != "undefined");
      if (t.length == 0) {
        return 0;
      } else {
        return t.reduce((a, b) => {
          return a + b;
        });
      }
    },
    resetScore() {
      scoreStore.resetScore();
      this.playerScores = scoreStore.getPlayerScores();
      this.refresh()
    },
    AddRound() {
      scoreStore.AddRound();

      this.playerScores = scoreStore.getPlayerScores();
      this.players = scoreStore.getPlayers();
      this.refresh();
    },
    refresh() {
      this.players = scoreStore.getPlayers();
      this.playerScores = scoreStore.getPlayerScores();
      this.playerList = scoreStore.getPlayerList();
      this.round = scoreStore.getRound();
    },
    addPlayer(name) {
      let pList=this.players.map(x=>x.name)
      if (!pList.includes(name)){

        scoreStore.addPlayer(name);
      this.refresh();
      }
    },
    removePlayer(name) {
      scoreStore.removePlayer(name);
      this.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>