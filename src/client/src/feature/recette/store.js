import axios from "axios";
// import qs from "qs";

const store = {

    state: () => ({
        recetteList: [{
            nom: "ratatouille",
            id: "5512af64-2f2c-4680-9768-3d8d36e051a3"
        }],
        recette:{
            id: "5512af64-2f2c-4680-9768-3d8d36e051a3",
            nbPersonnes: 2,
            nom: "ratatouille",
            temps: "60min",
            processDescription: "# T1",
            ingredients: [
              { nom: "tomates", qty: 2 },
              { nom: "ail", qty: 1 },
              { nom: "poivrons", qty: 2 }
            ]
          }
    }),
    getters: {
        recetteListNames: state => {
            return state.recetteList.map(x => x.nom);
        },
    },
    mutations: {
        updateRecettesList(state, list) {
            state.recetteList = list
        },
        loadRecette(state, recette) {
            state.recette = recette
        }
    },
    actions: {
        getRecettesList: (context) => {
            axios
                .get("/recettes")
                .then(data => {
                    context.commit('updateRecettesList', data.data);
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err)
                });
        },
        getRecette(context, recetteId) {
            axios
              .get("/recette/" + recetteId)
              .then(data => {
                context.commit("loadRecette",data.data)
              })
              .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err)
              });
          },
    }
}
export default store