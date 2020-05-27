<template>
  <v-container grid-list-xs class="back" fluid>
    <h1>Bienvenue sur le site personnel de Maldestor95</h1>
    <p>En cours d'autoformation sur les technologies nodesjs/vuejs je vais créer quelques applications que je vais publier sur ce site au fil de l'eau.</p>
    <p>Bonne navigation !</p>

    <v-row dense>
      <v-col v-for="LLL in routeList" :key="LLL.id">
        <v-hover>
          <template v-slot="{hover}">
            <v-card max-width="300" :elevation="hover ? 24 : 6" :to="LLL.link">
              <v-img height="200px" :src="LLL.about.img" v-if="Object.keys(LLL.about).includes('img')"></v-img>
              <v-icon v-if="LLL.requireAuth" color="yellow darken-4" class="lock">mdi-lock</v-icon>
              <v-card-title class="justify-center">{{LLL.about.routetitle}}</v-card-title>
              <v-card-text style="justify-center">{{LLL.about.text}}</v-card-text>
              <div class="dev" v-if="LLL.dev" >DEV en cours</div>

            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { store } from "../store.js";
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
  methods: {},
  computed: {
    routeList() {
      let routeL = this.$router.options.routes.map(x => {
        if (!Object.keys(x.meta).includes('dev')) {x.meta.dev=false}
        return x.meta;
      });
      let freeRoute = routeL.filter(x => {
        if (Object.keys(x).includes("about")) {
          return !x.requireAuth;
        }
      });

      let lockRoute = routeL.filter(x => {
        if (Object.keys(x).includes("about")) {
          return x.requireAuth;
        }
      });

      return [...freeRoute, ...lockRoute]
    }
  }
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
.lock {
  position: absolute;
  top: 10px;
  left: 10px;
}
.dev{
  position: absolute;
  top: 50px;
  left: 20px;
  font-size: 100%;
  font-weight: 400;
  background-color: white;
  border: red;
  border-style: groove;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10%;
  color: red;
  transform: rotate(-20deg);
  z-index: 100;

}
</style>
