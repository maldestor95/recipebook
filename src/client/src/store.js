import axios from "axios";


export const store = {
    state: {
        numbers: [1, 2, 3],
        logged: false,
        sessionID: "none yet",
        applicationPrivilege: null,
        username: null
    },
    debug: "",
    login(name, pwd) {
        axios.post('/login', {
                username: name,
                password: pwd
            })
            .then(res => {
                this.state.logged = true
                this.debug = res
                this.state.sessionID = res.data.sessionID
                this.state.applicationPrivilege = res.data.applicationPrivilege
                this.state.username = name
            })
            .catch(err => {
                this.state.logged = false
                this.debug = err
            })
    },
    logout() {
        axios.post('/logout')
            .then(res => {
                this.state.logged = false
                this.debug = res
                this.state.sessionID = "not logged anymore"
                this.state.applicationPrivilege = null
                this.state.username = null

            })
            .catch(err => {
                this.state.logged = false
                this.debug = err
            })

    },
    getSessionID() {
        return this.state.sessionID
    },
    isAuthorised(routeName) {
        if (this.state.username == null) return false
        else {
            return Object.keys(this.state.applicationPrivilege).map(x => {
                return x.toLowerCase()
            }).includes(routeName)
        }
    },
    getApplicationAccess(ApplicationName) {
        let t = Object.keys(this.state.applicationPrivilege).filter(x => {
            return x== ApplicationName
        })
        if (t.length == 0) {
            return null
        } else {
            return this.state.applicationPrivilege[t[0]]
        }
    }

}