import VueRouter from "vue-router";
// 1. Define route components.

// import Expenses from "./components/Expenses.vue";
// import Users from "./components/Users.vue";
import About from "./components/About.vue";
import {store} from "./store";

const router = new VueRouter({
    // mode: "history",
    base: __dirname,
    routes: [
        {
            path: '/',
            redirect: '/about'
          },
        {
            path: "/about",
            name: "about",
            component:About,
            meta: {
                requireAuth: false
            }
        },
        {
            path: "/login",
            name: "login",
            component: () => import( /* webpackChunkName: "login" */ "@/views/user.vue"),
        },
        {
            path: "/Expenses",
            name:"expenses",
            component: () => import( /* webpackChunkName: "Expenses" */ "@/components/Expenses.vue"),
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/scoreboard",
            name:"scoreboard",
            component: () => import( /* webpackChunkName: "scoreBoard" */ "@/scoreBoard/scoreBoard.vue"),
        },
        {
            path: "/Users",
            name:"users",
            component:  () => import( /* webpackChunkName: "Users" */ "@/views/Users.vue"),
            meta: {
                requireAuth: true
            }

        },
        {
            path: "/recettes",
            name:"recettes",
            component:  () => import( /* webpackChunkName: "recettes" */ "@/views/recettes.vue"),
            meta: {
                requireAuth: false
            }            
        },
        {
            path: "/fournisseur",
            name:"fournisseur",
            component:  () => import( /* webpackChunkName: "dev" */ "@/components/fournisseurlist.vue"),
            meta: {
                requireAuth: false
            }            
        },
        {
            path: "/cave",
            name:"cave",
            component:  () => import( /* webpackChunkName: "dev" */ "@/components/fournisseurlist.vue"),
            meta: {
                requireAuth: true
            }            
        } ,
               {
            path: "/dev",
            name:"development",
            component:  () => import( /* webpackChunkName: "dev" */ "@/components/fournisseurlist.vue"),
            meta: {
                requireAuth: false
            }            
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (!store.isAuthorised(to.name)) {
            next({
                name: 'login'
            })
        }else {next()}
    } else {
                next()
    }
})
export default router