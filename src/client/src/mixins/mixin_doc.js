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
        postDoc(category, data) {
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
        delDoc(category, id) {

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
        postFileToS3(category, id, mydata,fname) {
            let fd = new FormData()
            fd.append('photos', mydata,fname)
            return new Promise(function (resolve, reject) {
                axios.post(`/newres/${category}/${id}`, fd,
                 {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        delFileOnS3(category, id) {
            return new Promise(function (resolve, reject) {
                axios.delete(`/file/${category}/${id}`)
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