export default {
    state: {
        numbers: [1, 2, 3],
        logged: false
    },
    login() {
        this.state.logged = true
    },
    logout() {
        this.state.logged = false
    }

}