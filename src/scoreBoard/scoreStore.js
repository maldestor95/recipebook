import VueCookies from 'vue-cookies'
export const scoreStore = {
    state: {
        players: [{
                name: "ceri",
                currentScore: 0
            },
            {
                name: "ludo",
                currentScore: 0
            },
            {
                name: "ruby",
                currentScore: 0
            },
            {
                name: "louis",
                currentScore: 0
            }
        ],
        playerList: [{
                text: "round",
                value: "round"
            },
            {
                text: "ceri",
                value: "ceri"
            },
            {
                text: "ludo",
                value: "ludo"
            },
            {
                text: "ruby",
                value: "ruby"
            },
            {
                text: "louis",
                value: "louis"
            }
        ],
        playerScores: [{
                round: 1,
                ceri: 0,
                ludo: 5,
                ruby: 0,
                louis: 5
            },
            {
                round: 2,
                ceri: 0,
                ludo: 6,
                ruby: 0,
                louis: 5
            },
            {
                round: 3,
                ceri: 0,
                ludo: 7,
                ruby: 0,
                louis: 5
            }
        ],
        round: {},
        numberOfPlayers: 4
    },
    initRound() {
        let listOfPlayers = this.state.players.map(x => x.name);

        let currentRound = Object.keys(this.state.round);
        let ommittedValue = listOfPlayers.filter(x => !currentRound.includes(x));
        ommittedValue.forEach(element => {
            this.state.round[element] = 0;
        });
    },
    AddRound() {
        let RoundNumber = Math.max(...this.state.playerScores.map(x => x.round)) + 1;
        this.initRound()
        this.state.playerScores.push({
            ...{
                round: RoundNumber
            },
            ...this.state.round
        });
        this.state.players.forEach(x => (x.currentScore = 0));
        Object.keys(this.state.round).forEach(x => (this.state.round[x] = 0));
        //FIXME cookies
        VueCookies.set('scoreBoard', JSON.stringify(this.state), "2h")
    },
    updateRound: function (evt) {

        let index = this.state.players.findIndex(elt => elt.name == evt.name)
        this.state.players[index].currentScore = this.state.players[index].currentScore + evt.score

        this.state.round[evt.name] += evt.score;
    },

    initFromCookies() {
        let t = VueCookies.get('scoreBoard')
        if (t) {

            this.state = t
            this.initRound()
            return t
        } else {
            this.state.playerScores = [{
                round: 0,
                ceri: 0,
                ludo: 0,
                ruby: 0,
                louis: 0
            }]
            this.initRound()
        }

    },
    resetScore() {
        VueCookies.remove('scoreBoard')
        let pList = this.state.players.map(x => {
            return x.name
        })
        let round0 = {
            round: 0
        }
        pList.forEach(x => round0[x] = 0)
        this.state.playerScores = [round0]
    },
    getPlayerScores() {
        return this.state.playerScores
    },
    getPlayers() {
        return this.state.players
    },
    getPlayerList() {
        return this.state.playerList
    },
    getRound() {
        return this.state.round
    },
    getScore(name) {
        let t = this.state.playerScores.map(x => {
            return x[name];
        });
        if (t.length == 0) {
            return 0
        } else {
            return t.reduce((a, b) => {
                return a + b;
            });
        }
    },
    // TODO finalise function
    initBoard() {
        this.state.players = [{
                name: "player1",
                currentScore: 0
            }],
            this.state.playerList = [{
                    text: "round",
                    value: "round"
                },
                {
                    text: "player1",
                    value: "player1"
                }
            ],
            this.state.playerScores = [{
                round: 1,
                player1: 0
            }],
            this.numberOfPlayers = 1
        this.state.round = {
            "player1": 0
        }
    },
    addPlayer(name) {
        this.state.numberOfPlayers += 1
        this.state.players.push({
            name: name,
            currentScore: 0
        })
        this.state.playerList.push({
            text: name,
            value: name
        })
        this.resetScore()
        this.initRound()
    },
    removePlayer(name) { //TODO remove Player
        this.state.players = this.state.players.filter(x => x.name != name)
        this.state.playerList = this.state.playerList.filter(x => x.text != name)
        delete this.state.round[name]

    },
    renamePlayer(oldName, newName) {
        // players
        let tempPlayer = this.state.players.filter(x => x.name == oldName)[0]
        tempPlayer.name = newName
        this.state.playerList.forEach(x => {
            if (x.text == oldName) {
                x.text = newName
                x.value = newName
            }
        })
        // playerScores
        this.state.playerScores.forEach(x => {
            x[newName] = x[oldName]
            delete x[oldName]
        })
        // round
        this.state.round[newName] = this.state.round[oldName]
        this.state.round[oldName]

    }
}