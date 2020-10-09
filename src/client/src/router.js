import VueRouter from "vue-router";
// 1. Define route components.

import About from "./components/About.vue";
import {
    store
} from "./store/index.js";

const router = new VueRouter({
  // mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      redirect: "/about",
      meta: {
        requireAuth: false,
        icon: "mdi-information-variant",
        text: "About",
        link: "about",
        logrequired: false,
        menu: false,
      },
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        requireAuth: false,
        icon: "mdi-information-variant",
        text: "About",
        link: "about",
        logrequired: false,
        menu: true,
      },
    },
    {
      path: "/scoreboard",
      name: "scoreboard",
      component: () =>
        import(
          /* webpackChunkName: "scoreBoard" */ "@/feature/scoreBoard/scoreBoard.vue"
        ),
      meta: {
        requireAuth: false,
        icon: "mdi-scoreboard",
        text: "ScoreBoard",
        link: "scoreboard",
        logrequired: false,
        menu: true,
        about: {
          img: "scoreboard.jpg",
          routetitle: "Scoreboard",
          text: `Application pour compter les points. Idéal pour UNO avec les enfants`,
        },
      },
    },
    {
      path: "/Users",
      name: "users",
      component: () =>
        import(/* webpackChunkName: "Users" */ "@/feature/users/Users.vue"),
      meta: {
        requireAuth: true,
        icon: "mdi-account-group",
        text: "Users",
        link: "users",
        logrequired: true,
        menu: true,
      },
    },
    {
      path: "/recettes",
      name: "recettes",
      component: () =>
        import(
          /* webpackChunkName: "recettes" */ "@/feature/recette/index.vue" //TODO
        ),
      meta: {
        requireAuth: false,
        icon: "mdi-notebook-outline",
        text: "Recettes",
        link: "recettes",
        logrequired: false,
        menu: true,
        about: {
          img: "recette.jpg",
          routetitle: "Recettes",
          text: `Petit recueil de recettes que j'ai trouvé interéssantes.`,
        },
      },
    },
    {
      path: "/fournisseur",
      name: "fournisseur",
      component: () =>
        import(
          /* webpackChunkName: "fournisseur" */ "@/feature/fournisseur.vue"
        ),
      meta: {
        requireAuth: true,
        icon: "mdi-domain",
        text: "Fournisseur",
        link: "fournisseur",
        logrequired: false,
        menu: true,
        about: {
          routetitle: "Fournisseurs",
          text: `Gestion des fournisseurs.`,
        },
        dev: true,
      },
    },
    {
      path: "/cave",
      name: "cave",
      component: () =>
        import(/* webpackChunkName: "dev" */ "@/feature/cave.vue"),
      meta: {
        requireAuth: true,
        icon: "mdi-bottle-wine",
        text: "Cave",
        link: "cave",
        logrequired: false,
        menu: true,
        about: {
          routetitle: "Cave",
          text: `Gestion de la cave à vin.`,
        },
        dev: true,
      },
    },
    {
      path: "/vin",
      name: "vin",
      component: () =>
        import(/* webpackChunkName: "dev" */ "@/feature/vin.vue"),
      meta: {
        requireAuth: true,
        icon: "mdi-bottle-wine-outline",
        text: "Boisson",
        link: "vin",
        logrequired: false,
        menu: true,
        about: {
          routetitle: "Boisson",
          text: `Gestion des références de bouteilles (vin/biere...).`,
        },
        dev: true,
      },
    },
    {
      path: "/dev",
      name: "development",
      component: () =>
        import(/* webpackChunkName: "dev" */ "@/feature/dev.vue"),
      meta: {
        requireAuth: true,
        icon: "mdi-dev-to",
        text: "Dev",
        link: "dev",
        logrequired: false,
        menu: true,
      },
    },
    {
      path: "/test",
      name: "test",
      component: () =>
        import(/* webpackChunkName: "dev" */ "@/feature/test.vue"),
      meta: {
        requireAuth: true,
        icon: "mdi-alpha",
        text: "Test",
        link: "test",
        logrequired: false,
        menu: true,
      },
    },
    {
      path: "/cv",
      name: "cv",
      component: () =>
        import(/* webpackChunkName: "cv" */ "../../cv/src/components/cv.vue"),
        // import(/* webpackChunkName: "cv" */ 
        // "@/feature/scoreBoard/scoreBoard.vue"
        // ),
      meta: {
        requireAuth: false,
        icon: "mdi-account-tie-outline",
        text: "cv",
        // extLocation: window.location.origin + "/cv",
        newWindow: false,
        link: "cv",
        logrequired: false,
        menu: true,
      },
    },
    
    {
      path: "/politiqueCookie",
      name: "politiqueCookie",
      component: () =>
        import(/* webpackChunkName: "politique-cookie" */ "./feature/politiquecookie.vue"),
      meta: {
        requireAuth: false,
        icon: "mdi-account-tie-outline",
        text: "politique-cookie",
        // extLocation: window.location.origin + "/cv",
        newWindow: false,
        logrequired: false,
        menu: false,
      },
    },
    {
      path: "/politiqueConfidentialite",
      name: "politiqueConfidentialite",
      component: () =>
        import(/* webpackChunkName: "politique-confidentialite" */ "./feature/politiqueconfidentialite.vue"),
      meta: {
        requireAuth: false,
        icon: "mdi-account-tie-outline",
        text: "politique-cookie",
        newWindow: false,
        logrequired: false,
        menu: false,
      },
    },
    {
      path: "/politiqueLegale",
      name: "politiqueLegale",
      component: () =>
        import(/* webpackChunkName: "politique-legal" */ "./feature/politiquelegale.vue"),
      meta: {
        requireAuth: false,
        icon: "mdi-account-tie-outline",
        text: "politique-cookie",
        newWindow: false,
        logrequired: false,
        menu: false,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (!store.getters.isAuthorised(to.name)) {
            next({
                name: 'about'
            })
            
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router