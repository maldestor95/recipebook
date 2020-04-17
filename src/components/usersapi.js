import axios from "axios";
import qs from "qs";


let userapi = {
    getApplicationList: function () {
return new Promise(function (resolve, reject) {
    
    let appList     = axios.get("/Apps/AvailableAppsList")
    let rightList   = axios.get("/Apps/AvailableRightsList")
    
    axios.all([appList, rightList])
    .then(axios.spread((resAppList, resrightList) => {
        resolve({application:resAppList.data.data,role:resrightList.data.data})    
    }))
    .catch(data=>reject(data))
});
    },
    updateApplication: function (inputData) {
        let login = inputData.login
        let data = inputData
        delete data.login
        return new Promise(function (resolve, reject) {
            axios
                .put(`/users/${login}/application`, qs.stringify(data))
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