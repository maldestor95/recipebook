import VueCookies from 'vue-cookies'
export const scoreStore = {
    state: {
        board: {
            player1: {
                name: "Ceri",
                score: [0]
            },
            player2: {
                name: "Ludo",
                score: [0]
            },
            player3: {
                name: "Ruby",
                score: [0]
            },
            player4: {
                name: "Louis",
                score: [0]
            },
        },
        numberOfPlayers: 4

    },
    initBoard() {
        this.state.board = {}
        this.numberOfPlayers = 0
    },
    addPlayer(name) {
        this.state.board['player' + this.numberOfPlayers + 1] = name
    },
    removePlayer() { //TODO remove Player
    },
    getPlayersList(){
        let list=Object.keys(this.state.board).map(x=>{return {x:x.name}})
        return list
    },
    addRound( //RoundJSON TODO
    ) {

    },
    getScore(name) {
        // this.$cookie.set("scoreBoard",12)
        return this.state.board.filter(x => {
            return x.name == name
        })[0].score
    },
    updateScore(name, value) {
        //TODO
        let pos = this.state.board.findIndex(x => {
            return x.name == name
        })
        this.state.board[pos].score = this.state.board[pos].score + value
        VueCookies.set('scoreBoard', JSON.stringify(this.state.board), "1h")
        return this.state.board[pos].score
    },
    getScoreBoardCookie() {
        let t = VueCookies.get('scoreBoard')
        if (t) {

            this.state.board = JSON.parse(t)
            return this.state.board
        } else {
            return null
        }
    },
    resetScore() {
        //TODO reset Score
        VueCookies.remove('scoreBoard')
        this.state.board = [{
                name: "Ceri",
                score: 0
            },
            {
                name: "Ludo",
                score: 0
            },
            {
                name: "Ruby",
                score: 0
            },
            {
                name: "Louis",
                score: 0
            },
        ]

    }

}