<template>
  <v-container grid-list-xs class="back" fluid>
    <h1>
      Bienvenue sur le site personnel de Maldestor95
    </h1>
    <p>En cours d'autoformation sur les technologies nodesjs/vuejs je vais créer quelques applications que je vais publier sur ce site au fil de l'eau.</p>
    <p>Bonne navigation !</p>

    <v-row dense>
      <v-col v-for="link in Links" :key="link.id">
        <v-hover>
          <template v-slot="{hover}">
            <v-card max-width="300" :elevation="hover ? 24 : 6" :to="link.route">
              <v-img height="200px" :src="link.img"></v-img>
              <v-card-title class="justify-center">
                {{link.routetitle}}
              </v-card-title>
              <v-card-text style="justify-center">{{link.text}}</v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      Links: [
        {
          img: "scoreboard.jpg",
          route: "scoreboard",
          routetitle: "Scoreboard",
          text: `Application pour compter les points. Idéal pour UNO avec les enfants`
        },
        {
          img: "recette.jpg",
          route: "recettes",
          routetitle: "Recettes",
          text: `Petit recueil de recettes que j'ai trouvé interéssantes.`
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.back {
  background-image: url("../assets/P1120088_400.png");
  background-repeat: repeat;
  background-size: 100%;
  opacity: 0.7;
  width: 100%;
  height: 100%;
}
h1,
p {
  color: white;
  text-align: center;
}
h1 {
  font-family: CoffeeHouse;
}
.rlink {
  color: blue;
}
headline2 {
  color: red;
}
</style>
