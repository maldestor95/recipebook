<template>
  <v-card class="ScoreBoard">
    <v-container class='pa-0'>
      <v-row no-gutters>
        <v-col v-for="item in players" :key="item.name" class="pa-0 ma-0">
          <v-card class outlined>
            <v-card-title class="py-0" id="playerName">
              <v-container class="pa-0">
                <v-row>

                
              <v-col cols="1" class="pa-0">
              <v-icon
                @click="configureBoard='edit'; name=item.name"
                v-if="configureBoard!='configure'" 
              >mdi-pen</v-icon>
              </v-col>

               <v-col cols="10" class="pa-0">
                 <v-row justify="center" class="pa-0">

              {{item.name.toUpperCase()}}
                 </v-row>
              </v-col>
              
              <v-col cols="1" class="pa-0" >
              <v-icon @click="removePlayer(item.name)" v-if="configureBoard!='configure'" >mdi-delete</v-icon>
              </v-col>
                </v-row>
              
              </v-container>
            </v-card-title>
            <v-card-text class="display-2">
              <v-row justify="center">{{scoreTotal(item.name)}}</v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="configureBoard=='add' | configureBoard=='edit'">
        <v-col cols="10">
          <v-text-field name="new Name" label="new Name" v-model="newName"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="success"
            @click="renamePlayer(name,newName)"
            v-if="configureBoard=='edit'"
          >Rename</v-btn>
          <v-btn color="success" @click="addPlayer(newName)" v-if="configureBoard=='add'">Add</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col v-for="item in players" :key="item.name">
          <score :name="item.name" v-model="players"></score>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="4">
          <v-btn block color="success" @click="AddRound()">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn block color="primary" @click="resetScore()" v-if="configureBoard!= 'configure'">
            <v-icon>mdi-restart</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn
            block
            color="primary"
            @click=" newName=''; configureBoard=configureBoard=='add'?'configure':'add'"
          >
            <v-icon>mdi-account-supervisor</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center" class="pt-5 hidden-md-and-down" >
        <v-col cols="12">
          <v-data-table
            dense
            :headers="playerList"
            :items="playerScores"
            class="elevation-5"
            pagination.sync="pagination"
            sort-by="round"
            :sort-desc="true"
            
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>


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
      configureBoard: 'configure', // 'configure' or 'add' or 'edit'
      scoreStoreState: scoreStore.State,
      players: scoreStore.state.players,
      playerList: scoreStore.state.playerList,
      playerScores: scoreStore.state.playerScores,
      round: scoreStore.state.round,
      name: "",
      newName: "new"
    };
  },
  mounted() {
    scoreStore.initFromCookies();
    this.refresh();
  },
  methods: {
    scoreTotal(name) {
      if (this.hasOwnProperty("playerScores")) {
        let t = this.playerScores.map(x => {
          return x[name];
        });
        return t.reduce((a, b) => {
          return a + b;
        });
      } else {
        return 0;
      }
    },
    resetScore() {
      scoreStore.resetScore();
      this.playerScores = scoreStore.getPlayerScores();
      this.refresh();
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
      let pList = this.players.map(x => x.name);
      if (!pList.includes(name)) {
        scoreStore.addPlayer(name);
        this.refresh();
      }
      this.configureBoard = "configure";
    },
    removePlayer(name) {
      scoreStore.removePlayer(name);
      this.refresh();
    },
    renamePlayer(OldName, newName) {
      // TODO validation of NewName
      scoreStore.renamePlayer(OldName, newName);
      this.configureBoard = "configure";
    }
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.negative {
  color: red;
}
.positive {
  color: green;
}
.ScoreTotal {
  font-weight: bold;
  margin-top: 20px;
  color: $info;
  @media screen and (max-width:600px) and (orientation:landscape ){
    font-weight:normal;
    
  }
}
@media screen and (max-width:740px) and (orientation:landscape ){
.v-card__text {
  padding-bottom: 0px;
  .row {
  font-size: 30px;
  align-content: center;
  height: 34px;

  }
}
}
@media screen and (max-width:740px) and (orientation:landscape ){
.container-fluid {
  padding-top: 0px;
}
}



</style>