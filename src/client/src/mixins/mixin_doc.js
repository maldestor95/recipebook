import axios from "axios"
import qs from "qs"
/**
 * @module mixins/mixin_docs
 * 
 * @description Mixin for document management with DynamoDB & AmazonS3
 * 

 */
export default {
    data() {
        return {}
    },
    methods: {
        /**
         * @function GetAllDoc
         * @param {String} category - categorie for an item store in the doc table within dynamoDB
         * @returns {Array}  data - Array of Object for which Object.category==category 
         * @returns {Object} err  
         */
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
        /**
         * @function GetDoc
         * @param {String} category - categorie for an item store in the doc table within dynamoDB
         * @param {String} id - unique id (uuid.v4)
         * @returns {Promise}  data matching the id or error 
         */
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
        /**
         * @function putDoc
         * @description update of an existing document
         * @param {String} category - categorie for an item store in the doc table within dynamoDB
         * @param {String} id - unique id (uuid.v4)
         * @param {Object} data - data
         * @returns {Promise}   
         */
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
        /**
         * @function postDoc
         * @description post of a new document
         * @param {String} category - categorie for an item store in the doc table within dynamoDB
         * @param {Object} data - data
         * @returns {Promise}   
         */
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
        /**
         * @function del Doc
         * @description delete a document
         * @param {String} category - categorie for an item store in the doc table within dynamoDB
         * @param {String} id - unique id (uuid.v4)
         * @returns {Promise}   
         */
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
        /**
         * @function postFileToS3
         * @description post a to S3
         * @param {String} category - categorie for an item store in the doc table within dynamoDB
         * @param {String} id - unique id (uuid.v4)
         * @param {datafile} dataFile - files
         * @param {string} fname - files path to S3  ; correspond to key on amazonS3
         * @returns {Promise}   
         */
        postFileToS3(category, id, dataFile, fname) {
            let fd = new FormData()
            fd.append('photos', dataFile, fname)
            return new Promise(function (resolve, reject) {
                axios.post(`/newres/${category}/${id}`, fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        /**
         * @function delFileOnS3
         * @description delete a file on S3
         * TODO   
         */
        delFileOnS3(category, id) { //TODO 
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