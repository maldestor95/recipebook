import axios from "axios";
import Vue from "vue";
import VueSession from 'vue-session'
import Vuex from 'vuex'



Vue.use(Vuex)
Vue.use(VueSession)

export const store = new Vuex.Store({
    state: {
        // numbers: [1, 2, 3],
        logged: false,
        sessionID: "none yet",
        applicationPrivilege: null,
        username: null
    },
    mutations: {
        login(state, payload) {
            axios.post('/login', {
                    username: payload.name,
                    password: payload.pwd
                })
                .then(res => {
                    state.logged = true
                    state.sessionID = res.data.sessionID

                    state.applicationPrivilege = res.data.applicationPrivilege
                    state.username = payload.name
                    sessionStorage.setItem('sessionID', JSON.stringify(store.state));
                })
                .catch(() => {
                    state.logged = false
                })
        },
        logout(state) {
            axios.post('/logout')
                .then(() => {
                    state.logged = false
                    state.sessionID = "not logged anymore"
                    state.applicationPrivilege = null
                    state.username = null
                    sessionStorage.removeItem('sessionID');
                })
                .catch(() => {
                    state.logged = false
                })

        },

        reinitSession(state) {
            if (sessionStorage.getItem('sessionID')) {
                let t = JSON.parse(sessionStorage.getItem('sessionID'))
                Object.keys(t).forEach(x => state[x] = t[x])
            }
        },
    },
    getters: {
        isAuthorised: (state) => (routeName) => {
            if (state.username == null) return false
            else {
                return Object.keys(state.applicationPrivilege).map(x => {
                    return x.toLowerCase()
                }).includes(routeName)
            }
        },
        // FIXME =>  application users
        getApplicationAccess:(state)=>(ApplicationName)=> {
            let t = Object.keys(state.applicationPrivilege).filter(x => {
                return x == ApplicationName
            })
            if (t.length == 0) {
                return null
            } else {
                return state.applicationPrivilege[t[0]]
            }
        },
    },
    /*
    getState(){
        return this.state
    }
*/

})