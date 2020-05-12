// define a mixin object
export default {
    data() {
        return {
            isAutorised: true,
            auth: null
        }
    },
    methods: {
        checkAuth: function (application, levelRequired) {
            let auth = JSON.parse(sessionStorage.getItem('sessionID'))
            if (!auth) {
                return false
            } else {
                let order = {
                    Root: 4,
                    Manager: 3,
                    Editor: 2,
                    Viewer: 1
                }
                let sessionLevel = auth.applicationPrivilege[application]
                return order[levelRequired] <= order[sessionLevel] ? true : false
            }
        },
        getAuth: function () {
            this.auth = JSON.parse(sessionStorage.getItem('sessionID'))
        }
    }
}