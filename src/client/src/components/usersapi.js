import axios from "axios";
import qs from "qs";


let userapi = {
    getApplicationList: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get("/API/Apps/AvailableAppsList", null)
                .then((response) => {

                    resolve(response.data.data);
                })
                .catch((response) => {

                    reject(response.data.err)
                });

        })
    },
    getRightsList: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get("/API/Apps/AvailableRightsList")
                .then((response) => {

                    resolve(response.data.data);
                })
                .catch((response) => {

                    reject(response.data.err)
                });

        })
    },
    updateApplication: function (inputData) {
        let login=inputData.login
        let data = inputData
        delete data.login
        return new Promise(function (resolve, reject) {
            axios
                .put(`/API/Users/${login}/application`, qs.stringify(data))
                .then((response) => {

                    resolve(response.data.data);
                })
                .catch((response) => {

                    reject(response.data.err)
                });

        })
    },

}


export default userapi