export default {
    state: {
        numbers: [1, 2, 3],
        logged: false,
        headers: [{
                text: "Dessert (100g serving)",
                align: "left",
                sortable: false,
                value: "name"
            },
            {
                text: "Calories",
                value: "calories"
            },
            {
                text: "Fat (g)",
                value: "fat"
            },
            {
                text: "Carbs (g)",
                value: "carbs"
            },
            {
                text: "Protein (g)",
                value: "protein"
            },
            {
                text: "Iron (%)",
                value: "iron"
            },
            {
                text: "Cost ($)",
                value: "price"
            }
        ],
        items: [{
                name: "Frozen Yogurt",
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: "1%",
                price: 122
            },
            {
                name: "Ice cream sandwich",
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: "1%",
                price: 10
            },
            {
                name: "Eclair",
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: "7%",
                price: 50
            },
            {
                name: "Cupcake",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: "8%",
                price: 60
            },
            {
                name: "Gingerbread",
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: "16%",
                price: 27
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