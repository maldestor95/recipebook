import VueRouter from "vue-router";
// 1. Define route components.

// import Expenses from "./components/Expenses.vue";
// import Users from "./components/Users.vue";
import About from "./components/About.vue";
import {
    store
} from "./store";

const router = new VueRouter({
    // mode: "history",
    base: __dirname,
    routes: [{
            path: '/',
            redirect: '/about',
            meta: {
                requireAuth: false,
                icon: "mdi-information-variant",
                text: "About",
                link: "about",
                logrequired: false,
                menu: false
            }
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
                menu: true
            }
        },
        {
            path: "/loginapp",
            name: "login",
            props: {logged : true, value:true},
            component: () => import( /* webpackChunkName: "login" */ "@/components/loginform.vue"),
            meta: {
                requireAuth: false,
                icon: "mdi-information-variant",
                text: "About",
                link: "about",
                logrequired: false,
                menu: false
            }
        },
        // {
        //     path: "/Expenses",
        //     name: "expenses",
        //     component: () => import( /* webpackChunkName: "Expenses" */ "@/components/Expenses.vue"),
        //     meta: {
        //         requireAuth: true
        //     }
        // },
        {
            path: "/scoreboard",
            name: "scoreboard",
            component: () => import( /* webpackChunkName: "scoreBoard" */ "@/scoreBoard/scoreBoard.vue"),
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
                    text: `Application pour compter les points. Idéal pour UNO avec les enfants`
                },

            }
        },
        {
            path: "/Users",
            name: "users",
            component: () => import( /* webpackChunkName: "Users" */ "@/views/Users.vue"),
            meta: {
                requireAuth: true,
                icon: "mdi-account-group",
                text: "Users",
                link: "users",
                logrequired: true,
                menu: true,
            }

        },
        {
            path: "/recettes",
            name: "recettes",
            component: () => import( /* webpackChunkName: "recettes" */ "@/views/recettes.vue"),
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
                    text: `Petit recueil de recettes que j'ai trouvé interéssantes.`
                }

            }
        },
        {
            path: "/fournisseur",
            name: "fournisseur",
            component: () => import( /* webpackChunkName: "fournisseur" */ "@/feature/fournisseur.vue"),
            meta: {
                requireAuth: true,
                icon: "mdi-domain",
                text: "Fournisseur",
                link: "fournisseur",
                logrequired: false,
                menu: true,
                about :{
                    routetitle: "Fournisseurs",
                    text: `Gestion des fournisseurs.`
                },
                dev:true
            }
        },
        {
            path: "/cave",
            name: "cave",
            component: () => import( /* webpackChunkName: "dev" */ "@/feature/cave.vue"),
            meta: {
                requireAuth: true,
                icon: "mdi-bottle-wine",
                text: "Cave",
                link: "cave",
                logrequired: false,
                menu: true,
                about :{
                    routetitle: "Cave",
                    text: `Gestion de la cave à vin.`
                },
                dev:true
            }
        }
        // ,
        // {
        //     path: "/dev",
        //     name: "development",
        //     component: () => import( /* webpackChunkName: "dev" */ "@/components/fournisseurlist.vue"),
        //     meta: {
        //         requireAuth: true,
        //         icon: "mdi-dev-to",
        //         text: "Dev",
        //         link: "dev",
        //         logrequired: false,
        //         menu: true
        //     }
        // }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (!store.getters.isAuthorised(to.name)) {
            next({
                name: 'login'
            })
            
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router