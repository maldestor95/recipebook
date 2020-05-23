import axios from "axios"
export default {
    data() {
        return {}
    },
    methods: {
        getAllDoc(category) {
            return new Promise(function (resolve, reject) {

                axios.get('/doc/' + category)
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        getDoc() {},
        putDoc() {},
        postDoc() {},
        testDoc() {
            return "test"
        }
    },
}