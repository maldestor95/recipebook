import axios from "axios";


let userapi = {
    getApplicationList: function () {
        return new Promise(function (resolve, reject) {
            let appList = axios.get("/apps/availableappslist")

            axios.all([appList])
                .then(axios.spread((resAppList, ) => {
                    resolve({
                        application: resAppList.data.data.application,
                        role: resAppList.data.data.role
                    })
                }))
                .catch(data => reject(data))
        });
    }
    
}


export default userapi