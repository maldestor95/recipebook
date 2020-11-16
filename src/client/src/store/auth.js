import axios from "axios";

const store ={
    state:()=> ({
            // numbers: [1, 2, 3],
            logged: false,
            sessionID: "none yet",
            applicationPrivilege: null,
            username: null,
        }),
        mutations: {
            login(state, payload) {
                axios.post('/login', {
                        username: payload.name,
                        password: payload.pwd
                    })
                    .then(res => {
                        state.logged = true
                        state.sessionID = res.data.sessionID
                        state.applicationPrivilege = res.data.session.passport.user.userApplication
                        state.username = payload.name
                        sessionStorage.setItem('sessionID', JSON.stringify(state));
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
                    let routeNameAccess = Object.keys(state.applicationPrivilege).map(x => {
                        return x.toLowerCase()
                    })
                    return routeNameAccess.includes(routeName) | Object.keys(state.applicationPrivilege).includes('dev')
                }
            },
            getApplicationAccess: (state) => (ApplicationName) => {
                let t = Object.keys(state.applicationPrivilege).filter(x => {
                    return x == ApplicationName
                })
                if (t.length == 0) {
                    return null
                } else {
                    return state.applicationPrivilege[t[0]]
                }
            },
            checkAuth: (state) => (application, levelRequired) => {
                // let auth = JSON.parse(sessionStorage.getItem('sessionID'))
                if (!state.logged) {
                    return false
                } else {
                    let order = {
                        Root: 4,
                        Manager: 3,
                        Editor: 2,
                        Viewer: 1
                    }
                    let sessionLevel = state.applicationPrivilege[application]
                    return order[levelRequired] <= order[sessionLevel] ? true : false
                }
            },
        }
    

}

export default store