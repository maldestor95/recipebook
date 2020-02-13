export default {
    state: {
        logged: false,
        headers: [{
                text: "id",
                value: "id",
                sortable: true,
                fixed: true,
                width: "10px"
            },
            {
                text: "Description",
                value: "desc",

                align: "start"
            },
            {
                text: "Category",
                value: "category",
                sortable: true,

                align: "center"
            },
            {
                text: "Date",
                value: "date",
                align: "center"
            },
            {
                text: "Cost",
                value: "cost",
                align: "center"
            }
        ],
        items: [{
                "id": 1,
                "desc": "toto",
                "category": "general",
                "date": "21/12/2019",
                "cost": 123
            }, {
                "id": 2,
                "desc": "tata",
                "category": "general",
                "date": "21/12/2019",
                "cost": 125
            },
            {
                "id": 3,
                "desc": "titi",
                "category": "perso",
                "date": "21/12/2019",
                "cost": 135
            }, {
                "id": 4,
                "desc": "totututo",
                "category": "maison",
                "date": "21/12/2019",
                "cost": 235
            }, {
                "id": 5,
                "desc": "tutu",
                "category": "general",
                "date": "21/12/2019",
                "cost": 230
            }
        ]
    },
    login() {
        this.state.logged = true;
    },
    logout() {
        this.state.logged = false;
    }
};