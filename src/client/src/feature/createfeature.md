# dans client/src
* creer feature#.vue dans ./feature
* creer dans route.js une entrée 
`
{
            path: "/vin",
            name: "vin",
            component: () => import( /* webpackChunkName: "dev" */ "@/feature/vin.vue"),
            meta: {
                requireAuth: true,
                icon: "mdi-bottle-wine-outline",
                text: "Boisson",
                link: "vin",
                logrequired: false,
                menu: true,
                about :{
                    routetitle: "Boisson",
                    text: `Gestion des références de bouteilles (vin/biere...).`
                },
                dev:true
            }
        }

`
dev:true=> donne un  accès root au composant

# dans server
* ajouter la nouvelle definition dasn `J:\dev\nodejs\src\server\lib\definition.js` => _application 

# dans la gestion des utilisateurs 
* donner les droits d'accès à l'appli


