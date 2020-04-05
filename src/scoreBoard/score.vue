<template>
  <div>
    <v-card class="pa-0 ma-0">
      <v-container grid-list-xs>
        <v-row justify="center">
          <h1>{{name}}</h1>
        </v-row>
        <v-row justify="center">
          <v-btn small outlined rounded color="success" @click="updateScore(10)">+10</v-btn>
          <v-btn small outlined rounded color="success" @click="updateScore(5)">+5</v-btn>
          <v-btn small outlined rounded color="success" @click="updateScore(1)">+1</v-btn>
        </v-row>
        <v-row justify="center">
          {{value.filter(x=>x.name==name)[0].currentScore}}
        </v-row>
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
export default {
  props: {
    name: {
      type: String,
      default: "user Name"
    },
    value: { type: Array },
  },
  data() {
    return {
    };
  },
  methods: {
    updateScore(newValue=0) {
      let index=this.value.findIndex(elt=>elt.name==this.name)
      this.value[index].currentScore=this.value[index].currentScore+=newValue
      this.$emit("change", { score: this.value[index].currentScore, name: this.name });
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