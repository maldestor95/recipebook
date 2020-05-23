import axios from "axios"
import qs from "qs"
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
        getDoc(category, id) {
            return new Promise(function (resolve, reject) {
                axios.get(`/doc/${category}/${id}`)
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        putDoc(category, id, data) {
            let prepareData = {
                data: data,
                categorie: category
            }
            return new Promise(function (resolve, reject) {
                axios.put(`/doc/${category}/${id}`, qs.stringify(prepareData))
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        postDoc(category,  data) {
            let prepareData = {
                data: data,
                categorie: category
            }
            return new Promise(function (resolve, reject) {
                axios.post(`/doc/${category}`, qs.stringify(prepareData))
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        delDoc(category,id) {
            
            return new Promise(function (resolve, reject) {
                axios.delete(`/doc/${category}/${id}`)
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
    },
}